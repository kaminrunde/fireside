import * as React from "react";
import { PluginGridRowAPI } from "@kaminrunde/fireside-utils";
import styled from "styled-components";
import * as t from "./types";
import produce from "immer";

type Props = PluginGridRowAPI<t.State> & {
  options: t.Options;
};

export default function Modal(props: Props) {
  const handleColorClick = (color: string) => () => {
    const state = produce(props.state, (state) => {
      if (
        state[props.mediaSize] &&
        state[props.mediaSize][props.row] === color
      ) {
        delete state[props.mediaSize][props.row];
        if (!Object.keys(state[props.mediaSize]).length) {
          delete state[props.mediaSize];
        }
        return state;
      }

      return {
        ...state,
        [props.mediaSize]: {
          ...state[props.mediaSize],
          [props.row]: color,
        },
      };
    });
    props.setState(state);
  };

  const optIsActive = (color: string) => {
    if (!props.state[props.mediaSize]) return;
    return props.state[props.mediaSize][props.row] === color;
  };

  return (
    <Wrapper>
      {props.options.colors.map((c) => (
        <Opt
          onClick={handleColorClick(c.label)}
          key={c.color}
          bg={c.color}
          active={optIsActive(c.label)}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  gap: 20px;
`;

const Opt = styled.div.attrs((p) => ({
  style: {
    background: p.bg,
  },
}))`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: ${(p) => (p.active ? "6" : "1")}px solid black;
  cursor: pointer;
`;
