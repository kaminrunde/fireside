import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function CustomKnobPlaceholder(props) {
    if (!props.options || !props.options.__name)
        return _jsx("div", { children: "Some error happened" });
    return (_jsxs("div", { children: ["Could not find custom knob with name \"", props.options.__name, "\""] }));
}
