import * as React from "react";
import styled from "styled-components";
import { FiSettings } from "react-icons/fi";
import PluginModal from "../PluginModal";
import Select from "./Select";
import { useActiveMediaSizes } from "modules/settings";
import config from "config";
import * as $grid from "modules/grid";
import theme from "theme";

type Props = {
  mediaSize: string;
};

export default function SettingsButton(props: Props) {
  const [open, setOpen] = React.useState(false);
  const ms = useActiveMediaSizes();
  const grid = $grid.useGrid(props.mediaSize);
  const [gridCopyLabel, setGridCopyLabel] = React.useState({
    label: "Select...",
    key: "",
  });

  const handleCopyGridClick = () => {
    if (!gridCopyLabel.key) return;
    grid.copyGridFrom(gridCopyLabel.key);
    setGridCopyLabel({ label: "Select...", key: "" });
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>
        {/* @ts-expect-error react-icons types not yet compatible with React 19 types */}
        <FiSettings />
      </button>
      {open && (
        <PluginModal
          title="Grid-Settings"
          onClose={() => setOpen(false)}
          components={[]}
          extraArgs={props}
        >
          <ModalContent>
            <div className="row">
              <div className="label">
                Reset the entire Grid. All grid areas are send to buffer and the
                widths are removed
              </div>
              <button className="danger" onClick={grid.clearGrid}>
                Clear Grid
              </button>
            </div>

            <div className="row">
              <div className="label">
                Copy entire grid from selected media-size. Current grid will be
                removed
              </div>
              <Select
                value={gridCopyLabel}
                options={config.mediaSizes
                  .filter(
                    (row) => ms.data[row.key] && row.key !== props.mediaSize
                  )
                  .map((ms) => ({
                    key: ms.key,
                    label: ms.label,
                  }))}
                onSelect={setGridCopyLabel}
              />
              <button onClick={handleCopyGridClick}>Copy</button>
            </div>
          </ModalContent>
        </PluginModal>
      )}
    </>
  );
}

const ModalContent = styled.div`
  /* wraps instead of squeezing the select on a narrow embed */
  > .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    padding-bottom: 18px;
    margin-bottom: 18px;
    border-bottom: 1px solid ${theme.color.border};

    &:last-child {
      padding-bottom: 0;
      margin-bottom: 0;
      border-bottom: none;
    }

    > .label {
      flex: 1 1 100%;
      font-size: 13px;
      line-height: 19px;
      color: ${theme.color.textMuted};
    }

    > .Select {
      flex: 1;
      min-width: 160px;
    }

    > button {
      flex-shrink: 0;
      min-width: 90px;
      height: 36px;
      padding: 0 14px;
      background: ${theme.color.primary};
      border: none;
      border-radius: ${theme.radius};
      color: white;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      cursor: pointer;

      &:hover {
        background: ${theme.color.primaryHover};
      }

      /* resetting the grid is destructive, it should not read as a confirm */
      &.danger {
        background: ${theme.color.danger};
        &:hover {
          background: ${theme.color.dangerHover};
        }
      }
    }
  }
`;
