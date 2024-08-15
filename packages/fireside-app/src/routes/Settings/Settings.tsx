import * as React from "react";
import styled from "styled-components";
import { useActiveMediaSizes } from "modules/settings";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import MediaIcon from "components/MediaIcon";
import config from "config";
import { useSettingsPageComponents } from "modules/plugins";
import Component from "./Component";

type Props = {
  path: string;
};

export default function Settings(props: Props) {
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
  padding: 20px;

  > .row {
    > h3 {
      font-family: "Open Sans", sans-serif;
    }
    > hr {
      margin: 40px 0;
    }
  }

  .toggle {
    display: flex;
    > .label {
      margin-left: 10px;
      min-width: 150px;
      font-family: "Roboto", sans-serif;
      font-weight: bold;
    }
  }
`;
