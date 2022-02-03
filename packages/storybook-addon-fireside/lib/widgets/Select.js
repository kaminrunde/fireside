"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_components_1 = require("styled-components");
const fa_1 = require("react-icons/fa");
function Select(props) {
    const [open, setOpen] = React.useState(props.focus);
    React.useEffect(() => {
        if (!props.focus)
            setOpen(false);
    }, [props.focus]);
    const handleClick = () => {
        setOpen(!open);
    };
    const label = React.useMemo(() => {
        const match = props.options.options.find(opt => opt.value === props.value);
        return match ? match.label : props.value;
    }, [props.value, props.options.options]);
    return (React.createElement(Wrapper, { tabIndex: '1', focus: props.focus },
        React.createElement("div", { className: 'value', onClick: handleClick },
            label || '-',
            open ? React.createElement(fa_1.FaChevronUp, null) : React.createElement(fa_1.FaChevronDown, null)),
        open && (React.createElement("div", { className: 'options' }, props.options.options.map(row => (React.createElement(Row, { key: row.label, selected: row.value === props.value, onClick: () => props.onChange(row.value) }, row.label)))))));
}
exports.default = Select;
const Wrapper = styled_components_1.default.div `
  position: relative;
  > .value {
    border: 1px solid ${props => props.focus ? '#1DA7FD' : 'lightgrey'};
    border-radius: 3px;
    padding: 0 8px;
    line-height: 30px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    
    > svg {
      font-size: 12px;
      margin-top: 10px;
    }
  }


  > .options {
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    margin-top: 8px;
    border: 1px solid lightgrey;
    border-radius: 3px;
  }
`;
const Row = styled_components_1.default.div `
  padding-left: 5px;
  line-height: 30px;
  background: white;
  &:hover {
    background: whitesmoke;
    cursor: pointer;
  }
  ${p => p.selected && `&&& {background: silver;}`}
`;
//# sourceMappingURL=Select.js.map