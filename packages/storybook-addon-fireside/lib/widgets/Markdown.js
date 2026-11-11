import * as React from "react";
import styled from "styled-components";
export default function Markdown(props) {
    const ref = React.useRef(null);
    return (React.createElement(Wrapper, { focus: props.focus.toString() },
        React.createElement("textarea", { ref: ref, value: props.value, onChange: (e) => props.onChange(e.target.value), rows: props.options.rows ?? 5 })));
}
const Wrapper = styled.div `
  border: 1px solid
    ${(props) => (props.focus === "true" ? "#1DA7FD" : "lightgrey")};
  border-radius: 3px;
  padding-left: 5px;
  > textarea {
    width: 100%;
    border: none;
    line-height: 30px;
    &:focus {
      outline: none;
    }
  }
`;
