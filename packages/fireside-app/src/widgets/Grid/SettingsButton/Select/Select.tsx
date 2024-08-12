import * as React from "react";
import styled from "styled-components";
import useFocus from "hooks/useFocus";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

type Props = {
  value: {
    key: string;
    label: string;
  };
  options: {
    key: string;
    label: string;
  }[];
  onSelect: (opt: { key: string; label: string }) => void;
};

export default function Select(props: Props) {
  const [focus, open, ref, close] = useFocus();
  return (
    <Wrapper className="Select" ref={ref} onClick={focus}>
      <div className="value">
        {props.value.label} {open ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {open && (
        <div className="dropdown">
          {props.options.map((opt) => (
            <div
              key={opt.key}
              onClick={() => {
                props.onSelect(opt);
                close();
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid #555;
  height: 40px;
  cursor: pointer;

  > .value {
    padding: 0 10px;
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    font-family: "Open Sans", sans-serif;

    > svg {
      margin-left: 10px;
    }
  }

  > .dropdown {
    border: 1px solid #555;
    height: 100px;
    overflow: auto;
    margin-top: 10px;
    font-family: "Open Sans", sans-serif;
    background: white;
    z-index: 999999999;
    > * {
      padding: 10px;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        background: lightgrey;
      }
    }
  }
`;
