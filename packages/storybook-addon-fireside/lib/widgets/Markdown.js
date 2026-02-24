import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import styled from "styled-components";
export default function Markdown(props) {
    const ref = React.useRef(null);
    return (_jsx(Wrapper, { focus: props.focus.toString(), children: _jsx("textarea", { ref: ref, value: props.value, onChange: (e) => props.onChange(e.target.value), rows: 20 }) }));
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
