import * as React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import Component from "./Component";
import { PluginGridRowAPI } from "@kaminrunde/fireside-utils";
import theme from "theme";

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
        <div className="head">
          <h3 className="title">{props.title}</h3>
          <div className="close-wrapper" onClick={props.onClose}>
            {/* @ts-expect-error react-icons types not yet compatible with React 19 types */}
            <MdClose />
          </div>
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
      /* never wider than the embed it lives in */
      width: calc(100vw - 32px);
      max-width: 560px;
      max-height: 84vh;
      display: flex;
      flex-direction: column;
      background: ${theme.color.surface};
      border-radius: 10px;
      box-shadow: 0 12px 32px rgba(31, 41, 51, 0.28);
      overflow: hidden;
    }
  }

  > .content {
    text-align: left;
    color: ${theme.color.text};

    > .head {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border-bottom: 1px solid ${theme.color.border};

      > .title {
        flex: 1;
        min-width: 0;
        margin: 0;
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 0.2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* used to hang outside the dialog at -20px, where it could be clipped */
      > .close-wrapper {
        flex-shrink: 0;
        width: 28px;
        height: 28px;
        border-radius: ${theme.radius};
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${theme.color.textMuted};
        cursor: pointer;

        &:hover {
          background: ${theme.color.surfaceMuted};
          color: ${theme.color.text};
        }

        > svg {
          font-size: 20px;
        }
      }
    }

    > .components {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      padding: 16px;
    }
  }
`;
