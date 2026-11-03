import * as React from "react";
import { createPlugin, RawStory } from "@kaminrunde/fireside-utils";
import { isOlderThanXMins } from "./utils";

const COMPONENT_KEY = "copy-storybook-component";
const TIMESTAMP_KEY = "copy-storybook-component-timestamp";
/** timestamp of the copy that was pasted last */
const PASTED_KEY = "copy-storybook-component-pasted";

export default createPlugin((ctx) => {
  ctx.extendComponentButtonList({
    onClickFn: (c: any) => () => {
      ctx.actions.triggerSnackbarEvent({
        type: "info",
        title: "Component copied to clipboard",
        content: "You can now paste it into a story.",
      });
      localStorage.setItem(COMPONENT_KEY, JSON.stringify(c));
      // iso keeps the milliseconds, so two copies within the same second
      // still count as two different clipboard contents
      localStorage.setItem(TIMESTAMP_KEY, new Date().toISOString());
    },
    btnLabel: "Copy Component",
    btnIcon: "copy",
    btnPlacement: "component",
    btnRenderCondition: true,
  });

  /**
   * returns true when a component was inserted, so the paste shortcut of the
   * app knows whether to switch to the component list
   */
  const pasteComponent = (): boolean => {
    const component = localStorage.getItem(COMPONENT_KEY);
    const timestamp = localStorage.getItem(TIMESTAMP_KEY);

    // using localStorage, mimic a clipboard by letting the copy expire
    if (!component || !timestamp || isOlderThanXMins(timestamp)) {
      ctx.actions.triggerSnackbarEvent({
        type: "warning",
        title: "Cannot paste component",
        content: "Please copy a component first",
      });
      return false;
    }

    // every copy can be inserted once, a second paste would only add a
    // duplicate by accident
    if (localStorage.getItem(PASTED_KEY) === timestamp) {
      ctx.actions.triggerSnackbarEvent({
        type: "warning",
        title: "Component already pasted",
        content: "Copy the component again to insert it once more",
      });
      return false;
    }

    ctx.actions.addComponentToComponentList(component);
    localStorage.setItem(PASTED_KEY, timestamp);
    ctx.actions.triggerSnackbarEvent({
      type: "info",
      title: "Component pasted",
      content: "The component was added to the component list",
    });
    return true;
  };

  ctx.extendComponentButtonList({
    onClickFn: pasteComponent,
    btnLabel: "Insert Component",
    // the app binds its paste shortcut to the action carrying this icon
    btnIcon: "paste",
    btnPlacement: "global",
    btnRenderCondition: () => true,
  });

  ctx.extendSettingsPage({
    row: {
      title: "Copy Story",
      component: (api) => {
        let modalConfirmed = false;

        const showInfoModal = async () => {
          const timestamp = localStorage.getItem(
            "copy-storybook-story-timestamp"
          );
          if (!timestamp || isOlderThanXMins(timestamp)) {
            ctx.actions.triggerSnackbarEvent({
              type: "warning",
              title: "Cannot paste component",
              content: "Please copy a component first",
            });
          } else if (!modalConfirmed) {
            const result = await ctx.actions.alert({
              title: "Insert whole story",
              description:
                "This will insert the whole story into the current story. This will overwrite the current story",
            });
            if (result === "OK") {
              const story = JSON.parse(
                localStorage.getItem("copy-storybook-story")
              );
              ctx.actions.updateStory(story);

              ctx.actions.triggerSnackbarEvent({
                type: "info",
                title: "Story inserted",
                content:
                  "The story was inserted and the current story was overriden",
              });
            }
          }
        };

        const copyWholeStoryLocalStorage = (story: RawStory) => {
          localStorage.setItem("copy-storybook-story", JSON.stringify(story));
          localStorage.setItem(
            "copy-storybook-story-timestamp",
            new Date().toString()
          );

          ctx.actions.triggerSnackbarEvent({
            type: "info",
            title: "Story copied",
            content:
              "The story was copied. You can now paste it into another story.",
          });
        };

        return (
          <div>
            <button
              onClick={() => copyWholeStoryLocalStorage(api.story)}
              style={styles.btn()}
            >
              Copy whole story
            </button>
            <button onClick={() => showInfoModal()} style={styles.btn()}>
              Insert whole story
            </button>
          </div>
        );
      },
    },
  });

  return undefined;
});

const styles = {
  btn: () => ({
    height: "40px",
    fontSize: "16px",
    border: "none",
    backgroundColor: "#f1f1f1",
    cursor: "pointer",
    borderRadius: "3px",
    marginRight: "10px",
  }),
};
