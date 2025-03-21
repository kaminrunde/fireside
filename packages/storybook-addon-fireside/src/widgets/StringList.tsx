import * as React from "react";
import styled from "styled-components";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import * as t from "../types";
import produce from "immer";
import { arrayMoveImmutable } from "array-move";

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

  const handleBulkAdd = () => {
    const newValues = bulkValue.split("\n").filter(Boolean);
    props.onChange([...props.value, ...newValues]);
    setBulkValue("");
    setShowBulkInput(false);
  };

  return (
    <Wrapper>
      <SortableList
        items={props.value}
        onSortEnd={({
          oldIndex,
          newIndex,
        }: {
          oldIndex: number;
          newIndex: number;
        }) => {
          props.onChange(arrayMoveImmutable(props.value, oldIndex, newIndex));
        }}
        onDelete={(index: number) => {
          props.onChange(props.value.filter((_, i) => i !== index));
        }}
        onUpdate={(index: number, val: any) => {
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

const SortableItem = SortableElement(({ value, onDelete, onUpdate }: any) => {
  const [pendingDelete, setPendingDelete] = React.useState(false);
  const [pendingEdit, setPendingEdit] = React.useState(!value);
  const input = React.useRef<HTMLInputElement | null>(null);
  const [newVal, setNewVal] = React.useState(value);

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
    else setTimeout(() => input.current.addEventListener("keyup", e), 100);

    return () => input.current && input.current.removeEventListener("keyup", e);
  }, [pendingEdit, newVal]);

  if (pendingDelete)
    return (
      <Item className="SortableItem" highlight="true">
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
      <Item className="SortableItem" highlight="true">
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
    <Item className="SortableItem">
      <span>{value}</span>
      <div className="update" onMouseDown={() => setPendingEdit(true)}>
        U
      </div>
      <div className="delete" onMouseDown={() => setPendingDelete(true)}>
        D
      </div>
    </Item>
  );
});

const SortableList = SortableContainer(({ items, onDelete, onUpdate }: any) => {
  return (
    <ul>
      {items.map((value: number, index: number) => (
        <SortableItem
          key={`item-${value + index}`}
          index={index}
          value={value}
          onDelete={() => onDelete(index)}
          onUpdate={(val: string) => onUpdate(index, val)}
        />
      ))}
    </ul>
  );
});

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
