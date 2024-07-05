"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const react_sortable_hoc_1 = require("react-sortable-hoc");
const immer_1 = __importDefault(require("immer"));
const array_move_1 = require("array-move");
function StringList(props) {
    const [showBulkInput, setShowBulkInput] = React.useState(false);
    const [bulkValue, setBulkValue] = React.useState("");
    const handleBulkAdd = () => {
        const newValues = bulkValue.split("\n").filter(Boolean);
        props.onChange([...props.value, ...newValues]);
        setBulkValue("");
        setShowBulkInput(false);
    };
    return (React.createElement(Wrapper, null,
        React.createElement(SortableList, { items: props.value, onSortEnd: ({ oldIndex, newIndex }) => {
                props.onChange((0, array_move_1.arrayMoveImmutable)(props.value, oldIndex, newIndex));
            }, onDelete: (index) => {
                props.onChange(props.value.filter((_, i) => i !== index));
            }, onUpdate: (index, val) => {
                if (!val) {
                    props.onChange(props.value.filter((_, i) => i !== index));
                    return;
                }
                const newValue = (0, immer_1.default)(props.value, (value) => {
                    value[index] = val;
                });
                props.onChange(newValue);
            } }),
        React.createElement("button", { className: "add", onClick: () => {
                props.onChange([...props.value, ""]);
            } }, "ADD"),
        React.createElement("button", { className: "add", onClick: () => setShowBulkInput(true) }, "ADD MULTIPLE"),
        showBulkInput && (React.createElement(BulkInputWrapper, null,
            React.createElement("textarea", { value: bulkValue, onChange: (e) => setBulkValue(e.target.value), placeholder: "Enter values, one per line..." }),
            React.createElement("button", { onClick: handleBulkAdd }, "Submit"),
            React.createElement("button", { onClick: () => setShowBulkInput(false) }, "Close")))));
}
exports.default = StringList;
const SortableItem = (0, react_sortable_hoc_1.SortableElement)(({ value, onDelete, onUpdate }) => {
    const [pendingDelete, setPendingDelete] = React.useState(false);
    const [pendingEdit, setPendingEdit] = React.useState(!value);
    const input = React.useRef(null);
    const [newVal, setNewVal] = React.useState(value);
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
        return (React.createElement(Item, { className: "SortableItem", highlight: "true" },
            React.createElement("span", null,
                "Delete \"",
                value,
                "\"?"),
            React.createElement("div", { className: "update keep", onMouseDown: onDelete }, "Y"),
            React.createElement("div", { className: "delete keep", onMouseDown: () => setPendingDelete(false) }, "N")));
    if (pendingEdit)
        return (React.createElement(Item, { className: "SortableItem", highlight: "true" },
            React.createElement("input", { ref: input, type: "text", value: newVal, onChange: (e) => setNewVal(e.target.value), onBlur: () => {
                    setPendingEdit(false);
                    onUpdate(newVal);
                } })));
    return (React.createElement(Item, { className: "SortableItem" },
        React.createElement("span", null, value),
        React.createElement("div", { className: "update", onMouseDown: () => setPendingEdit(true) }, "U"),
        React.createElement("div", { className: "delete", onMouseDown: () => setPendingDelete(true) }, "D")));
});
const SortableList = (0, react_sortable_hoc_1.SortableContainer)(({ items, onDelete, onUpdate }) => {
    return (React.createElement("ul", null, items.map((value, index) => (React.createElement(SortableItem, { key: `item-${value + index}`, index: index, value: value, onDelete: () => onDelete(index), onUpdate: (val) => onUpdate(index, val) })))));
});
const BulkInputWrapper = styled_components_1.default.div `
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
const Wrapper = styled_components_1.default.div `
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
const Item = styled_components_1.default.li `
  padding: 10px;
  margin: 3px 0;
  border: 1px solid lightgrey;
  border-radius: 3px;
  background: ${(p) => (p.highlight === 'true' ? "#FFE4C4" : "white")};
  list-style: none;
  font-size: 14px;
  cursor: grabbing;
  display: flex;

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
