import * as React from "react";
import styled, { css } from "styled-components";
import { useMessage } from "modules/modal";

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
              <Button key={i} type={btn.type} onClick={btn.label}>
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
    width: 300px;
    transform: translate(-50%, -50%);
    background: white;
    z-index: 9999999999999999999999999;
    padding: 20px;

    > h2 {
      text-align: center;
    }

    > p {
    }

    > .button {
      display: grid;
      margin-top: 20px;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;
    }
  }
`;

const Button = styled.div`
  border: none;
  background: none;
  border-radius: 5px;
  padding: 10px;
  ${(p) => {
    switch (p.type) {
      case "primary":
        return css`
          background: #8bc34a;
          color: whitesmoke;
        `;
      case "secondary":
        return css`
          background: whitesmoke;
          color: black;
          border: 2px solid #8bc34a;
        `;
      case "error":
        return css`
          background: #ff5722;
        `;
    }
  }}
`;
