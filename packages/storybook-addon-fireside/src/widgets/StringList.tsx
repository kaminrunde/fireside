import * as React from "react";
import styled from "styled-components";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as t from "../types";
import produce from "immer";

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
  focus: boolean;
  options: t.StringListOptions;
  hasError: boolean;
};

export default function StringList(props: Props) {
  const [showBulkInput, setShowBulkInput] = React.useState(false);
  const [bulkValue, setBulkValue] = React.useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleBulkAdd = () => {
    const newValues = bulkValue.split("\n").filter(Boolean);
    props.onChange([...props.value, ...newValues]);
    setBulkValue("");
    setShowBulkInput(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = Number(active.id);
      const newIndex = Number(over.id);
      props.onChange(arrayMove(props.value, oldIndex, newIndex));
    }
  };

  return (
    <Wrapper>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {/* @ts-expect-error @dnd-kit/sortable types not yet compatible with React 19 */}
        <SortableContext
          items={props.value.map((_, i) => String(i))}
          strategy={verticalListSortingStrategy}
        >
          <ul>
            {props.value.map((value: string, index: number) => (
              <SortableItem
                key={`item-${value + index}`}
                id={String(index)}
                value={value}
                onDelete={() =>
                  props.onChange(props.value.filter((_, i) => i !== index))
                }
                onUpdate={(val: string) => {
                  if (!val) {
                    props.onChange(props.value.filter((_, i) => i !== index));
                    return;
                  }
                  const newValue = produce(props.value, (value) => {
                    value[index] = val;
                  });
                  props.onChange(newValue);
                }}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <button
        className="add"
        onClick={() => {
          props.onChange([...props.value, ""]);
        }}
      >
        ADD
      </button>

      <button className="add" onClick={() => setShowBulkInput(true)}>
        ADD MULTIPLE
      </button>

      {showBulkInput && (
        <BulkInputWrapper>
          <textarea
            value={bulkValue}
            onChange={(e) => setBulkValue(e.target.value)}
            placeholder="Enter values, one per line..."
          />
          <button onClick={handleBulkAdd}>Submit</button>
          <button onClick={() => setShowBulkInput(false)}>Close</button>
        </BulkInputWrapper>
      )}
    </Wrapper>
  );
}

function SortableItem({
  id,
  value,
  onDelete,
  onUpdate,
}: {
  id: string;
  value: string;
  onDelete: () => void;
  onUpdate: (val: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const [pendingDelete, setPendingDelete] = React.useState(false);
  const [pendingEdit, setPendingEdit] = React.useState(!value);
  const input = React.useRef<HTMLInputElement | null>(null);
  const [newVal, setNewVal] = React.useState(value);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  React.useEffect(() => {
    if (!pendingEdit) return;
    setTimeout(() => {
      if (!input.current) return;
      input.current.focus();
    }, 50);
  }, [pendingEdit]);

  React.useEffect(() => {
    if (!pendingEdit) return;
    let e = (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        onUpdate(newVal);
        setPendingEdit(false);
      }
    };
    if (input.current) input.current.addEventListener("keyup", e);
    else setTimeout(() => input.current!.addEventListener("keyup", e), 100);

    return () => input.current && input.current.removeEventListener("keyup", e);
  }, [pendingEdit, newVal]);

  if (pendingDelete)
    return (
      <Item
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="SortableItem"
        highlight="true"
      >
        <span>Delete "{value}"?</span>
        <div className="update keep" onMouseDown={onDelete}>
          Y
        </div>
        <div
          className="delete keep"
          onMouseDown={() => setPendingDelete(false)}
        >
          N
        </div>
      </Item>
    );

  if (pendingEdit)
    return (
      <Item
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="SortableItem"
        highlight="true"
      >
        <input
          ref={input}
          type="text"
          value={newVal}
          onChange={(e) => setNewVal(e.target.value)}
          onBlur={() => {
            setPendingEdit(false);
            onUpdate(newVal);
          }}
        />
      </Item>
    );

  return (
    <Item
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="SortableItem"
    >
      <span>{value}</span>
      <div className="update" onMouseDown={() => setPendingEdit(true)}>
        U
      </div>
      <div className="delete" onMouseDown={() => setPendingDelete(true)}>
        D
      </div>
    </Item>
  );
}

const BulkInputWrapper = styled.div`
  margin-top: 15px;

  textarea {
    width: 100%;
    height: 100px;
    border: 1px solid lightgrey;
    border-radius: 3px;
    padding: 8px;
  }

  button {
    margin-top: 5px;
    display: block;
    width: 100%;
    border: 1px solid lightgrey;
    background: #8bc34a;
    padding: 8px;
    border-radius: 3px;
    cursor: pointer;
    font-weight: bold;
    color: white;
  }
`;

const Wrapper = styled.div`
  > ul {
    list-style: none;
    margin: 0;
    padding: 3px;
    border: 1px solid lightgrey;
    border-radius: 3px;
    background: #d3d3d34d;
    cursor: grabbing;
  }

  > .add {
    margin-top: 5px;
    display: block;
    width: 100%;
    border: 1px solid lightgrey;
    background: #8bc34a;
    padding: 8px;
    border-radius: 3px;
    cursor: pointer;
    font-weight: bold;
    color: white;
  }
`;

const Item = styled.li<{ highlight?: string }>`
  padding: 10px;
  margin: 3px 0;
  border: 1px solid lightgrey;
  border-radius: 3px;
  background: ${(p) => (p.highlight === "true" ? "#FFE4C4" : "white")};
  list-style: none;
  font-size: 14px;
  cursor: grabbing;
  display: flex;
  z-index: 9999;

  > input {
    display: block;
    width: 100%;
    border: none;
    background: none;
  }

  > span {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  > .update,
  .delete {
    display: none;
    margin-left: 15px;
    width: 16px;
    text-align: center;
    cursor: pointer;
  }

  > .keep {
    display: block;
  }

  > .update {
    background: gold;
    outline: gold solid 5px;
  }

  > .delete {
    background: OrangeRed;
    outline: OrangeRed solid 5px;
  }

  &:hover {
    > .update,
    .delete {
      display: block;
    }
  }
`;
