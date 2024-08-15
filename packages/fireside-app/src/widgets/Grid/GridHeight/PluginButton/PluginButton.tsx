import * as React from "react";
import styled from "styled-components";
import { usePluginState } from "modules/plugins";
import { PluginGridRowAPI } from "@kaminrunde/fireside-utils";

type Props = {
  pluginKey: string;
  mediaSize: string;
  row: number;
  icon: {
    component: any;
    isActive: (api: any) => boolean;
    onClick: (api: any) => void;
  };
};

export default React.memo(function PluginButton(props: Props) {
  const state = usePluginState(props.pluginKey);

  const api: PluginGridRowAPI<any> = {
    state: state.data,
    setState: (data: any) => {
      state.set(data);
    },
    mediaSize: props.mediaSize,
    row: props.row,
    story: state.story,
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.icon.onClick(api);
  };

  const isActive = props.icon.isActive(api);

  return (
    <Wrapper onClick={handleClick} active={isActive}>
      <props.icon.component {...api} />
    </Wrapper>
  );
});

const Wrapper = styled.button`
  width: max-content;
  font-size: 12px;
  background: ${(props) => (props.active ? "#4782B4" : "none")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: none;
  padding: 0 15px;
  cursor: pointer;
  border-left: 1px solid lightgrey;
  padding-top: 3px;
  > svg {
    font-size: 15px;
  }
  &:first-child {
    border-left: none;
  }
`;
