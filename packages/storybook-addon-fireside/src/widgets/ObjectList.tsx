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
import Widget from "../Panel/Widget";
import * as t from "../types";
import produce from "immer";
import objPath from "object-path";

type Props = {
  value: object[];
  onChange: (value: object[]) => void;
  focus: boolean;
  options: t.ObjectListOptions;
  hasError: boolean;
};

export default function ObjectList(props: Props) {
  const [activeRowIndex, setActiveRowIndex] = React.useState<number | null>(
    null
  );
  const isActive = typeof activeRowIndex === "number";

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
      {isActive && (
        <div className="edit">
          {props.options.schema.map((knob) => (
            <Widget
              knob={{
                ...knob,
                value: objPath.get(props.value[activeRowIndex], knob.prop),
              }}
              onUpdate={(val) =>
                props.onChange(
                  produce(props.value, (value) => {
                    objPath.set(value[activeRowIndex], knob.prop, val);
                  })
                )
              }
            />
          ))}
        </div>
      )}
      {isActive || (
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
              {props.value.map((value: object, index: number) => (
                <SortableItem
                  key={`item-${index}`}
                  id={String(index)}
                  value={value}
                  getName={props.options.getRowName}
                  onDelete={() =>
                    props.onChange(props.value.filter((_, i) => i !== index))
                  }
                  onUpdate={() => setActiveRowIndex(index)}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}

      <button
        className="add"
        onClick={() => {
          if (isActive) {
            setActiveRowIndex(null);
          } else {
            props.onChange(
              produce(props.value, (value) => {
                let entry = {};
                for (let knob of props.options.schema) {
                  objPath.set(entry, knob.prop, knob.value);
                }
                value.push(entry);
              })
            );
            setActiveRowIndex(props.value.length);
          }
        }}
      >
        {isActive ? "SAVE" : "ADD"}
      </button>
    </Wrapper>
  );
}

function SortableItem({
  id,
  value,
  onDelete,
  onUpdate,
  getName,
}: {
  id: string;
  value: object;
  onDelete: () => void;
  onUpdate: () => void;
  getName: (value: object) => string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const [pendingDelete, setPendingDelete] = React.useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
        <span>Delete "{getName(value)}"?</span>
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

  return (
    <Item
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="SortableItem"
      highlight="true"
    >
      <span>{getName(value)}</span>
      <div className="update" onMouseDown={onUpdate}>
        U
      </div>
      <div className="delete" onMouseDown={() => setPendingDelete(true)}>
        D
      </div>
    </Item>
  );
}

const Wrapper = styled.div`
  > .edit {
    border-left: 4px solid #1da7fd;
    background: #d3d3d34d;
  }

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

const Item = styled.li<{ highlight: string }>`
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
