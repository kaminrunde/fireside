import * as React from "react";
import styled from "styled-components";
import { useSidebar } from "modules/ui";
import Link from "components/Link";
import config from "config";
import { useActiveMediaSizes } from "modules/settings";
import MediaIcon from "components/MediaIcon";
import { FaListUl, FaCog } from "react-icons/fa";
import theme from "theme";

export default function Sidebar() {
  const sidebar = useSidebar();
  const ms = useActiveMediaSizes();
  return (
    <Wrapper className="Sidebar">
      {sidebar.isOpen && [
        <div key="overlay" className="overlay" onClick={sidebar.close} />,
        <div key="content" className="content">
          <Link className="item" to="/">
            <div className="icon">
              {/* @ts-expect-error react-icons types not yet compatible with React 19 types */}
              <FaListUl />
            </div>
            <div className="label">COMPONENTS</div>
          </Link>
          {config.mediaSizes
            .filter((row) => ms.data[row.key])
            .map((ms) => (
              <Link key={ms.key} className="item" to={`/grid/${ms.key}`}>
                <div className="icon">
                  <MediaIcon icon={ms.icon} />
                </div>
                <div className="label">{ms.label}</div>
              </Link>
            ))}
          <Link className="item" to="/settings">
            <div className="icon">
              {/* @ts-expect-error react-icons types not yet compatible with React 19 types */}
              <FaCog />
            </div>
            <div className="label">SETTINGS</div>
          </Link>
        </div>,
      ]}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  > .overlay {
    z-index: 9999999998;
    position: fixed;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }

  > .content {
    z-index: 9999999999;
    position: fixed;
    left: 0;
    top: 60px;
    bottom: 0;
    width: 260px;
    max-width: 80vw;
    padding: 8px;
    background: ${theme.color.surface};
    box-shadow: ${theme.shadowRaised};

    > .item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: ${theme.radius};
      text-decoration: none;
      color: ${theme.color.text};
      cursor: pointer;
      font-family: ${theme.font};

      &:hover {
        background: ${theme.color.surfaceMuted};
      }

      > .icon {
        flex-shrink: 0;
        height: 18px;
        width: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${theme.color.textMuted};
        > svg {
          font-size: 17px;
        }
      }

      > .label {
        font-size: 13px;
        font-weight: 600;
        line-height: 18px;
        letter-spacing: 0.2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`;
