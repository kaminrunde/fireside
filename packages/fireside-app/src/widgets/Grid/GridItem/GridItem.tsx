import * as React from "react";
import styled from "styled-components";
import * as $grid from "modules/grid";
import { useComponentIconList, useComponentBadgeList } from "modules/plugins";
import PluginButton from "./PluginButton";
import PluginBadge from "./PluginBadge";
import theme from "theme";

type Props = {
  mediaSize: string;
  rowHeight: number;
  active: boolean;
  onClick: (e: React.MouseEvent) => void;
  label: string;
  item: $grid.t.GridArea;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export default function GridItem(props: Props) {
  const iconList = useComponentIconList();
  const badgeList = useComponentBadgeList();

  return (
    <Wrapper
      rowHeight={props.rowHeight}
      active={props.active}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <div className="label">{props.label}</div>
      <div className="context">
        {iconList.data.map((row, i) => (
          <PluginButton
            mediaSize={props.mediaSize}
            componentId={props.item.i}
            key={i}
            pluginKey={row.meta.key}
            icon={row.payload}
          />
        ))}
      </div>
      <div className="badges">
        {badgeList.data.map((row, i) => (
          <PluginBadge
            key={i}
            mediaSize={props.mediaSize}
            componentId={props.item.i}
            pluginKey={row.meta.key}
            badge={row.payload}
          />
        ))}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;
  background: ${theme.color.surface};
  border: 1px solid #d5dae0;
  border-radius: 5px;
  box-shadow: ${theme.shadow};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
  user-select: none;
  position: relative;
  transition: box-shadow 120ms ease, border-color 120ms ease;

  &:hover {
    border-color: #bcc4cd;
    box-shadow: ${theme.shadowRaised};
  }

  /* selection reads the same here as it does in the component list */
  ${(props: any) =>
    props.active &&
    `
    background: ${theme.color.accentSoft};
    border-color: ${theme.color.accent};
    box-shadow: inset 0 0 0 1px ${theme.color.accent};
  `}

  > .label {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    text-align: center;
    padding: 0 5px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > .context {
    box-sizing: border-box;
    border: 1px solid ${theme.color.border};
    border-radius: ${theme.radius};
    box-shadow: ${theme.shadowRaised};
    display: none;
    position: absolute;
    top: -38px;
    left: 0;
    background: ${theme.color.surface};
    height: 34px;
    overflow: hidden;
    z-index: 5;
  }

  > .badges {
    position: absolute;
    left: 0px;
    top: -10px;
    display: flex;
  }

  &:hover {
    > .context {
      display: flex;
    }
    > .badges {
      display: none;
    }
  }
`;
