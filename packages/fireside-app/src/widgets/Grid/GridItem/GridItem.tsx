import * as React from "react";
import styled from "styled-components";
import * as $grid from "modules/grid";
import { useComponentIconList, useComponentBadgeList } from 'modules/plugins'
import PluginButton from './PluginButton'
import PluginBadge from './PluginBadge'


type Props = {
  mediaSize: string;
  rowHeight: number;
  active: boolean;
  onClick: () => void;
  item: $grid.t.GridArea;
};

export default function GridItem(props: Props) {
  const iconList = useComponentIconList()
  const badgeList = useComponentBadgeList()
  
  return (
    <Wrapper
      rowHeight={props.rowHeight}
      active={props.active}
      onClick={props.onClick}
    >
      <span>{props.item.i}</span>
      <div className="context">
        {iconList.data.map((row,i) => (
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
        {badgeList.data.map((row,i) => (
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
  background: lightgrey;
  line-height: ${(p) => p.rowHeight}px;
  height: ${(p) => p.rowHeight}px;
  text-align: center;
  padding: 0 10px;
  cursor: pointer;
  font-family: "Open Sans", sans-serif;

  border-left: 8px solid transparent;

  ${(props: any) =>
    props.active &&
    `
    border-left: 8px solid #795548;
  `}

  > .context {
    box-sizing: border-box;
    border: 1px solid lightgrey;
    border-radius: 8px;
    display: none;
    position: absolute;
    top: -40px;
    left: 0;
    background: white;
    height: 40px;
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
