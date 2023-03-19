import * as React from "react";
import styled from "styled-components";
import { useExtendedButtonList } from "modules/plugins";
import Dropdown from "../Dropdown";

type Props = {};

export default function ExtendedButtonBottomList(props: Props) {
  const btns = useExtendedButtonList();
  const rowBtns = btns.data.filter(
    (obj) =>
      obj.payload.btnPlacement === "global" &&
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
            rowBtns[currentIdx.i].payload.onClickFn()
          }
        />
      </Wrapper>
    );
  }
  if (rowBtns.length === 1) {
    return (
      <Wrapper>
        <button className="btns" onClick={() => rowBtns[0].payload.onClickFn()}>
          {rowBtns[0].payload.btnLabel}
        </button>
      </Wrapper>
    );
  }
  return null;
}

const Wrapper = styled.div`
  > .btns {
    height: 40px;
    margin: 10px;
    font-size: 16px;
    border: none;
    background-color: #f1f1f1;
    cursor: pointer;

    &:hover {
      background-color: #f9f9f9;
    }
  }
`;
