import * as React from "react";
import styled from "styled-components";
import store from "store";
import { push } from "redux-first-history";
import MediaIcon from "components/MediaIcon";
import { useActiveMediaSizes } from "modules/settings";
import { useUsedComponentsByMediaSize } from "modules/grid";
import * as $selection from "modules/selection";
import config from "config";
import theme from "theme";

type Props = {
  componentId: string;
};

/**
 * one icon per breakpoint, telling at a glance where a component is placed.
 * Clicking one jumps to that grid with the component selected, so it can be
 * dragged in right away when it is missing there
 */
export default function BreakpointIcons(props: Props) {
  const activeMediaSizes = useActiveMediaSizes();
  const placement = useUsedComponentsByMediaSize();
  const selection = $selection.useSelection();

  const open = (mediaSize: string) => (e: React.MouseEvent) => {
    // the row itself toggles the selection, this sets it outright
    e.stopPropagation();
    selection.set([props.componentId], props.componentId);
    store.dispatch(push(`/grid/${mediaSize}`));
  };

  return (
    <Wrapper className="BreakpointIcons">
      {config.mediaSizes.map((ms) => {
        const enabled = !!activeMediaSizes.data[ms.key];
        const placed = !!placement.data[ms.key]?.has(props.componentId);
        const state = !enabled ? "disabled" : placed ? "placed" : "missing";
        const hint = !enabled
          ? `${ms.label} — breakpoint inactive`
          : placed
          ? ms.label
          : `${ms.label} — not placed`;

        return (
          <div
            key={ms.key}
            className={`bp ${state}`}
            title={hint}
            onClick={open(ms.key)}
          >
            <MediaIcon icon={ms.icon} />
          </div>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
  flex-shrink: 0;

  > .bp {
    width: 24px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;

    > svg {
      font-size: 14px;
    }

    &:hover {
      background: ${theme.color.surfaceMuted};
    }

    /* placed in this grid */
    &.placed {
      color: ${theme.color.textMuted};
    }

    /* breakpoint is on but the component is not in its grid */
    &.missing {
      color: ${theme.color.danger};
    }

    /* breakpoint switched off entirely */
    &.disabled {
      color: #d3d8de;
    }
  }
`;
