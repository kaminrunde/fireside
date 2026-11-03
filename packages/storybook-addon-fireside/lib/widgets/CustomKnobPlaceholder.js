import * as React from "react";
export default function CustomKnobPlaceholder(props) {
    if (!props.options || !props.options.__name)
        return React.createElement("div", null, "Some error happened");
    return (React.createElement("div", null,
        "Could not find custom knob with name \"",
        props.options.__name,
        "\""));
}
