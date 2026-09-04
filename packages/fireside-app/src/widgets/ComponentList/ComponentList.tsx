import * as React from "react";
import styled from "styled-components";
import { useComponents, useLoadingComponent } from "modules/components";
import parseTimestamp from "./utils/parseTimestamp";
import { useUsedComponents } from "modules/grid";
import ExtendedButtonRowList from "./ExtendedButtonRowList";
import ExtendedButtonBottomList from "./ExtendedButtonBottomList";
import theme from "theme";

export default function ComponentList() {
  const components = useComponents();
  const loading = useLoadingComponent();
  const usedComponents = useUsedComponents();
  return (
    <Wrapper className="ComponentList">
      {components.data.map((c) => (
        <Row key={c.id} inUse={usedComponents.data.has(c.id)}>
          <div className="head">
            {/* the title attribute keeps the full name reachable once it is cut off */}
            <div className="title" title={c.props.gridArea}>
              {c.props.gridArea}
            </div>
            <div className="type" title={c.name}>
              {c.name}
            </div>
            <div className="meta">
              changed {parseTimestamp(c.updatedAt)}
              <span className="dot">·</span>
              created {parseTimestamp(c.createdAt)}
            </div>
          </div>
          <div className="button-list">
            <ExtendedButtonRowList c={c} />
            <button
              className="btn btn-update"
              onClick={() => loading.load(c.id)}
            >
              update
            </button>
            <button
              className="btn btn-remove"
              onClick={() => components.removeComponent(c)}
            >
              remove
            </button>
          </div>
        </Row>
      ))}
      <div className="globalBtns">
        <ExtendedButtonBottomList />
        <button className="add" onClick={() => loading.load()}>
          Add Component
        </button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 12px;
  font-family: ${theme.font};

  > .globalBtns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    margin-top: 16px;

    > .add {
      height: 36px;
      padding: 0 16px;
      font-size: 13px;
      font-weight: 600;
      font-family: inherit;
      border: none;
      border-radius: ${theme.radius};
      color: white;
      background: ${theme.color.primary};
      cursor: pointer;

      &:hover {
        background: ${theme.color.primaryHover};
      }
    }
  }
`;

const Row = styled.div<{ inUse: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  margin-bottom: 8px;
  background: ${theme.color.surface};
  border: 1px solid ${theme.color.border};
  border-left: 3px solid
    ${(p) => (p.inUse ? "transparent" : theme.color.unused)};
  border-radius: ${theme.radius};
  box-shadow: ${theme.shadow};

  &:hover {
    box-shadow: ${theme.shadowRaised};
  }

  /* min-width:0 lets the children actually shrink so the ellipsis can kick in */
  > .head {
    flex: 1;
    min-width: 0;

    /**
     * these names carry their meaning at the end (..._k2_bestecksets vs
     * ..._k1_buffet_20250622), so cutting them off with an ellipsis would
     * hide exactly the distinguishing part. Wrap over at most two lines
     * instead and break anywhere, which keeps the row height bounded
     */
    > .title {
      font-size: 14px;
      font-weight: 600;
      line-height: 19px;
      color: ${(p) => (p.inUse ? theme.color.text : theme.color.unused)};
      overflow: hidden;
      overflow-wrap: anywhere;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    > .type {
      display: inline-block;
      max-width: 100%;
      margin-top: 4px;
      padding: 2px 7px;
      border-radius: 4px;
      background: ${theme.color.surfaceMuted};
      color: ${theme.color.textMuted};
      font-size: 11px;
      line-height: 16px;
      vertical-align: bottom;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    > .meta {
      margin-top: 4px;
      color: ${theme.color.textMuted};
      font-size: 11px;
      line-height: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      > .dot {
        margin: 0 5px;
      }
    }
  }

  > .button-list {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;

    .btn {
      height: 30px;
      padding: 0 10px;
      border: none;
      border-radius: 4px;
      font-family: inherit;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      color: white;
      cursor: pointer;
      white-space: nowrap;
    }

    .btn-update {
      background: ${theme.color.primary};
      &:hover {
        background: ${theme.color.primaryHover};
      }
    }

    .btn-remove {
      background: ${theme.color.danger};
      &:hover {
        background: ${theme.color.dangerHover};
      }
    }
  }
`;
