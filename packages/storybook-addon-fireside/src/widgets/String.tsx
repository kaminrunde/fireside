import * as React from "react";
import styled from "styled-components";
import * as t from "../types";

type Props = {
  value: string;
  onChange: (value: string) => void;
  focus: boolean;
  options: t.StringOptions;
  hasError: boolean;
};

export default function String(props: Props) {
  return (
    <Wrapper focus={props.focus.toString()}>
      <input
        type="text"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ focus: string }>`
  border: 1px solid
    ${(props) => (props.focus === "true" ? "#1DA7FD" : "lightgrey")};
  border-radius: 3px;
  padding-left: 5px;
  > input {
    width: 100%;
    border: none;
    line-height: 30px;
  }
`;
