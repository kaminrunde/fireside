import * as React from "react";
import styled from "styled-components";
import { useExtendedButtonList } from "modules/plugins";
import { Component } from "@kaminrunde/fireside-utils";
import Dropdown from "../Dropdown";

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
    text-transform: uppercase;
    height: 40px;
    margin: 10px;
    font-size: 16px;
    border: none;
    background-color: #f1f1f1;
    cursor: pointer;
    border-radius: 3px;

    &:hover {
      background-color: #f9f9f9;
    }
  }
`;
