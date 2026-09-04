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

type Placement = { left: number; width: number; top?: number; bottom?: number };

const MAX_HEIGHT = 180;
const ROW_HEIGHT = 36;

export default function Select(props: Props) {
  const [focus, open, ref, close] = useFocus();
  const [placement, setPlacement] = React.useState<Placement | null>(null);

  /**
   * the dropdown floats over everything instead of sitting in the flow: this
   * select lives inside a dialog whose body scrolls, so an in-flow list grows
   * the dialog past its max height and ends up below the fold
   */
  React.useLayoutEffect(() => {
    if (!open) {
      setPlacement(null);
      return;
    }
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const below = window.innerHeight - rect.bottom;
      const next: Placement = { left: rect.left, width: rect.width };
      /**
       * measure against what the list actually needs, not against the cap,
       * so a two entry dropdown does not flip up for no reason
       */
      const needed = Math.min(
        MAX_HEIGHT,
        props.options.length * ROW_HEIGHT + 2
      );
      if (below < needed + 8 && rect.top > below) {
        next.bottom = window.innerHeight - rect.top + 4;
      } else {
        next.top = rect.bottom + 4;
      }
      setPlacement(next);
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [open, ref, props.options.length]);

  return (
    <Wrapper className="Select" ref={ref} onClick={focus}>
      <div className="value">
        {/* @ts-expect-error react-icons types not yet compatible with React 19 types */}
        {props.value.label} {open ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {open && placement && (
        <div
          className="dropdown"
          style={{
            left: placement.left,
            width: placement.width,
            top: placement.top,
            bottom: placement.bottom,
          }}
        >
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
    position: fixed;
    max-height: ${MAX_HEIGHT}px;
    overflow: auto;
    background: ${theme.color.surface};
    border: 1px solid ${theme.color.border};
    border-radius: ${theme.radius};
    box-shadow: 0 8px 24px rgba(31, 41, 51, 0.22);
    /* above the dialog it is opened from */
    z-index: 99999999999999999999999999;

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
