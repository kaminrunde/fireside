import * as React from "react";
import { createPlugin, RawStory } from "@kaminrunde/fireside-utils";
import { isOlderThanXMins } from "./utils";

export default createPlugin((ctx) => {
  ctx.extendComponentButtonList({
    onClickFn: (c: any) => () => {
      ctx.actions.triggerSnackbarEvent({
        type: "info",
        title: "Component copied to clipboard",
        content: "You can now paste it into a story.",
      });
      localStorage.setItem("copy-storybook-component", JSON.stringify(c));
      localStorage.setItem(
        "copy-storybook-component-timestamp",
        new Date().toString()
      );
    },
    btnLabel: "Copy Component",
    btnPlacement: "component",
    btnRenderCondition: true,
  });

  ctx.extendComponentButtonList({
    onClickFn: (c: any) => {
      const component = localStorage.getItem("copy-storybook-component");
      const timestamp = localStorage.getItem(
        "copy-storybook-component-timestamp"
      );

      // Using localStorage, mimic copyToClipboard by checking if component is older than x
      if (timestamp && !isOlderThanXMins(timestamp)) {
        ctx.actions.addComponentToComponentList(component);
      } else {
        ctx.actions.triggerSnackbarEvent({
          type: "warning",
          title: "Cannot paste component",
          content: "Please copy a component first",
        });
      }
    },
    btnLabel: "Insert Component",
    btnPlacement: "global",
    btnRenderCondition: () => true,
  });

  ctx.extendSettingsPage({
    row: {
      title: "Copy Story",
      component: (api) => {
        let modalConfirmed = false;

        const showInfoModal = () => {
          const timestamp = localStorage.getItem(
            "copy-storybook-story-timestamp"
          );

          if (!timestamp && isOlderThanXMins(timestamp)) {
            ctx.actions.triggerSnackbarEvent({
              type: "warning",
              title: "Cannot paste component",
              content: "Please copy a component first",
            });
          } else if (!modalConfirmed) {
            ctx.actions.alert({
              title: "Insert whole story",
              description:
                "This will insert the whole story into the current story. This will overwrite the current story",
            });
            modalConfirmed = true;
          } else {
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
        };

        const copyWholeStoryLocalStorage = (story: RawStory) => {
          localStorage.setItem("copy-storybook-story", JSON.stringify(story));
          localStorage.setItem(
            "copy-storybook-story-timestamp",
            new Date().toString()
          );
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
