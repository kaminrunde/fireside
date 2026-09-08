import * as React from "react";
import styled from "styled-components";
import { useExtendedButtonList } from "modules/plugins";
import { Component } from "@kaminrunde/fireside-utils";
import {
  FiMoreVertical,
  FiCopy,
  FiClipboard,
  FiLayers,
  FiLink,
  FiStar,
  FiSettings,
} from "react-icons/fi";
import theme from "theme";
import runPluginAction from "../utils/runPluginAction";

type Props = {
  c: Component;
};

const ICONS: Record<string, any> = {
  copy: FiCopy,
  paste: FiClipboard,
  duplicate: FiLayers,
  link: FiLink,
  star: FiStar,
  settings: FiSettings,
};

/**
 * plugin actions for a single component row. A plugin that names an icon gets
 * a button of its own in the row, everything else stays behind the context
 * menu, where the label is the only thing to go by
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

  const withIcon = rowBtns.filter((b) => b.payload.btnIcon && ICONS[b.payload.btnIcon]);
  const inMenu = rowBtns.filter((b) => !b.payload.btnIcon || !ICONS[b.payload.btnIcon]);

  const run = (onClickFn: (arg?: any) => any) => () => {
    runPluginAction(onClickFn, props.c);
    setOpen(false);
  };

  return (
    <Wrapper ref={ref}>
      {withIcon.map((btn) => {
        const Icon = ICONS[btn.payload.btnIcon as string];
        return (
          <button
            key={btn.payload.btnLabel}
            className="icon-btn"
            data-tooltip={btn.payload.btnLabel}
            aria-label={btn.payload.btnLabel}
            onClick={run(btn.payload.onClickFn)}
          >
            <Icon />
          </button>
        );
      })}

      {inMenu.length > 0 && (
        <button
          className="icon-btn"
          data-tooltip="More actions"
          aria-label="More actions"
          onClick={() => setOpen(!open)}
        >
          {/* @ts-expect-error react-icons types not yet compatible with React 19 types */}
          <FiMoreVertical />
        </button>
      )}

      {open && inMenu.length > 0 && (
        <div className="menu">
          {inMenu.map((btn) => (
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

/** the .icon-btn look itself is owned by the row in ComponentList */
const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;

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
