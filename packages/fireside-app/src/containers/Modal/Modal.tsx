import * as React from "react";
import styled, { css } from "styled-components";
import { useMessage } from "modules/modal";
import theme from "theme";

export default function Modal() {
  const message = useMessage();

  if (!message.data) return null;

  return (
    <Wrapper>
      <div className="overlay" />
      <div className="content">
        <h2>{message.data.title}</h2>
        <p>{message.data.content}</p>
        {message.data.buttons && (
          <div className="buttons">
            {message.data.buttons.map((btn, i) => (
              <Button key={i} type={btn.type} onClick={btn.onClick}>
                {btn.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  > .overlay {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999999999999999999999998;
    background: rgba(0, 0, 0, 0.6);
  }
  > .content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100vw - 32px);
    max-width: 380px;
    padding: 20px;
    background: ${theme.color.surface};
    color: ${theme.color.text};
    border-radius: 10px;
    box-shadow: 0 12px 32px rgba(31, 41, 51, 0.28);
    z-index: 9999999999999999999999999;

    > h2 {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
    }

    > p {
      margin: 10px 0 0;
      font-size: 13px;
      line-height: 20px;
      color: ${theme.color.textMuted};
    }

    /* the selector said .button while the markup renders .buttons */
    > .buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 20px;
    }
  }
`;

const Button = styled.div`
  min-width: 92px;
  height: 36px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: ${theme.radius};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  ${(p) => {
    switch (p.type) {
      case "primary":
        return css`
          background: ${theme.color.primary};
          color: white;
          &:hover {
            background: ${theme.color.primaryHover};
          }
        `;
      case "secondary":
        return css`
          background: ${theme.color.surface};
          color: ${theme.color.text};
          border-color: ${theme.color.border};
          &:hover {
            background: ${theme.color.surfaceMuted};
          }
        `;
      case "error":
        return css`
          background: ${theme.color.danger};
          color: white;
          &:hover {
            background: ${theme.color.dangerHover};
          }
        `;
    }
  }}
`;
