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
const Widget_1 = __importDefault(require("../Panel/Widget"));
const immer_1 = __importDefault(require("immer"));
const objPath = require("object-path");
const array_move_1 = require("array-move");
function ObjectList(props) {
    const [activeRowIndex, setActiveRowIndex] = React.useState(null);
    const isActive = typeof activeRowIndex === 'number';
    return (React.createElement(Wrapper, null,
        isActive && (React.createElement("div", { className: 'edit' }, props.options.schema.map(knob => (React.createElement(Widget_1.default, { knob: { ...knob, value: objPath.get(props.value[activeRowIndex], knob.prop) }, onUpdate: val => props.onChange((0, immer_1.default)(props.value, value => {
                objPath.set(value[activeRowIndex], knob.prop, val);
            })) }))))),
        isActive || React.createElement(SortableList, { items: props.value, getName: props.options.getRowName, onSortEnd: ({ oldIndex, newIndex }) => {
                props.onChange((0, array_move_1.arrayMoveImmutable)(props.value, oldIndex, newIndex));
            }, onDelete: (index) => {
                props.onChange(props.value.filter((_, i) => i !== index));
            }, onUpdate: (index) => {
                setActiveRowIndex(index);
            } }),
        React.createElement("button", { className: 'add', onClick: () => {
                if (isActive) {
                    setActiveRowIndex(null);
                }
                else {
                    props.onChange((0, immer_1.default)(props.value, value => {
                        let entry = {};
                        for (let knob of props.options.schema) {
                            objPath.set(entry, knob.prop, knob.value);
                        }
                        value.push(entry);
                    }));
                    setActiveRowIndex(props.value.length);
                }
            } }, isActive ? 'SAVE' : 'ADD')));
}
exports.default = ObjectList;
const SortableItem = (0, react_sortable_hoc_1.SortableElement)(({ value, onDelete, onUpdate, getName }) => {
    const [pendingDelete, setPendingDelete] = React.useState(false);
    if (pendingDelete)
        return (React.createElement(Item, { className: 'SortableItem', highlight: "true" },
            React.createElement("span", null,
                "Delete \"",
                getName(value),
                "\"?"),
            React.createElement("div", { className: 'update keep', onMouseDown: onDelete }, "Y"),
            React.createElement("div", { className: 'delete keep', onMouseDown: () => setPendingDelete(false) }, "N")));
    return (React.createElement(Item, { className: 'SortableItem', highlight: "true" },
        React.createElement("span", null, getName(value)),
        React.createElement("div", { className: 'update', onMouseDown: onUpdate }, "U"),
        React.createElement("div", { className: 'delete', onMouseDown: () => setPendingDelete(true) }, "D")));
});
const SortableList = (0, react_sortable_hoc_1.SortableContainer)(({ items, onDelete, onUpdate, getName }) => {
    return (React.createElement("ul", null, items.map((value, index) => (React.createElement(SortableItem, { key: `item-${index}`, index: index, value: value, getName: getName, onDelete: () => onDelete(index), onUpdate: () => onUpdate(index) })))));
});
const Wrapper = styled_components_1.default.div `

  > .edit {
    border-left: 4px solid #1DA7FD;
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
const Item = styled_components_1.default.li `
  padding: 10px;
  margin: 3px 0;
  border: 1px solid lightgrey;
  border-radius: 3px;
  background: ${p => p.highlight === 'true' ? '#FFE4C4' : 'white'};
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

  > .update, .delete {
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
    > .update, .delete {
      display: block;
    }
  }
`;
