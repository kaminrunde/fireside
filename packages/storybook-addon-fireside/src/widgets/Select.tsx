import * as React from "react";
import styled from "styled-components";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import * as t from "../types";

type Props = {
  value: string;
  onChange: (value: string) => void;
  focus: boolean;
  options: t.SelectOptions;
  hasError: boolean;
};

export default function Select(props: Props) {
  const [open, setOpen] = React.useState(props.focus);

  React.useEffect(() => {
    if (!props.focus) setOpen(false);
  }, [props.focus]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const label = React.useMemo(() => {
    const match = props.options.options.find(
      (opt) => opt.value === props.value
    );
    return match ? match.label : props.value;
  }, [props.value, props.options.options]);

  return (
    <Wrapper tabIndex="1" focus={props.focus.toString()}>
      <div className="value" onClick={handleClick}>
        {label || "-"}
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {open && (
        <div className="options">
          {props.options.options.map((row) => (
            <Row
              key={row.label}
              selected={row.value === props.value}
              onClick={() => props.onChange(row.value)}
            >
              {row.label}
            </Row>
          ))}
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ focus: string; tabIndex: string }>`
  position: relative;
  > .value {
    border: 1px solid
      ${(props) => (props.focus === "true" ? "#1DA7FD" : "lightgrey")};
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

const Row = styled.div<{ selected: boolean }>`
  padding-left: 5px;
  line-height: 30px;
  background: white;
  &:hover {
    background: whitesmoke;
    cursor: pointer;
  }
  ${(p) => p.selected && `&&& {background: silver;}`}
`;
