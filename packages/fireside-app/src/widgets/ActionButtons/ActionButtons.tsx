import * as React from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import * as t from "./types";
import theme from "theme";

let allIds: Record<string, t.ActionButton[]> = {};
let byId: string[] = [];
let listener: null | ((data: t.ActionButton[]) => void) = null;
const update = () => {
  if (!listener) return;
  listener(allIds[byId[byId.length - 1]] || []);
};
const add = (id: string, data: t.ActionButton[]) => {
  byId.push(id);
  allIds[id] = data;
  update();
};
const remove = (id: string) => {
  const index = byId.findIndex((idx) => idx === id);
  if (index === -1) return;
  byId.splice(index, 1);
  delete allIds[id];
  update();
};

export default function ActionButtons(props: { buttons: t.ActionButton[] }) {
  React.useEffect(() => {
    const id = v4();
    add(id, props.buttons);
    return () => remove(id);
  }, [props.buttons]);
  return null;
}

export function ActionButtonsDisplay() {
  const [buttons, setButtons] = React.useState<t.ActionButton[]>([]);
  React.useLayoutEffect(() => {
    listener = setButtons;
  }, []);

  return (
    <Wrapper className="ActionButtonsDisplay">
      {buttons.map(({ label, ...rest }) => (
        <Btn key={label} {...rest} children={label} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Btn = styled.button`
  height: 32px;
  padding: 0 12px;
  border: none;
  border-radius: ${theme.radius};
  font-family: ${theme.font};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  white-space: nowrap;
  color: white;
  cursor: pointer;

  ${(props: any) =>
    props.type === "primary" &&
    `
    background: ${theme.color.primary};
    &:hover { background: ${theme.color.primaryHover}; }
  `}

  ${(props: any) =>
    props.type === "danger" &&
    `
    background: ${theme.color.danger};
    &:hover { background: ${theme.color.dangerHover}; }
  `}

  ${(props: any) =>
    props.type === "secondary" &&
    `
    background: rgba(255,255,255,0.18);
    &:hover { background: rgba(255,255,255,0.3); }
  `}
`;
