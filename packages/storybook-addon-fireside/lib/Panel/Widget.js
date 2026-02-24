import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import getWidget from "../widgets";
import styled from "styled-components";
import useCustomComponents from "./useCustomComponents";
export default function Widget(props) {
    const customComponents = useCustomComponents();
    const [value, setValue] = React.useState(props.knob.value);
    const Component = getWidget(props.knob, customComponents);
    const [handle, focus, ref] = useFocus();
    const update = (val) => {
        setValue(val);
        props.onUpdate(val);
    };
    if (props.knob.type === "constant")
        return null;
    const error = props.knob.options.validate
        ? props.knob.options.validate(value)
        : null;
    return (_jsxs(Wrapper, { ref: ref, onClick: handle, children: [_jsx("h3", { className: "label", children: props.knob.label }), props.knob.options.hint && (_jsx("div", { className: "hint", children: props.knob.options.hint })), error && _jsx("div", { className: "error", children: error }), _jsx(Component, { value: value, onChange: update, focus: focus, hasError: !!error, options: props.knob.options })] }));
}
const Wrapper = styled.div `
  padding: 10px;
  &:active {
    outline: none;
  }
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
                window.removeEventListener("click", listener);
                setActiveEl(null);
            }
        };
        window.addEventListener("click", listener);
        return () => window.removeEventListener("click", listener);
    }, [activeEl]);
    return [handle, !!activeEl, ref, () => setActiveEl(null)];
}
