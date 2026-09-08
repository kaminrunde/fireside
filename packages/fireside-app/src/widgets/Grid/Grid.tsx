import * as React from "react";
import styled from "styled-components";
import ActionButtons, { t } from "widgets/ActionButtons";
import * as $grid from "modules/grid";
import * as $selection from "modules/selection";
import theme from "theme";
import { useLoadingComponent, useComponents } from "modules/components";
import { useActiveMediaSizes } from "modules/settings";
import { useMessages } from "modules/snackbar";
import useShortcut from "hooks/useShortcut";
import * as shortcuts from "shortcuts";
import config from "config";
import useGridWidth from "./hooks/useGridWidth";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { FiPlus, FiMinus } from "react-icons/fi";
import GridItem from "./GridItem";
import GridHeight from "./GridHeight";
import { MdInfoOutline } from "react-icons/md";
import SettingsButton from "./SettingsButton";

const GRID_MARGIN = 5;
const ROW_HEIGHT = 40;
const CONTEXT_WIDTH = 120;

type Props = {
  mediaSize: string;
};

export default function Grid(props: Props) {
  const grid = $grid.useGrid(props.mediaSize);
  const loadingComponent = useLoadingComponent();
  const components = useComponents();
  const gridWidth = useGridWidth();
  const [draggingName, setDraggingName] = React.useState("");
  const selection = $selection.useSelection();
  const activeMediaSizes = useActiveMediaSizes();
  const messages = useMessages();
  const [actionButtons, setActionButtons] = React.useState<t.ActionButton[]>(
    []
  );
  const [hoverComponentId, setHoverComponentId] = React.useState<string | null>(
    null
  );

  const [labels, componentNames] = React.useMemo(() => {
    let labelDict: Record<string, string> = {};
    let nameDict: Record<string, string> = {};
    for (let c of components.data) {
      labelDict[c.id] = c.props.gridArea;
      nameDict[c.id] = c.name;
    }
    return [labelDict, nameDict];
  }, [components.data]);

  /**
   * grid items in reading order (top to bottom, left to right) and the
   * components that currently sit in the buffer. Both lists define the order
   * a shift-click range is resolved in
   */
  const [gridIds, bufferComponents] = React.useMemo(() => {
    const ids = [...grid.data.gridAreas]
      .sort((a, b) => a.y - b.y || a.x - b.x)
      .map((area) => area.i);
    const inGrid = new Set(ids);
    return [ids, components.data.filter((c) => !inGrid.has(c.id))] as const;
  }, [grid.data.gridAreas, components.data]);

  const bufferIds = React.useMemo(
    () => bufferComponents.map((c) => c.id),
    [bufferComponents]
  );

  const selectedIds = selection.ids;
  const isSelected = React.useMemo(() => new Set(selectedIds), [selectedIds]);

  /**
   * `siblings` is the ordered list of the pane the clicked item lives in,
   * so a range never spans grid and buffer. The semantics themselves are
   * shared with the component list
   */
  const handleItemClick =
    (id: string, siblings: string[]) => (e: React.MouseEvent) => {
      const next = $selection.nextSelection(
        { ids: selectedIds, anchor: selection.anchor },
        {
          id,
          siblings,
          multi: e.ctrlKey || e.metaKey,
          range: e.shiftKey,
        }
      );
      selection.set(next.ids, next.anchor);
    };

  const selectedInGrid = React.useMemo(
    () => selectedIds.filter((id) => gridIds.includes(id)),
    [selectedIds, gridIds]
  );

  /** keys of every media-size the user has enabled, in config order */
  const enabledMediaSizes = React.useMemo(
    () =>
      config.mediaSizes
        .filter((ms) => activeMediaSizes.data[ms.key])
        .map((ms) => ms.key),
    [activeMediaSizes.data]
  );

  /** move the selection into the buffer of the media-size on screen */
  const bufferSelection = React.useCallback(() => {
    if (!selectedInGrid.length) return;
    grid.toBufferMany([props.mediaSize], selectedInGrid);
  }, [selectedInGrid, grid.toBufferMany, props.mediaSize]);

  /**
   * move the selection into the buffer of every enabled media-size. The
   * selection is kept on purpose, the components stay marked in the buffer
   * strip so it is visible what just happened
   */
  const bufferSelectionEverywhere = React.useCallback(() => {
    if (!selectedIds.length) return;
    grid.toBufferMany(enabledMediaSizes, selectedIds);
    messages.add({
      type: "info",
      title: "Moved to buffer",
      content: `${selectedIds.length} component(s) removed from ${enabledMediaSizes.length} media-sizes`,
    });
  }, [selectedIds, enabledMediaSizes, grid.toBufferMany, messages.add]);

  useShortcut(shortcuts.BUFFER, bufferSelection);
  useShortcut(shortcuts.BUFFER_ALL, bufferSelectionEverywhere);
  useShortcut(
    shortcuts.OPEN_COMPONENT,
    () => loadingComponent.load(selectedIds[0]),
    selectedIds.length === 1 && !loadingComponent.isLoading
  );

  React.useEffect(() => {
    if (!selectedIds.length) return;
    let buttons: t.ActionButton[] = [];

    if (selectedIds.length === 1) {
      buttons.push({
        label: "Update",
        type: "primary",
        onClick: () => loadingComponent.load(selectedIds[0]),
      });
    }

    if (selectedInGrid.length) {
      buttons.push({
        label:
          selectedInGrid.length > 1
            ? `To Buffer (${selectedInGrid.length})`
            : "To Buffer",
        type: "danger",
        onClick: bufferSelection,
      });
    }

    if (selectedIds.length > 1) {
      buttons.push({
        label: "Deselect",
        type: "secondary",
        onClick: selection.clear,
      });
    }

    setActionButtons(buttons);
    return () => setActionButtons([]);
  }, [
    selectedIds,
    selectedInGrid,
    bufferSelection,
    loadingComponent.load,
    selection.clear,
  ]);

  // set propper z-index
  function calcZIndex() {
    setTimeout(() => {
      const list = Array.from(document.querySelectorAll(".react-grid-item"));
      list.forEach((row: any) => {
        if (!row.style) return;
        const yMatch = row.style.transform.match(/, (.*)px\)/);
        if (yMatch) row.style.zIndex = yMatch[1];
      });
    }, 50);
  }

  return (
    <Wrapper className="Grid">
      {actionButtons.length > 0 && <ActionButtons buttons={actionButtons} />}
      <div className="top">
        <div className="context">
          <button onClick={() => grid.removeWidth()}>
            {/* @ts-expect-error react-icons types not yet compatible with React 19 types */}
            <FiMinus />
          </button>
          <button onClick={() => grid.addWidth()}>
            {/* @ts-expect-error react-icons types not yet compatible with React 19 types */}
            <FiPlus />
          </button>
          <SettingsButton mediaSize={props.mediaSize} />
        </div>
        {grid.data.widths.map((width, i) => (
          <div className="width" key={i}>
            <input
              type="text"
              value={width}
              onChange={(e) => grid.setWidth(i, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="bottom">
        <div className="left">
          {grid.data.heights.map((height, i) => (
            <GridHeight
              key={i}
              mediaSize={props.mediaSize}
              index={i}
              height={height}
            />
          ))}
        </div>
        <div className="right" ref={gridWidth.ref}>
          <GridLayout
            layout={grid.data.gridAreas}
            cols={grid.data.widths.length}
            rowHeight={ROW_HEIGHT}
            droppingItem={{ i: "insert", w: 1, h: 1 }}
            onLayoutChange={(layout: any) => {
              grid.updateGrid(layout.filter((e: any) => e.i !== "insert"));
              calcZIndex();
            }}
            margin={[GRID_MARGIN, GRID_MARGIN]}
            isDroppable
            onDrop={(_layout: any, item: any) =>
              grid.addFromBuffer({ ...item, i: draggingName, static: true })
            }
            width={gridWidth.data}
          >
            {grid.data.gridAreas.map((item) => (
              <div key={item.i}>
                <GridItem
                  mediaSize={props.mediaSize}
                  rowHeight={ROW_HEIGHT}
                  active={isSelected.has(item.i)}
                  item={item}
                  onMouseEnter={() => setHoverComponentId(item.i)}
                  onMouseLeave={() => setHoverComponentId(null)}
                  label={labels[item.i]}
                  onClick={handleItemClick(item.i, gridIds)}
                />
              </div>
            ))}
          </GridLayout>
        </div>
      </div>
      <div className="buffer-offset" />
      <div className="buffer">
        {bufferComponents.map((c) => (
          <BufferComponent
            data-name={c.id}
            className="component"
            draggable
            active={isSelected.has(c.id)}
            onDragStart={(e: any) => {
              setDraggingName(c.id);
              e.dataTransfer.setData("text/plain", "");
            }}
            onClick={handleItemClick(c.id, bufferIds)}
            onDragEnd={() => setDraggingName("")}
            onMouseEnter={() => setHoverComponentId(c.id)}
            onMouseLeave={() => setHoverComponentId(null)}
            unselectable="on"
            title={c.props.gridArea}
            key={c.id}
          >
            <span className="label">{c.props.gridArea}</span>
          </BufferComponent>
        ))}
        <div className="offset" />
      </div>

      {hoverComponentId && (
        <HoverInfo>
          <div className="info">
            {/* @ts-expect-error react-icons types not yet compatible with React 19 types */}
            <MdInfoOutline />
          </div>
          <div className="labels">
            <span className="area">{labels[hoverComponentId]}</span>
            <span className="name">{componentNames[hoverComponentId]}</span>
          </div>
        </HoverInfo>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0 5px;
  position: relative;
  width: 100%;
  height: calc(100vh - 60px);
  position: relative;
  padding-bottom: 200px;

  .react-grid-layout {
    padding-bottom: 50px;
    box-sizing: content-box;
  }

  > .drag {
    width: 500px;
    height: 40px;
    background: grey;
  }

  > .top {
    height: ${ROW_HEIGHT + 10}px;
    display: flex;

    > .context {
      box-sizing: border-box;
      margin: ${GRID_MARGIN}px 0;
      width: ${CONTEXT_WIDTH}px;
      border: 1px solid ${theme.color.border};
      border-radius: ${theme.radius};
      background: ${theme.color.surface};
      display: flex;
      overflow: hidden;

      > button {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        color: ${theme.color.textMuted};
        background: none;
        border: none;
        border-left: 1px solid ${theme.color.border};
        cursor: pointer;

        &:first-child {
          border-left: none;
        }
        &:hover {
          background: ${theme.color.surfaceMuted};
          color: ${theme.color.text};
        }
      }
    }

    > .width {
      flex: 1;
      margin: ${GRID_MARGIN}px;
      text-align: center;
      > input {
        display: block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        font-size: 13px;
        color: ${theme.color.textMuted};
        border: 1px solid transparent;
        border-radius: 5px;
        background: ${theme.color.surfaceMuted};
        text-align: center;
        outline: none;
        &:hover {
          background: #e8ecf1;
        }
        &:focus {
          background: ${theme.color.surface};
          border-color: ${theme.color.accent};
          color: ${theme.color.text};
        }
      }
    }
  }

  > .bottom {
    display: flex;
    > .left {
      width: ${CONTEXT_WIDTH}px;
    }

    > .right {
      flex: 1;
    }
  }

  > .buffer-offset {
    height: 450px;
    width: 100%;
  }

  > .buffer {
    position: fixed;
    background: ${theme.color.canvas};
    z-index: 999999999;
    box-shadow: 0 -1px 0 ${theme.color.border}, 0 -6px 16px rgba(31, 41, 51, 0.08);
    left: 0;
    right: 0;
    bottom: 0;
    height: 200px;
    overflow: auto;
    padding: 14px 14px 50px 14px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px;

    @media (min-width: 800px) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media (min-width: 1100px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    @media (min-width: 1400px) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }

    @media (min-width: 1700px) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }

    > .offset {
      height: 80px;
      width: 100%;
    }
  }
`;

/**
 * one position instead of the previous top/bottom pair: the top variant
 * covered the row of grid controls, and the bottom one hid behind the buffer
 * strip. Just above the strip is clear of both
 */
const HoverInfo = styled.div`
  position: fixed;
  bottom: 214px;
  left: 14px;
  max-width: calc(100vw - 28px);
  background: ${theme.color.text};
  color: white;
  border-radius: ${theme.radius};
  box-shadow: ${theme.shadowRaised};
  padding: 7px 12px 7px 9px;
  font-size: 12px;
  z-index: 9999999999;
  display: flex;
  pointer-events: none;

  > .info {
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    > svg {
      font-size: 16px;
    }
  }

  > .labels {
    flex: 1;
    > span {
      display: block;
    }
    > .name {
      font-size: 18px;
    }
  }
`;

const BufferComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  background: ${theme.color.surface};
  border: 1px solid #d5dae0;
  border-radius: 5px;
  box-shadow: ${theme.shadow};
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 0 10px;
  color: ${theme.color.text};
  cursor: grab;
  height: ${ROW_HEIGHT}px;
  font-family: ${theme.font};
  font-size: 13px;
  overflow: hidden;
  transition: box-shadow 120ms ease, border-color 120ms ease;

  &:hover {
    border-color: #bcc4cd;
    box-shadow: ${theme.shadowRaised};
  }

  /**
   * grid-area names get long. Centering them with flex would clip both ends,
   * so they wrap over at most two lines inside the fixed tile height. The
   * title attribute keeps the full name reachable
   */
  > .label {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    overflow-wrap: anywhere;
    text-align: center;
    line-height: 15px;
  }

  /* a brown edge on a solid blue tile was the worst offender, selection
     reads the same everywhere now */
  ${(props: any) =>
    props.active &&
    `
    background: ${theme.color.accentSoft};
    border-color: ${theme.color.accent};
    box-shadow: inset 0 0 0 1px ${theme.color.accent};
  `}
`;
