import * as React from "react";
import styled from "styled-components";
import MediaIcon from "components/MediaIcon";
import { useActiveMediaSizes } from "modules/settings";
import config from "config";

type Props = {
  mediaSize: string;
};

/**
 * shown instead of the grid when a media-size is reachable but switched off.
 * Navigation to a disabled breakpoint (number shortcut, bookmarked url) is
 * not blocked, it explains itself here and offers the way out
 */
export default function InactiveMediaSize(props: Props) {
  const ms = useActiveMediaSizes();
  const entry = config.mediaSizes.find((m) => m.key === props.mediaSize);

  if (!entry) {
    return (
      <Wrapper>
        <div className="title">Unknown breakpoint</div>
        <div className="description">
          There is no media-size called "{props.mediaSize}" in this project.
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="icon">
        <MediaIcon icon={entry.icon} />
      </div>
      <div className="title">{entry.label} is not active</div>
      <div className="description">
        This breakpoint is switched off, so it has no layout to edit. Activating
        it adds it to the story and to the menu.
      </div>
      <button onClick={() => ms.toggleSize(props.mediaSize)}>Activate</button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 160px);
  padding: 20px;
  text-align: center;
  font-family: "Open Sans", sans-serif;

  > .icon > svg {
    font-size: 60px;
    color: lightgrey;
  }

  > .title {
    margin-top: 20px;
    font-size: 22px;
    color: #555;
  }

  > .description {
    margin-top: 10px;
    max-width: 420px;
    font-size: 14px;
    line-height: 22px;
    color: #888;
  }

  > button {
    margin-top: 30px;
    min-width: 160px;
    height: 40px;
    background: #8bc34a;
    border: none;
    color: white;
    font-family: "Open Sans", sans-serif;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
  }
`;
