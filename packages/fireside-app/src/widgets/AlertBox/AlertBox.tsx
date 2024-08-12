import * as React from "react";
import styled from "styled-components";
import { useAlertBox } from "modules/ui";
import { MdClose } from "react-icons/md";

export default function AlertBox() {
  const alertBox = useAlertBox();

  if (!alertBox.modal) return null;

  const options = alertBox.modal.options || ["OK"];

  return (
    <Wrapper>
      <div className="overlay" />
      <div className="box">
        <div className="close-wrapper" onClick={() => alertBox.close("ABORT")}>
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
    width: 500px;
    padding: 30px 20px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    border: 1px solid grey;
    z-index: 9999999999999999999999999;
    box-shadow: 5px 5px 15px 5px #000000;
    border-radius: 3px;

    > .close-wrapper {
      position: absolute;
      top: -10px;
      right: -10px;
      padding: 15px;
      border-radius: 100%;
      background: white;
      border: 1px solid black;
      &:hover {
        background: whitesmoke;
        cursor: pointer;
      }
      > svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    > h3 {
      margin: 0;
      text-align: center;
      font-family: "Open Sans", sans-serif;
    }

    > p {
      text-align: center;
      font-family: "Roboto", sans-serif;
    }
  }
`;

const Options = styled.div`
  display: flex;
  margin-top: 40px;
  padding: 0 50px;
  justify-content: ${(p) => (p.single ? "center" : "space-between")};

  > button {
    border: none;
    position: relative;
    padding: 15px;
    font-family: "Roboto", sans-serif;
    cursor: pointer;

    &:hover {
      &:after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.2);
      }
    }
  }
`;
