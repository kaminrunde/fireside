import * as React from "react";
import styled from "styled-components";
import { useExtendedButtonList } from "modules/plugins";
import { Component } from "@kaminrunde/fireside-utils";
import Dropdown from "../Dropdown";
import theme from "theme";

type Props = {
  c: Component;
};

export default function ExtendedButtonRowList(props: Props) {
  const btns = useExtendedButtonList();
  const rowBtns = btns.data.filter(
    (obj) =>
      obj.payload.btnPlacement === "component" &&
      (typeof obj.payload.btnRenderCondition === "function"
        ? obj.payload.btnRenderCondition()
        : obj.payload.btnRenderCondition)
  );

  if (rowBtns.length > 1) {
    return (
      <Wrapper>
        <Dropdown
          value={{ key: "defaultValue", label: "Actions" }}
          options={rowBtns.map((opt, i) => ({
            key: opt.payload.btnLabel,
            label: opt.payload.btnLabel,
            i: i,
          }))}
          onSelect={(currentIdx: any) =>
            btns.data[currentIdx.i].payload.onClickFn(props.c)
          }
        />
      </Wrapper>
    );
  }
  if (rowBtns.length === 1) {
    return (
      <Wrapper>
        <button
          className="btns"
          onClick={rowBtns[0].payload.onClickFn(props.c)}
        >
          {rowBtns[0].payload.btnLabel}
        </button>
      </Wrapper>
    );
  }
  return null;
}

const Wrapper = styled.div`
  > .btns {
    height: 30px;
    padding: 0 10px;
    border: none;
    border-radius: 4px;
    background: ${theme.color.surfaceMuted};
    color: ${theme.color.textMuted};
    font-family: inherit;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      background: #e8ecf1;
      color: ${theme.color.text};
    }
  }
`;
