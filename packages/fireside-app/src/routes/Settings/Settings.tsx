import * as React from "react";
import styled from "styled-components";
import { useActiveMediaSizes } from "modules/settings";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import MediaIcon from "components/MediaIcon";
import config from "config";
import { useSettingsPageComponents } from "modules/plugins";
import Component from "./Component";
import Shortcuts from "./Shortcuts";
import theme from "theme";

export default function Settings() {
  const ms = useActiveMediaSizes();
  const pluginComponents = useSettingsPageComponents();
  return (
    <Wrapper className="Settings">
      <div className="row ms">
        <h3>Active Media-Sizes</h3>
        {Object.entries(ms.data).map(([key, active], i) => {
          const entry = config.mediaSizes.find((m) => m.key === key);
          if (!entry) return null;
          return (
            <div className="toggle" key={key}>
              {entry.icon && <MediaIcon icon={entry.icon} />}
              <div className="label">{entry.label}</div>
              <div className="value">
                <Toggle
                  checked={active}
                  onChange={(e) => i !== 0 && ms.toggleSize(key)}
                />
              </div>
            </div>
          );
        })}
        <hr />
      </div>
      <div className="row">
        <h3>Shortcuts</h3>
        <Shortcuts />
        <hr />
      </div>
      {pluginComponents.data.map((row, i) => (
        <div className="row ms" key={i}>
          <h3>{row.payload.title}</h3>
          <Component
            component={row.payload.component}
            pluginKey={row.meta.key}
          />
          <hr />
        </div>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 16px;
  font-family: ${theme.font};
  color: ${theme.color.text};
  max-width: 900px;

  > .row {
    > h3 {
      margin: 0 0 12px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      color: ${theme.color.textMuted};
    }
    > hr {
      margin: 28px 0;
      border: none;
      border-top: 1px solid ${theme.color.border};
    }
  }

  /* label and toggle used to collide on longer media-size names */
  .toggle {
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 320px;
    padding: 6px 0;

    > .label {
      flex: 1;
      min-width: 0;
      font-size: 13px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    > .value {
      flex-shrink: 0;
      display: flex;
      align-items: center;
    }

    > svg {
      flex-shrink: 0;
      color: ${theme.color.textMuted};
    }
  }
`;
