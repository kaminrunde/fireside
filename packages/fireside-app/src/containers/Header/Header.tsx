import * as React from "react";
import styled from "styled-components";
import { ActionButtonsDisplay } from "widgets/ActionButtons";
import { FiMenu, FiPlusCircle } from "react-icons/fi";
import { MdClose, MdFullscreen } from "react-icons/md";
import { useSidebar } from "modules/ui";
import toggleFullscreen, { isFullscreen } from "toggle-fullscreen";
import { useComponents, useLoadingComponent } from "modules/components";
import * as components from "modules/components";

export default function Header() {
  const sidebar = useSidebar();
  const loading = useLoadingComponent();
  const components = useComponents();
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [component, setComponent] =
    React.useState<components.t.Component | null>(null);

  const handleFullscreenClick = () => {
    loading.isLoading ? setModalVisible(true) : toggleFullscreen(document.body);
  };

  React.useEffect(() => {
    const listener = (e: any) => {
      if (typeof e.data !== "object" || !e.data.type) return;
      if (e.data.type === "fireside-update-component") {
        setComponent({ ...e.data.component });
      }
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [loading.data]);

  const saveAndOpenFullscreen = () => {
    loading.data
      ? loading.update(loading.data.id, component)
      : loading.add(component);
    openFullScreen();
  };

  const openFullScreen = () => {
    setModalVisible(false);
    loading.unload();
    toggleFullscreen(document.body);
  };

  return (
    <>
      {isModalVisible && (
        <FullscreenModalWrapper>
          <div className="box">
            <button onClick={saveAndOpenFullscreen} className="green">
              Save changes & {isFullscreen() ? "close" : "open"} fullscreen
            </button>
            <button onClick={openFullScreen} className="red">
              {isFullscreen() ? "Close" : "Open"} Fullscreen <b>without</b> save
            </button>
            <button onClick={() => setModalVisible(false)}>Cancel</button>
          </div>
        </FullscreenModalWrapper>
      )}
      <Offset />
      <Wrapper>
        <div
          className="burger-menu"
          onClick={sidebar.isOpen ? sidebar.close : sidebar.open}
        >
          {sidebar.isOpen ? <MdClose /> : <FiMenu />}
        </div>
        <div className="logo"></div>
        <div className="title"></div>
        <ActionButtonsDisplay />
        {!loading.isLoading &&
          location.pathname === "/" &&
          components.data.length > 0 && (
            <div className="add" onClick={() => loading.load()}>
              <FiPlusCircle />
            </div>
          )}
        <div className="fullscreen" onClick={handleFullscreenClick}>
          <MdFullscreen />
        </div>
      </Wrapper>
    </>
  );
}

const Offset = styled.div`
  height: 60px;
  width: 100%;
`;

const Wrapper = styled.div`
  height: 60px;
  background: steelblue;
  display: flex;
  position: fixed;
  z-index: 99999;
  left: 0;
  right: 0;
  top: 0;

  > .burger-menu {
    cursor: pointer;
    height: 100%;
    width: 60px;
    display: flex;
    align-items: center;
    justify-items: center;
    > svg {
      margin-left: 15px;
      color: white;
      font-size: 30px;
    }
  }
  > .logo {
    width: 100px;
  }
  > .title {
    flex: 1;
  }
  > .ActionButtonsDisplay {
  }
  > .fullscreen {
    cursor: pointer;
    height: 100%;
    width: 60px;
    display: flex;
    align-items: center;
    justify-items: center;
    > svg {
      margin-left: 15px;
      color: white;
      font-size: 30px;
    }
  }
  > .add {
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    justify-items: center;
    > svg {
      margin-left: 15px;
      color: white;
      font-size: 26px;
    }
  }
`;

const FullscreenModalWrapper = styled.div`
  position: fixed;
  right: 5px;
  top: 0;
  z-index: 999999;

  > .box {
    background: steelblue;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    column-gap: 5px;

    > button {
      height: 50px;
      flex: 1;
      border: none;
      cursor: pointer;

      &:hover {
        background: rgb(221, 221, 221);
      }
    }

    .green {
      background-color: rgb(0, 150, 136);
      color: white;

      &:hover {
        background-color: rgb(0, 165, 148);
      }
    }

    .red {
      background-color: rgb(233, 30, 99);
      color: white;

      &:hover {
        background-color: rgb(243, 33, 103);
      }
    }
  }
`;
