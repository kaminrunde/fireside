import * as React from "react";
import styled from "styled-components";
import { EDITOR_SHORTCUTS, ROUTES, formatShortcut } from "shortcuts";

/**
 * reads the same definitions the shortcuts are registered from, so the list
 * cannot drift away from the actual bindings
 */
export default function Shortcuts() {
  return (
    <Wrapper className="Shortcuts">
      {EDITOR_SHORTCUTS.map((shortcut) => (
        <div className="row" key={shortcut.description}>
          <kbd>{formatShortcut(shortcut)}</kbd>
          <div className="description">{shortcut.description}</div>
        </div>
      ))}
      {ROUTES.map((route, i) => (
        <div className="row" key={route.path}>
          <kbd>{i + 1}</kbd>
          <div className="description">Go to {route.label}</div>
        </div>
      ))}
      <div className="hint">
        Shortcuts are inactive while a component is open in storybook and while
        you type in an input field.
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  > .row {
    display: flex;
    align-items: center;
    padding: 6px 0;

    > kbd {
      flex: 0 0 140px;
      margin-right: 20px;
      padding: 5px 8px;
      background: whitesmoke;
      border: 1px solid lightgrey;
      border-bottom-width: 2px;
      border-radius: 4px;
      font-family: "Roboto", monospace;
      font-size: 13px;
      color: #555;
      text-align: center;
    }

    > .description {
      font-family: "Open Sans", sans-serif;
      font-size: 14px;
      color: #555;
    }
  }

  > .hint {
    margin-top: 15px;
    font-family: "Open Sans", sans-serif;
    font-size: 13px;
    color: #888;
  }
`;
