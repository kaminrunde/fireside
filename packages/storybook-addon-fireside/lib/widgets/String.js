import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
export default function String(props) {
    return (_jsx(Wrapper, { focus: props.focus.toString(), children: _jsx("input", { type: "text", value: props.value, onChange: (e) => props.onChange(e.target.value) }) }));
}
const Wrapper = styled.div `
  border: 1px solid
    ${(props) => (props.focus === "true" ? "#1DA7FD" : "lightgrey")};
  border-radius: 3px;
  padding-left: 5px;
  > input {
    width: 100%;
    border: none;
    line-height: 30px;
  }
`;
