"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const widgets_1 = __importDefault(require("../widgets"));
const styled_components_1 = __importDefault(require("styled-components"));
const useCustomComponents_1 = __importDefault(require("./useCustomComponents"));
function Widget(props) {
    const customComponents = useCustomComponents_1.default();
    const [value, setValue] = React.useState(props.knob.value);
    const Component = widgets_1.default(props.knob, customComponents);
    const [handle, focus, ref] = useFocus();
    const update = (val) => {
        setValue(val);
        props.onUpdate(val);
    };
    if (props.knob.type === 'constant')
        return null;
    const error = props.knob.options.validate
        ? props.knob.options.validate(value)
        : null;
    return (React.createElement(Wrapper, { ref: ref, onClick: handle },
        React.createElement("h3", { className: 'label' }, props.knob.label),
        props.knob.options.hint && (React.createElement("div", { className: 'hint' }, props.knob.options.hint)),
        error && (React.createElement("div", { className: 'error' }, error)),
        React.createElement(Component, { value: value, onChange: update, focus: focus, hasError: !!error, options: props.knob.options })));
}
exports.default = Widget;
const Wrapper = styled_components_1.default.div `
  padding: 10px;
  &:active {outline:none;}
  > .label {
    font-size: 18px;
    letter-spacing: 1px;
    line-height: 30px;
  }
  > .hint {
    color: grey;
    line-height: 18px;
  }
  > .error {
    font-size: 16px;
    letter-spacing: 1px;
    line-height: 20px;
    color: #ff5722;
    margin-top: -5px;
    margin-bottom: 5px;
  }
`;
function useFocus() {
    const [activeEl, setActiveEl] = React.useState(null);
    const ref = React.useRef(null);
    const handle = () => {
        if (activeEl || !ref.current)
            return;
        setActiveEl(ref.current);
    };
    React.useEffect(() => {
        if (!activeEl)
            return;
        const elIsInDropdown = ({ parentElement: el }) => {
            return el ? el === activeEl || elIsInDropdown(el) : false;
        };
        const listener = (e) => {
            if (!elIsInDropdown(e.target)) {
                window.removeEventListener('click', listener);
                setActiveEl(null);
            }
        };
        window.addEventListener('click', listener);
        return () => window.removeEventListener('click', listener);
    }, [activeEl]);
    return [handle, !!activeEl, ref, () => setActiveEl(null)];
}
