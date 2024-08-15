import * as React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import Component from "./Component";
import { PluginGridRowAPI } from "@kaminrunde/fireside-utils";

type Props = {
  title: string;
  onClose: () => void;
  components: {
    title: string;
    component: any;
    isActive?: (api: PluginGridRowAPI<any>) => boolean;
    pluginKey: string;
  }[];
  children?: any;
  extraArgs:
    | {
        mediaSize: string;
        row: number;
      }
    | {
        mediaSize: string;
        componentId: string;
      }
    | {
        mediaSize: string;
      };
};

export default function PluginModal(props: Props) {
  return (
    <Wrapper>
      <div className="overlay" onClick={props.onClose} />
      <div className="content">
        <h3 className="title">{props.title}</h3>
        <div className="close-wrapper" onClick={props.onClose}>
          <MdClose />
        </div>
        <div className="components">
          {props.children}
          {props.components.map((c, i) => (
            <Component key={i} component={c} extraArgs={props.extraArgs} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  > .overlay,
  .content {
    z-index: 9999999999999999999999999;
    position: fixed;
    &.overlay {
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      cursor: pointer;
    }
    &.content {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 600px;
      max-height: 80vh;
      width: 100%;
      margin: 0 auto;
      background: white;
      border-radius: 5px;
    }
  }

  > .content {
    padding: 10px;
    text-align: left;
    > .title {
      margin: 0;
      font-size: 30px;
      font-weight: normal;
      margin-bottom: 20px;
      font-family: "Open Sans" sans-serif;
    }
    > .close-wrapper {
      position: absolute;
      right: -20px;
      top: -20px;
      width: 40px;
      height: 40px;
      border: 1px solid grey;
      border-radius: 40px;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      > .svg {
        font-size: 30px;
      }
    }
    > .components {
      overflow-y: scroll;
      max-height: 70vh;
      padding-bottom: 100px;
    }
  }
`;
