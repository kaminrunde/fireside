"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const react_sortable_hoc_1 = require("react-sortable-hoc");
const immer_1 = require("immer");
const arrayMove = require('array-move');
function StringList(props) {
    return (React.createElement(Wrapper, null,
        React.createElement(SortableList, { items: props.value, onSortEnd: ({ oldIndex, newIndex }) => {
                props.onChange(arrayMove(props.value, oldIndex, newIndex));
            }, onDelete: index => {
                props.onChange(props.value.filter((_, i) => i !== index));
            }, onUpdate: (index, val) => {
                if (!val) {
                    props.onChange(props.value.filter((_, i) => i !== index));
                    return;
                }
                const newValue = immer_1.default(props.value, value => {
                    value[index] = val;
                });
                props.onChange(newValue);
            } }),
        React.createElement("button", { className: 'add', onClick: () => {
                props.onChange([...props.value, '']);
            } }, "ADD")));
}
exports.default = StringList;
const SortableItem = react_sortable_hoc_1.SortableElement(({ value, onDelete, onUpdate }) => {
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
            input.current.addEventListener('keyup', e);
        else
            setTimeout(() => input.current.addEventListener('keyup', e), 100);
        return () => input.current && input.current.removeEventListener('keyup', e);
    }, [pendingEdit, newVal]);
    if (pendingDelete)
        return (React.createElement(Item, { className: 'SortableItem', highlight: true },
            React.createElement("span", null,
                "Delete \"",
                value,
                "\"?"),
            React.createElement("div", { className: 'update keep', onMouseDown: onDelete }, "Y"),
            React.createElement("div", { className: 'delete keep', onMouseDown: () => setPendingDelete(false) }, "N")));
    if (pendingEdit)
        return (React.createElement(Item, { className: 'SortableItem', highlight: true },
            React.createElement("input", { ref: input, type: 'text', value: newVal, onChange: e => setNewVal(e.target.value), onBlur: () => {
                    setPendingEdit(false);
                    onUpdate(newVal);
                } })));
    return (React.createElement(Item, { className: 'SortableItem' },
        React.createElement("span", null, value),
        React.createElement("div", { className: 'update', onMouseDown: () => setPendingEdit(true) }, "U"),
        React.createElement("div", { className: 'delete', onMouseDown: () => setPendingDelete(true) }, "D")));
});
const SortableList = react_sortable_hoc_1.SortableContainer(({ items, onDelete, onUpdate }) => {
    return (React.createElement("ul", null, items.map((value, index) => (React.createElement(SortableItem, { key: `item-${value}`, index: index, value: value, onDelete: () => onDelete(index), onUpdate: (val) => onUpdate(index, val) })))));
});
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
  background: ${p => p.highlight ? '#FFE4C4' : 'white'};
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
//# sourceMappingURL=StringList.js.map