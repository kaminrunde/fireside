import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
export default function Bool(props) {
    return (_jsx(Wrapper, { on: props.value.toString(), onClick: () => props.onChange(!props.value), children: props.value ? "ON" : "OFF" }));
}
const Wrapper = styled.button `
  padding: 10px 20px;
  border: none;
  color: white;
  cursor: pointer;
  background: ${(props) => (props.on === "true" ? "#8bc34a" : "#e91e63")};
`;
