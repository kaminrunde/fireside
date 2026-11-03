import * as React from "react";
import styled from "styled-components";
export default function String(props) {
    return (React.createElement(Wrapper, { focus: props.focus.toString() },
        React.createElement("input", { type: "number", value: props.value, onChange: (e) => props.onChange(parseInt(e.target.value)) })));
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
