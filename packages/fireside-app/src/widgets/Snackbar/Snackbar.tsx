import * as React from "react";
import styled from "styled-components";
import { useMessages } from "modules/snackbar";
import { MdClose } from "react-icons/md";
import theme from "theme";

export default function Snackbar() {
  const messages = useMessages();

  return (
    <Wrapper className="Snackbar">
      {messages.data.map((msg, i) => (
        <Message key={i} type={msg.type}>
          <div
            className="close-wrapper"
            onClick={() => messages.removeByIndex(i)}
          >
            {/* @ts-expect-error react-icons types not yet compatible with React 19 types */}
            <MdClose />
          </div>
          <h5>{msg.title}</h5>
          <p>{msg.content}</p>
        </Message>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  left: 12px;
  bottom: 12px;
  /* stays inside the 600px contentful embed */
  width: min(380px, calc(100vw - 24px));
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 9999999999999999999999999999999;
`;

const accent = (type: string) => {
  if (type === "error") return "#d0432a";
  if (type === "warning") return "#e08a1e";
  return theme.color.accent;
};

const Message = styled.div`
  position: relative;
  padding: 12px 36px 12px 14px;
  background: ${theme.color.surface};
  border: 1px solid ${theme.color.border};
  border-left: 3px solid ${(props: any) => accent(props.type)};
  border-radius: ${theme.radius};
  box-shadow: ${theme.shadowRaised};
  color: ${theme.color.text};

  > h5 {
    margin: 0 0 3px;
    font-size: 13px;
    font-weight: 700;
    color: ${(props: any) => accent(props.type)};
  }
  > p {
    margin: 0;
    font-size: 13px;
    line-height: 18px;
    color: ${theme.color.textMuted};
  }
  > .close-wrapper {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    color: ${theme.color.textMuted};
    cursor: pointer;

    &:hover {
      background: ${theme.color.surfaceMuted};
      color: ${theme.color.text};
    }

    > svg {
      font-size: 16px;
    }
  }
`;
