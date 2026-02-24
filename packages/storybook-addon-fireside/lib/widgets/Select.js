import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import styled from "styled-components";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
export default function Select(props) {
    const [open, setOpen] = React.useState(props.focus);
    React.useEffect(() => {
        if (!props.focus)
            setOpen(false);
    }, [props.focus]);
    const handleClick = (e) => {
        e.stopPropagation();
        setOpen(!open);
    };
    const handleOptionSelect = (value) => {
        props.onChange(value);
        setOpen(false);
    };
    const label = React.useMemo(() => {
        const match = props.options.options.find((opt) => opt.value === props.value);
        return match ? match.label : props.value;
    }, [props.value, props.options.options]);
    return (_jsxs(Wrapper, { tabIndex: 1, "$focus": props.focus.toString(), children: [_jsxs("div", { className: "value", onClick: handleClick, children: [label || "-", open ? _jsx(FaChevronUp, {}) : _jsx(FaChevronDown, {})] }), open && (_jsx("div", { className: "options", children: props.options.options.map((row) => (_jsx(Row, { selected: row.value === props.value, onClick: () => handleOptionSelect(row.value), children: row.label }, row.label))) }))] }));
}
const Wrapper = styled.div `
  position: relative;
  > .value {
    border: 1px solid
      ${(props) => (props.$focus === "true" ? "#1DA7FD" : "lightgrey")};
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
const Row = styled.div `
  padding-left: 5px;
  line-height: 30px;
  background: white;
  &:hover {
    background: whitesmoke;
    cursor: pointer;
  }
  ${(p) => p.selected && `&&& {background: silver;}`}
`;
