import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import styled from "styled-components";
/**
 * the add button of a list plus a context menu holding the rarer actions.
 * Keeps the primary action a single full width button instead of a growing
 * stack of equally loud buttons
 */
export default function ListActions(props) {
    const [open, setOpen] = React.useState(false);
    const [confirming, setConfirming] = React.useState(null);
    const ref = React.useRef(null);
    const close = () => {
        setOpen(false);
        setConfirming(null);
    };
    React.useEffect(() => {
        if (!open)
            return;
        const listener = (e) => {
            if (ref.current && !ref.current.contains(e.target))
                close();
        };
        document.addEventListener("mousedown", listener);
        return () => document.removeEventListener("mousedown", listener);
    }, [open]);
    return (_jsxs(Wrapper, { ref: ref, className: "ListActions", children: [_jsxs("div", { className: "bar", children: [_jsx("button", { className: "add", onClick: props.onAdd, children: props.addLabel }), props.actions.length > 0 && (_jsx("button", { className: "toggle", title: "More actions", onClick: () => (open ? close() : setOpen(true)), children: "\u22EE" }))] }), open && (_jsx("div", { className: "menu", children: props.actions.map((action, i) => confirming === i ? (_jsxs("div", { className: "confirm", children: [_jsx("span", { children: action.confirm }), _jsx("button", { className: "yes", onClick: () => {
                                action.onClick();
                                close();
                            }, children: "Y" }), _jsx("button", { className: "no", onClick: () => setConfirming(null), children: "N" })] }, action.label)) : (_jsx("button", { className: "entry", disabled: action.disabled, onClick: () => {
                        if (action.confirm) {
                            setConfirming(i);
                            return;
                        }
                        action.onClick();
                        close();
                    }, children: action.label }, action.label))) }))] }));
}
const Wrapper = styled.div `
  position: relative;
  margin-top: 5px;

  > .bar {
    display: flex;
    gap: 5px;

    > button {
      border: 1px solid lightgrey;
      border-radius: 3px;
      background: #8bc34a;
      padding: 8px;
      cursor: pointer;
      font-weight: bold;
      color: white;
    }

    > .add {
      flex: 1;
    }

    > .toggle {
      flex: 0 0 34px;
      font-size: 16px;
      line-height: 1;
    }
  }

  > .menu {
    position: absolute;
    right: 0;
    top: calc(100% + 3px);
    z-index: 10;
    min-width: 190px;
    background: white;
    border: 1px solid lightgrey;
    border-radius: 3px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    overflow: hidden;

    > .entry {
      display: block;
      width: 100%;
      border: none;
      background: none;
      padding: 10px 12px;
      text-align: left;
      font-size: 13px;
      font-weight: bold;
      color: #333;
      cursor: pointer;

      &:hover {
        background: #d3d3d34d;
      }

      &:disabled {
        color: lightgrey;
        cursor: default;
        background: none;
      }
    }

    > .confirm {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      background: #ffe4c4;
      font-size: 13px;

      > span {
        flex: 1;
      }

      > button {
        margin-left: 10px;
        width: 20px;
        border: none;
        color: white;
        font-weight: bold;
        cursor: pointer;
      }

      > .yes {
        background: gold;
      }

      > .no {
        background: orangered;
      }
    }
  }
`;
