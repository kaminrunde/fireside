import * as React from "react";
import styled from "styled-components";
import { useExtendedButtonList } from "modules/plugins";
import { Component } from "@kaminrunde/fireside-utils";
import { FiMoreVertical } from "react-icons/fi";
import theme from "theme";

type Props = {
  c: Component;
};

/**
 * plugin actions for a single component row. They used to render as full
 * labelled buttons, which ate most of the row inside the 600px contentful
 * embed. One icon opening a popover instead, no matter how many there are
 */
export default function ExtendedButtonRowList(props: Props) {
  const btns = useExtendedButtonList();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  const rowBtns = btns.data.filter(
    (obj) =>
      obj.payload.btnPlacement === "component" &&
      (typeof obj.payload.btnRenderCondition === "function"
        ? obj.payload.btnRenderCondition()
        : obj.payload.btnRenderCondition)
  );

  React.useEffect(() => {
    if (!open) return;
    const listener = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [open]);

  if (rowBtns.length === 0) return null;

  /**
   * component placed buttons are curried: onClickFn(component) returns the
   * actual handler. Older ones do the work directly and return nothing, so
   * only call the result when we got a function back
   */
  const run = (onClickFn: (arg?: any) => any) => () => {
    const result = onClickFn(props.c);
    if (typeof result === "function") result();
    setOpen(false);
  };

  return (
    <Wrapper ref={ref}>
      <button
        className="toggle"
        title="More actions"
        aria-label="More actions"
        onClick={() => setOpen(!open)}
      >
        {/* @ts-expect-error react-icons types not yet compatible with React 19 types */}
        <FiMoreVertical />
      </button>

      {open && (
        <div className="menu">
          {rowBtns.map((btn) => (
            <button
              key={btn.payload.btnLabel}
              className="entry"
              onClick={run(btn.payload.onClickFn)}
            >
              {btn.payload.btnLabel}
            </button>
          ))}
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;

  > .toggle {
    height: 30px;
    width: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    border-radius: 4px;
    background: none;
    color: ${theme.color.textMuted};
    cursor: pointer;

    > svg {
      font-size: 17px;
    }

    &:hover {
      background: ${theme.color.surfaceMuted};
      color: ${theme.color.text};
    }
  }

  > .menu {
    position: absolute;
    right: 0;
    top: calc(100% + 4px);
    z-index: 20;
    min-width: 180px;
    background: ${theme.color.surface};
    border: 1px solid ${theme.color.border};
    border-radius: ${theme.radius};
    box-shadow: ${theme.shadowRaised};
    overflow: hidden;

    > .entry {
      display: block;
      width: 100%;
      padding: 9px 12px;
      border: none;
      background: none;
      text-align: left;
      font-size: 13px;
      font-weight: 600;
      color: ${theme.color.text};
      white-space: nowrap;
      cursor: pointer;

      &:hover {
        background: ${theme.color.surfaceMuted};
      }
    }
  }
`;
