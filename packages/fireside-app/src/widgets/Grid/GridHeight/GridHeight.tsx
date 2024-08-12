import * as React from "react";
import styled from "styled-components";
import { FiSettings } from "react-icons/fi";
import { useGrid } from "modules/grid";
import {
  useGridRowIconList,
  useGridRowBadgeList,
  useGridRowSettingList,
} from "modules/plugins";
import PluginBadge from "./PluginBadge";
import PluginButton from "./PluginButton";
import PluginModal from "../PluginModal";

type Props = {
  mediaSize: string;
  height: string;
  index: number;
};

const GRID_MARGIN = 5;
const ROW_HEIGHT = 40;

export default function GridHeight(props: Props) {
  const grid = useGrid(props.mediaSize);
  const iconList = useGridRowIconList();
  const badgeList = useGridRowBadgeList();
  const settingsList = useGridRowSettingList();
  const [showModal, setShowModal] = React.useState(false);

  const pluginComponents = React.useMemo(() => {
    return settingsList.data.map((row) => ({
      title: row.payload.title,
      component: row.payload.component,
      isActive: row.payload.isActive,
      pluginKey: row.meta.key,
    }));
  }, settingsList.data);

  return (
    <Wrapper>
      <input
        type="text"
        value={props.height}
        onChange={(e) => grid.setHeight(props.index, e.target.value)}
      />
      <div className="context">
        {iconList.data.map((row, i) => (
          <PluginButton
            row={props.index}
            key={i}
            mediaSize={props.mediaSize}
            pluginKey={row.meta.key}
            icon={row.payload}
          />
        ))}
        {settingsList.data.length > 0 && (
          <button className="settings" onClick={() => setShowModal(true)}>
            <FiSettings />
          </button>
        )}
      </div>
      <div className="badges">
        {badgeList.data.map((row, i) => (
          <PluginBadge
            row={props.index}
            key={i}
            mediaSize={props.mediaSize}
            pluginKey={row.meta.key}
            badge={row.payload}
          />
        ))}
      </div>
      {showModal && (
        <PluginModal
          onClose={() => setShowModal(false)}
          title={`Grid row [${props.index}]`}
          components={pluginComponents}
          extraArgs={{
            mediaSize: props.mediaSize,
            row: props.index,
          }}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: ${GRID_MARGIN}px;
  height: ${ROW_HEIGHT}px;
  line-height: ${ROW_HEIGHT}px;
  text-align: center;
  position: relative;
  > input {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 14px;
    border: none;
    background: whitesmoke;
    text-align: center;
    font-family: "Open Sans", sans-serif;
    &:focus {
      background: white;
    }
  }
  > .context {
    box-sizing: border-box;
    border: 1px solid lightgrey;
    border-radius: 8px;
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin-left: 100%;
    background: white;
    z-index: 99997;

    > .settings {
      width: max-content;
      font-size: 12px;
      background: none;
      border: none;
      padding: 0 15px;
      cursor: pointer;
      border-left: 1px solid lightgrey;
      padding-top: 3px;
      > svg {
        font-size: 15px;
      }
      &:first-child {
        border-left: none;
      }
    }
  }

  > .badges {
    position: absolute;
    right: -12px;
    top: -5px;
    display: flex;
    > * {
      margin-right: 3px;
    }
  }

  &:hover {
    > .context {
      display: flex;
    }
    > .badges {
      display: none;
    }
  }
`;
