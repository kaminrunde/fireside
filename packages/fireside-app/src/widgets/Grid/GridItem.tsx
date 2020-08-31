import * as React from "react";
import styled from "styled-components";
import * as $grid from "modules/grid";
import { FiSettings } from "react-icons/fi";
import { FaArrowsAltH } from "react-icons/fa";
import { useComponent } from "modules/components";
import { useComponentIconList } from 'modules/plugins'
import PluginButton from './PluginButton'

type Props = {
  mediaSize: string;
  rowHeight: number;
  active: boolean;
  onClick: () => void;
  item: $grid.t.GridArea;
};

export default function GridItem(props: Props) {
  const component = useComponent(props.item.i)
  const iconList = useComponentIconList()

  // const toggleFullWidth = (e:Event) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   component.toggleFullWidth(props.mediaSize)
  // };

  console.log(iconList)

  const isFullWidth = component.data.fullWidth && component.data.fullWidth[props.mediaSize]
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
            key={i}
            pluginKey={row.meta.key}
            icon={row.payload}
          />
        ))}
        {/* <CtxButton onClick={toggleFullWidth} active={isFullWidth}>
          <FaArrowsAltH />
        </CtxButton>
        <CtxButton>
          <FiSettings />
        </CtxButton> */}
      </div>
      <div className="badges">
        {isFullWidth && (
          <div>
            <FaArrowsAltH />
          </div>
        )}
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
    > div {
      margin-left: 5px;
      border: 1px solid grey;
      background: white;
      border-radius: 25px;
      padding: 0 4px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 9px;
      > svg {
        font-size: 17px;
      }
    }
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

const CtxButton = styled.button`
  width: max-content;
  font-size: 15px;
  background: ${(props) => (props.active ? "#4782B4" : "none")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: none;
  padding: 0 15px;
  cursor: pointer;
  border-left: 1px solid lightgrey;
  padding-top: 3px;
  &:first-child {
    border-left: none;
  }
`;
