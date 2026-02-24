import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import styled from "styled-components";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy, } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import produce from "immer";
export default function StringList(props) {
    const [showBulkInput, setShowBulkInput] = React.useState(false);
    const [bulkValue, setBulkValue] = React.useState("");
    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
    }));
    const handleBulkAdd = () => {
        const newValues = bulkValue.split("\n").filter(Boolean);
        props.onChange([...props.value, ...newValues]);
        setBulkValue("");
        setShowBulkInput(false);
    };
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = Number(active.id);
            const newIndex = Number(over.id);
            props.onChange(arrayMove(props.value, oldIndex, newIndex));
        }
    };
    return (_jsxs(Wrapper, { children: [_jsx(DndContext, { sensors: sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd, children: _jsx(SortableContext, { items: props.value.map((_, i) => String(i)), strategy: verticalListSortingStrategy, children: _jsx("ul", { children: props.value.map((value, index) => (_jsx(SortableItem, { id: String(index), value: value, onDelete: () => props.onChange(props.value.filter((_, i) => i !== index)), onUpdate: (val) => {
                                if (!val) {
                                    props.onChange(props.value.filter((_, i) => i !== index));
                                    return;
                                }
                                const newValue = produce(props.value, (value) => {
                                    value[index] = val;
                                });
                                props.onChange(newValue);
                            } }, `item-${value + index}`))) }) }) }), _jsx("button", { className: "add", onClick: () => {
                    props.onChange([...props.value, ""]);
                }, children: "ADD" }), _jsx("button", { className: "add", onClick: () => setShowBulkInput(true), children: "ADD MULTIPLE" }), showBulkInput && (_jsxs(BulkInputWrapper, { children: [_jsx("textarea", { value: bulkValue, onChange: (e) => setBulkValue(e.target.value), placeholder: "Enter values, one per line..." }), _jsx("button", { onClick: handleBulkAdd, children: "Submit" }), _jsx("button", { onClick: () => setShowBulkInput(false), children: "Close" })] }))] }));
}
function SortableItem({ id, value, onDelete, onUpdate, }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const [pendingDelete, setPendingDelete] = React.useState(false);
    const [pendingEdit, setPendingEdit] = React.useState(!value);
    const input = React.useRef(null);
    const [newVal, setNewVal] = React.useState(value);
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    React.useEffect(() => {
        if (!pendingEdit)
            return;
        setTimeout(() => {
            if (!input.current)
                return;
            input.current.focus();
        }, 50);
    }, [pendingEdit]);
    React.useEffect(() => {
        if (!pendingEdit)
            return;
        let e = (e) => {
            if (e.keyCode === 13) {
                onUpdate(newVal);
                setPendingEdit(false);
            }
        };
        if (input.current)
            input.current.addEventListener("keyup", e);
        else
            setTimeout(() => input.current.addEventListener("keyup", e), 100);
        return () => input.current && input.current.removeEventListener("keyup", e);
    }, [pendingEdit, newVal]);
    if (pendingDelete)
        return (_jsxs(Item, { ref: setNodeRef, style: style, ...attributes, ...listeners, className: "SortableItem", highlight: "true", children: [_jsxs("span", { children: ["Delete \"", value, "\"?"] }), _jsx("div", { className: "update keep", onMouseDown: onDelete, children: "Y" }), _jsx("div", { className: "delete keep", onMouseDown: () => setPendingDelete(false), children: "N" })] }));
    if (pendingEdit)
        return (_jsx(Item, { ref: setNodeRef, style: style, ...attributes, ...listeners, className: "SortableItem", highlight: "true", children: _jsx("input", { ref: input, type: "text", value: newVal, onChange: (e) => setNewVal(e.target.value), onBlur: () => {
                    setPendingEdit(false);
                    onUpdate(newVal);
                } }) }));
    return (_jsxs(Item, { ref: setNodeRef, style: style, ...attributes, ...listeners, className: "SortableItem", children: [_jsx("span", { children: value }), _jsx("div", { className: "update", onMouseDown: () => setPendingEdit(true), children: "U" }), _jsx("div", { className: "delete", onMouseDown: () => setPendingDelete(true), children: "D" })] }));
}
const BulkInputWrapper = styled.div `
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
const Wrapper = styled.div `
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
const Item = styled.li `
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
