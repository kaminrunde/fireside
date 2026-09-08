import * as React from "react";
import styled from "styled-components";
import { useComponents, useLoadingComponent } from "modules/components";
import { Component } from "@kaminrunde/fireside-utils";
import parseTimestamp from "./utils/parseTimestamp";
import { useUsedComponents } from "modules/grid";
import ExtendedButtonRowList from "./ExtendedButtonRowList";
import ExtendedButtonBottomList from "./ExtendedButtonBottomList";
import BreakpointIcons from "./BreakpointIcons";
import * as $selection from "modules/selection";
import { useSearch } from "modules/search";
import { findMatches, matchesQuery, Match } from "./utils/searchComponents";
import runPluginAction from "./utils/runPluginAction";
import { registerSearchInput } from "./searchInput";
import { useExtendedButtonList } from "modules/plugins";
import useShortcut from "hooks/useShortcut";
import * as shortcuts from "shortcuts";
import { FiSearch, FiX, FiEdit2, FiTrash2 } from "react-icons/fi";
import theme from "theme";
import tooltip from "tooltip";

export default function ComponentList() {
  const components = useComponents();
  const loading = useLoadingComponent();
  const usedComponents = useUsedComponents();
  const selection = $selection.useSelection();
  const pluginButtons = useExtendedButtonList();
  // in redux rather than local state so it survives a route change
  const { query, setQuery } = useSearch();

  const selectedIds = React.useMemo(
    () => new Set(selection.ids),
    [selection.ids]
  );

  const visible = React.useMemo(
    () => components.data.filter((c) => matchesQuery(c, query)),
    [components.data, query]
  );

  /**
   * a shift range runs over what is on screen, so it follows the search
   * filter instead of jumping over hidden components
   */
  const visibleIds = React.useMemo(() => visible.map((c) => c.id), [visible]);

  /**
   * the shortcuts act on a single pick only, and only while it is on screen:
   * acting on a component hidden by the search would happen invisibly
   */
  const target = React.useMemo(() => {
    if (selection.ids.length !== 1) return null;
    return visible.find((c) => c.id === selection.ids[0]) || null;
  }, [selection.ids, visible]);

  const canAct = !!target && !loading.isLoading;

  useShortcut(
    shortcuts.OPEN_COMPONENT,
    () => target && loading.load(target.id),
    canAct
  );

  /** cmd+c maps to whatever plugin action asks for the copy icon */
  const copyAction = React.useMemo(
    () =>
      pluginButtons.data.find(
        (b) =>
          b.payload.btnPlacement === "component" && b.payload.btnIcon === "copy"
      ) || null,
    [pluginButtons.data]
  );

  useShortcut(
    shortcuts.COPY_COMPONENT,
    () => target && copyAction && runPluginAction(copyAction.payload.onClickFn, target),
    canAct && !!copyAction
  );

  useShortcut(
    shortcuts.DELETE_COMPONENT,
    () => target && components.removeComponent(target),
    canAct
  );

  /** first active component in list order, the one the list scrolls to */
  const firstActive = React.useMemo(
    () => visibleIds.find((id) => selectedIds.has(id)) || null,
    [visibleIds, selectedIds]
  );

  const rows = React.useRef(new Map<string, HTMLDivElement>());
  const setRowRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) rows.current.set(id, el);
    else rows.current.delete(id);
  };

  /**
   * keep the active component in view, both when arriving on the route and
   * when tab moves it. "nearest" leaves an already visible row alone, the
   * scroll-margin on the row keeps it from ending up under the fixed header
   */
  React.useEffect(() => {
    if (!firstActive) return;
    rows.current.get(firstActive)?.scrollIntoView({ block: "nearest" });
  }, [firstActive]);

  /**
   * tab walks the active component instead of the browser focus: it steps on
   * from whatever is active, collapses a multi selection to the first entry,
   * and starts at either end when nothing usable is active. It wraps around,
   * so the last entry is not a dead end
   */
  const moveActive = (delta: number) => () => {
    if (!visibleIds.length) return;

    // leave the search field, otherwise the other shortcuts stay muted
    const el = document.activeElement;
    if (el instanceof HTMLElement && el.tagName === "INPUT") el.blur();

    const current =
      selection.ids.length === 1 ? visibleIds.indexOf(selection.ids[0]) : -1;

    let index: number;
    if (selection.ids.length > 1) index = 0;
    else if (current === -1) index = delta > 0 ? 0 : visibleIds.length - 1;
    else index = (current + delta + visibleIds.length) % visibleIds.length;

    const id = visibleIds[index];
    selection.set([id], id);
  };

  useShortcut(shortcuts.NEXT_COMPONENT, moveActive(1));
  useShortcut(shortcuts.PREV_COMPONENT, moveActive(-1));

  /**
   * a changed query means the list under the selection changed, so what was
   * active is no longer what the user is looking at
   */
  const lastQuery = React.useRef(query);
  React.useEffect(() => {
    if (lastQuery.current === query) return;
    lastQuery.current = query;
    if (selection.ids.length) selection.clear();
  }, [query, selection.ids.length, selection.clear]);

  const handleRowSelect =
    (id: string) => (e: React.MouseEvent | React.KeyboardEvent) => {
      const next = $selection.nextSelection(
        { ids: selection.ids, anchor: selection.anchor },
        {
          id,
          siblings: visibleIds,
          multi: e.ctrlKey || e.metaKey,
          range: e.shiftKey,
        }
      );
      selection.set(next.ids, next.anchor);
    };

  const isSearching = query.trim().length > 0;

  return (
    <Wrapper className="ComponentList">
      <div className="search">
        {/* @ts-expect-error react-icons types not yet compatible with React 19 types */}
        <FiSearch className="icon" />
        <input
          ref={registerSearchInput}
          type="text"
          value={query}
          placeholder="Search components"
          onChange={(e) => setQuery(e.target.value)}
        />
        {isSearching && (
          <div className="clear" title="Clear" onClick={() => setQuery("")}>
            {/* @ts-expect-error react-icons types not yet compatible with React 19 types */}
            <FiX />
          </div>
        )}
      </div>

      {isSearching && (
        <div className="result-count">
          {visible.length} of {components.data.length} components
        </div>
      )}

      {isSearching && visible.length === 0 && (
        <div className="empty">No component matches "{query.trim()}"</div>
      )}

      {visible.map((c) => (
        <Row
          key={c.id}
          inUse={usedComponents.data.has(c.id)}
          selected={selectedIds.has(c.id)}
          ref={setRowRef(c.id)}
          onClick={handleRowSelect(c.id)}
        >
          <div className="head">
            {/* the title attribute keeps the full name reachable once it is cut off */}
            <div className="title" title={c.props.gridArea}>
              {c.props.gridArea}
            </div>
            <div className="type" title={c.name}>
              {c.name}
            </div>
            <div className="meta">
              created {parseTimestamp(c.createdAt)}
              <span className="dot">·</span>
              changed {parseTimestamp(c.updatedAt)}
            </div>
            <MatchPreview component={c} query={query} />
          </div>
          {/* stopPropagation so acting on a row does not also toggle it */}
          <div className="button-list" onClick={(e) => e.stopPropagation()}>
            <BreakpointIcons componentId={c.id} />
            <div className="divider" />
            <ExtendedButtonRowList c={c} />
            <button
              className="icon-btn"
              data-tooltip="Update"
              aria-label="Update"
              onClick={() => loading.load(c.id)}
            >
              {/* @ts-expect-error react-icons types not yet compatible with React 19 types */}
              <FiEdit2 />
            </button>
            <button
              className="icon-btn danger"
              data-tooltip="Remove"
              aria-label="Remove"
              onClick={() => components.removeComponent(c)}
            >
              {/* @ts-expect-error react-icons types not yet compatible with React 19 types */}
              <FiTrash2 />
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

/** how many hits a card shows before it just counts the rest */
const MAX_PREVIEWS = 3;

/**
 * shows which field a component was found through. The grid area is left
 * out on purpose, the headline right above already is that value
 */
function MatchPreview(props: { component: Component; query: string }) {
  const matches = React.useMemo(
    () => findMatches(props.component, props.query),
    [props.component, props.query]
  );

  if (!matches.length) return null;

  const shown = matches.slice(0, MAX_PREVIEWS);
  const rest = matches.length - shown.length;

  return (
    <Matches>
      {shown.map((match: Match, i: number) => (
        <div className="match" key={`${match.path}-${i}`}>
          <span className="path">{match.path}</span>
          <span className="snippet">
            {match.snippet.slice(0, match.start)}
            <mark>
              {match.snippet.substr(match.start, match.length)}
            </mark>
            {match.snippet.slice(match.start + match.length)}
          </span>
        </div>
      ))}
      {rest > 0 && <div className="more">+{rest} more</div>}
    </Matches>
  );
}

const Matches = styled.div`
  margin-top: 6px;

  > .match {
    display: flex;
    gap: 6px;
    font-size: 11px;
    line-height: 17px;

    > .path {
      flex-shrink: 0;
      max-width: 40%;
      color: ${theme.color.textMuted};
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    > .snippet {
      min-width: 0;
      color: ${theme.color.text};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      > mark {
        padding: 0 1px;
        border-radius: 2px;
        background: #fde68a;
        color: inherit;
      }
    }
  }

  > .more {
    margin-top: 2px;
    font-size: 11px;
    color: ${theme.color.textMuted};
  }
`;

const Wrapper = styled.div`
  padding: 12px;
  font-family: ${theme.font};

  > .search {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    > .icon {
      position: absolute;
      left: 10px;
      font-size: 15px;
      color: ${theme.color.textMuted};
      pointer-events: none;
    }

    > input {
      width: 100%;
      height: 36px;
      padding: 0 34px;
      border: 1px solid ${theme.color.border};
      border-radius: ${theme.radius};
      background: ${theme.color.surface};
      font-size: 13px;
      color: ${theme.color.text};
      outline: none;

      &::placeholder {
        color: ${theme.color.textMuted};
      }

      &:focus {
        border-color: ${theme.color.accent};
        box-shadow: 0 0 0 3px rgba(61, 111, 158, 0.15);
      }
    }

    > .clear {
      position: absolute;
      right: 6px;
      width: 24px;
      height: 24px;
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
    }
  }

  > .result-count {
    margin-bottom: 8px;
    font-size: 11px;
    color: ${theme.color.textMuted};
  }

  > .empty {
    padding: 24px 12px;
    text-align: center;
    font-size: 13px;
    color: ${theme.color.textMuted};
  }

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

const Row = styled.div<{ inUse: boolean; selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  margin-bottom: 8px;
  background: ${(p) => (p.selected ? "#eff5fb" : theme.color.surface)};
  border: 1px solid
    ${(p) => (p.selected ? theme.color.accent : theme.color.border)};
  border-radius: ${theme.radius};
  cursor: pointer;
  user-select: none;
  /* the header is fixed at 60px, do not scroll a row underneath it */
  scroll-margin: 70px 0 16px;
  /**
   * the accent for components that sit in no grid is drawn as an inset
   * shadow rather than a left border, so the card keeps its full outline
   * either way and the row geometry never shifts
   */
  box-shadow: ${(p) =>
    p.inUse
      ? theme.shadow
      : `inset 3px 0 0 ${theme.color.unused}, ${theme.shadow}`};

  &:hover {
    box-shadow: ${(p) =>
      p.inUse
        ? theme.shadowRaised
        : `inset 3px 0 0 ${theme.color.unused}, ${theme.shadowRaised}`};
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
    gap: 2px;
    flex-shrink: 0;
    cursor: default;

    > .divider {
      width: 1px;
      height: 20px;
      margin: 0 6px;
      background: ${theme.color.border};
    }

    /* also applies to the plugin buttons, they render into this row */
    .icon-btn {
      ${tooltip}
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      border-radius: 4px;
      background: none;
      color: ${theme.color.textMuted};
      cursor: pointer;

      > svg {
        font-size: 16px;
      }

      &:hover {
        background: ${theme.color.surfaceMuted};
        color: ${theme.color.text};
      }

      &.danger:hover {
        background: #fdeceb;
        color: ${theme.color.danger};
      }
    }
  }
`;
