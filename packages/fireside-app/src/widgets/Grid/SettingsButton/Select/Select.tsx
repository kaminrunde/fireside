import * as React from "react";
import styled from "styled-components";
import useFocus from "hooks/useFocus";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import theme from "theme";

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
        {/* @ts-expect-error react-icons types not yet compatible with React 19 types */}
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

/**
 * the dropdown stays in the normal flow rather than floating: this select
 * lives inside a scrolling modal body, where an absolutely positioned list
 * gets clipped at the dialog edge
 */
const Wrapper = styled.div`
  font-size: 13px;
  cursor: pointer;

  > .value {
    height: 36px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${theme.color.border};
    border-radius: ${theme.radius};
    background: ${theme.color.surface};
    color: ${theme.color.text};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
      border-color: #cbd2d9;
    }

    > svg {
      flex-shrink: 0;
      margin-left: 8px;
      color: ${theme.color.textMuted};
    }
  }

  > .dropdown {
    margin-top: 4px;
    max-height: 180px;
    overflow: auto;
    background: ${theme.color.surface};
    border: 1px solid ${theme.color.border};
    border-radius: ${theme.radius};
    box-shadow: ${theme.shadow};

    > * {
      padding: 9px 10px;
      font-size: 13px;
      cursor: pointer;
      &:hover {
        background: ${theme.color.surfaceMuted};
      }
    }
  }
`;
