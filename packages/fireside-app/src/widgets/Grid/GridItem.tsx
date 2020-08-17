import * as React from "react";
import styled from "styled-components";
import * as $grid from "modules/grid";
import { FiSettings } from "react-icons/fi";
import { FaArrowsAltH } from "react-icons/fa";
import { useComponent } from "modules/components";

type Props = {
  rowHeight: number;
  active: boolean;
  onClick: () => void;
  item: $grid.t.GridArea;
};

export default function GridItem(props: Props) {
  const component = useComponent(props.item.i);
  console.log(props.item.i, component, props)

  const toggleFullWidth = (e:Event) => {
    e.preventDefault()
    e.stopPropagation()
    component.update({
      ...component.data,
      fullWidth: !component.data.fullWidth,
    });
  };
  return (
    <Wrapper
      rowHeight={props.rowHeight}
      active={props.active}
      onClick={props.onClick}
    >
      <span>{props.item.i}</span>
      <div className="context">
        {/* {componentPlugins.icons.map(row => (
            <button 
              key={row.name} 
              active={row.icon.isActive(row.icon.state)}
              onClick={row.icon.onClick(row.icon.state)}>
              {row.Badge}
            </button>
          ))} */}
        <CtxButton onClick={toggleFullWidth} active={component.data.fullWidth}>
          <FaArrowsAltH />
        </CtxButton>
        <CtxButton>
          <FiSettings />
        </CtxButton>
      </div>
      <div className="badges">
        {component.data.fullWidth && (
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
