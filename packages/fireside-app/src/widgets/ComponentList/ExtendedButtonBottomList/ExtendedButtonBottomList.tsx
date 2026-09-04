import * as React from "react";
import styled from "styled-components";
import { useExtendedButtonList } from "modules/plugins";
import Dropdown from "../Dropdown";
import theme from "theme";

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
    height: 36px;
    padding: 0 16px;
    border: none;
    border-radius: ${theme.radius};
    background: ${theme.color.surfaceMuted};
    color: ${theme.color.text};
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      background: #e8ecf1;
    }
  }
`;
