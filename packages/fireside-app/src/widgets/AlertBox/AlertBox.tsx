import * as React from "react";
import styled from "styled-components";
import { useAlertBox } from "modules/ui";
import { MdClose } from "react-icons/md";
import theme from "theme";

export default function AlertBox() {
  const alertBox = useAlertBox();

  if (!alertBox.modal) return null;

  const options = alertBox.modal.options || ["OK"];

  return (
    <Wrapper>
      <div className="overlay" />
      <div className="box">
        <div className="close-wrapper" onClick={() => alertBox.close("ABORT")}>
          {/* @ts-expect-error react-icons types not yet compatible with React 19 types */}
          <MdClose />
        </div>
        <h3>{alertBox.modal.title}</h3>
        {alertBox.modal.description && <p>{alertBox.modal.description}</p>}
        <Options single={options.length === 1}>
          {options.map((opt) => (
            <button key={opt} onClick={() => alertBox.close(opt)}>
              {opt}
            </button>
          ))}
        </Options>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  > .overlay {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9999999999999999999999998;
  }

  > .box {
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100vw - 32px);
    max-width: 460px;
    padding: 22px 20px 20px;
    background: ${theme.color.surface};
    color: ${theme.color.text};
    border-radius: 10px;
    z-index: 9999999999999999999999999;
    box-shadow: 0 12px 32px rgba(31, 41, 51, 0.28);

    /* used to sit outside the box on a black bordered circle */
    > .close-wrapper {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: ${theme.radius};
      color: ${theme.color.textMuted};

      &:hover {
        background: ${theme.color.surfaceMuted};
        color: ${theme.color.text};
        cursor: pointer;
      }
      > svg {
        font-size: 18px;
      }
    }

    > h3 {
      margin: 0 30px 0 0;
      font-size: 16px;
      font-weight: 700;
    }

    > p {
      margin: 10px 0 0;
      font-size: 13px;
      line-height: 20px;
      color: ${theme.color.textMuted};
    }
  }
`;

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
  justify-content: flex-end;

  > button {
    min-width: 92px;
    height: 36px;
    padding: 0 14px;
    border: 1px solid ${theme.color.border};
    border-radius: ${theme.radius};
    background: ${theme.color.surface};
    color: ${theme.color.text};
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background: ${theme.color.surfaceMuted};
    }

    /* the last option is the one the dialog is asking for */
    &:last-child {
      border-color: transparent;
      background: ${theme.color.primary};
      color: white;

      &:hover {
        background: ${theme.color.primaryHover};
      }
    }
  }
`;
