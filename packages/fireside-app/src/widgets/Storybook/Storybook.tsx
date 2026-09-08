import * as React from "react";
import styled from "styled-components";
import * as components from "modules/components";
import ActionButtons from "widgets/ActionButtons";
import config from "config";
import useShortcut from "hooks/useShortcut";
import * as shortcuts from "shortcuts";
import theme from "theme";

export default function Storybook() {
  const ref = React.useRef<null | HTMLIFrameElement>(null);
  const [component, setComponent] =
    React.useState<components.t.Component | null>(null);
  const [setupFinished, setSetupFinished] = React.useState(false);
  const loadingComponent = components.useLoadingComponent();
  const [storybookUrl, setStorybookUrl] = React.useState("");

  React.useEffect(() => {
    const listener = (e: any) => {
      if (typeof e.data !== "object" || !e.data.type) return;
      switch (e.data.type) {
        case "fireside-update-component": {
          setComponent({ ...e.data.component });
          break;
        }
        case "fireside-init": {
          setSetupFinished(true);
          break;
        }
      }
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [loadingComponent.data]);

  React.useEffect(() => {
    if (!setupFinished) return;
    if (!loadingComponent.isLoading) return;

    ref.current?.contentWindow?.postMessage(
      {
        type: "fireside-hydrate-component",
        component: loadingComponent.data,
        defaultStory: config.defaultStory,
      },
      "*"
    );
  }, [setupFinished, loadingComponent.isLoading, loadingComponent.data]);

  /**
   * only reset storybook when the editing session actually ends.
   * Save can be blocked by validation rules (e.g. duplicate grid-area),
   * in that case isLoading stays true and the knob values must be kept
   */
  const wasLoading = React.useRef(loadingComponent.isLoading);
  React.useEffect(() => {
    if (wasLoading.current && !loadingComponent.isLoading) {
      ref.current?.contentWindow?.postMessage(
        { type: "fireside-abort-component" },
        "*"
      );
      // otherwise the next session starts out looking edited
      setComponent(null);
      setConfirmClose(false);
    }
    wasLoading.current = loadingComponent.isLoading;
  }, [loadingComponent.isLoading]);

  const [confirmClose, setConfirmClose] = React.useState(false);

  const save = () => {
    loadingComponent.data
      ? loadingComponent.update(loadingComponent.data.id, component)
      : loadingComponent.add(component);
  };

  /**
   * the addon hashes name, props and id and sends that along, and a stored
   * component carries the hash it was saved with - so a differing hash means
   * the knobs were touched. A component that is being created is dirty as
   * soon as the preview reports anything at all
   */
  const hasChanges = component
    ? !loadingComponent.data || component.hash !== loadingComponent.data.hash
    : false;

  const close = () => {
    if (hasChanges) setConfirmClose(true);
    else loadingComponent.unload();
  };

  /**
   * note that escape never arrives while the pointer is inside the preview:
   * keystrokes in the storybook iframe do not reach this window
   */
  useShortcut(
    shortcuts.CLOSE_STORYBOOK,
    close,
    loadingComponent.isLoading && !confirmClose
  );

  React.useEffect(() => {
    const match = window.location.search.match(/storybookUrl=([^&]+)/);

    if (match) setStorybookUrl(decodeURIComponent(match[1]));
    else setStorybookUrl(config.storybookUrl);
  }, []);

  return (
    <Wrapper className="Storybook" visible={loadingComponent.isLoading}>
      {loadingComponent.isLoading && (
        <ActionButtons
          buttons={[
            {
              label: "Save",
              type: "primary",
              onClick: save,
            },
            {
              label: "Abort",
              type: "danger",
              onClick: close,
            },
          ]}
        />
      )}

      {confirmClose && (
        <ConfirmWrapper>
          <div className="box">
            <h3>Unsaved changes</h3>
            <p>
              This component has been edited. Closing storybook now discards
              those changes.
            </p>
            <div className="options">
              <button className="ghost" onClick={() => setConfirmClose(false)}>
                Keep editing
              </button>
              <button
                className="danger"
                onClick={() => loadingComponent.unload()}
              >
                Discard
              </button>
              <button
                className="primary"
                onClick={() => {
                  setConfirmClose(false);
                  save();
                }}
              >
                Save &amp; close
              </button>
            </div>
          </div>
        </ConfirmWrapper>
      )}

      <div className="iframe-wrapper">
        {storybookUrl && (
          <iframe ref={ref} src={storybookUrl} title="Storybook" />
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  z-index: 99999999999;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  visibility: ${(props: any) => (props.visible ? "visible" : "hidden")};
  background: white;

  > .iframe-wrapper {
    height: 100%;
    width: 100%;
    /* contentfull bug fix */
    @media (min-width: 600px) and (max-width: 710px) {
      width: 599px;
      margin: 0 auto;
    }
    > iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
`;

const ConfirmWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  background: rgba(31, 41, 51, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.font};

  > .box {
    width: calc(100vw - 32px);
    max-width: 420px;
    padding: 20px;
    background: ${theme.color.surface};
    border-radius: 10px;
    box-shadow: 0 12px 32px rgba(31, 41, 51, 0.28);
    color: ${theme.color.text};

    > h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
    }

    > p {
      margin: 10px 0 0;
      font-size: 13px;
      line-height: 20px;
      color: ${theme.color.textMuted};
    }

    > .options {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 20px;

      > button {
        min-width: 92px;
        height: 36px;
        padding: 0 14px;
        border: 1px solid transparent;
        border-radius: ${theme.radius};
        font-family: inherit;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
      }

      > .ghost {
        background: ${theme.color.surface};
        color: ${theme.color.text};
        border-color: ${theme.color.border};
        &:hover {
          background: ${theme.color.surfaceMuted};
        }
      }

      > .danger {
        background: ${theme.color.danger};
        color: white;
        &:hover {
          background: ${theme.color.dangerHover};
        }
      }

      > .primary {
        background: ${theme.color.primary};
        color: white;
        &:hover {
          background: ${theme.color.primaryHover};
        }
      }
    }
  }
`;
