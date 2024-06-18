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
