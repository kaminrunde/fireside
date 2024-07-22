import { v4 as uuidv4 } from "uuid";
import * as React from "react";
import { addons, types } from "@storybook/manager-api";
import * as t from "./types";
import Panel from "./Panel/Panel";
import { getPersistentChannel } from "./persistentChannel";
const hashit = require("hash-it");

addons.register("addons:storyboard-bridge", (api) => {
  const channel: t.Channel = addons.getChannel();
  getPersistentChannel(channel);

  addons.add("addons:storyboard-bridge", {
    type: types.PANEL,
    title: "Eigenschaften",
    render: ({ active }) => (
        <Panel channel={channel} api={api} key="fireside" />
    ),
  });

  let component = {
    id: uuidv4(),
    name: "not-known",
    props: {},
  };

  if (window.localStorage.getItem("debugFireside")) {
    channel.on("channelCreated" as any, (e) =>
      console.log("channelCreated", e),
    );
    channel.on("getCurrentStory" as any, (e) =>
      console.log("getCurrentStory", e),
    );
    channel.on("setCurrentStory" as any, (e) =>
      console.log("setCurrentStory", e),
    );
    channel.on("getStories" as any, (e) => console.log("getStories", e));
    channel.on("setStories" as any, (e) => console.log("setStories", e));
    channel.on("storiesConfigured" as any, (e) =>
      console.log("storiesConfigured", e),
    );
    channel.on("selectStory" as any, (e) => console.log("selectStory", e));
    channel.on("previewKeydown" as any, (e) =>
      console.log("previewKeydown", e),
    );
    channel.on("storyAdded" as any, (e) => console.log("storyAdded", e));
    channel.on("storyChanged" as any, (e) => console.log("storyChanged", e));
    channel.on("storyUnchanged" as any, (e) =>
      console.log("storyUnchanged", e),
    );
    channel.on("forceReRender" as any, (e) => console.log("forceReRender", e));
    channel.on("registerSubscription" as any, (e) =>
      console.log("registerSubscription", e),
    );
    channel.on("storyInit" as any, (e) => console.log("storyInit", e));
    channel.on("storyRender" as any, (e) => console.log("storyRender", e));
    channel.on("storyRendered" as any, (e) => console.log("storyRendered", e));
    channel.on("storyMissing" as any, (e) => console.log("storyMissing", e));
    channel.on("storyErrored" as any, (e) => console.log("storyErrored", e));
    channel.on("storyThrewException" as any, (e) =>
      console.log("storyThrewException", e),
    );
    channel.on("storiesCollapseAll" as any, (e) =>
      console.log("storiesCollapseAll", e),
    );
    channel.on("storiesExpandAll" as any, (e) =>
      console.log("storiesExpandAll", e),
    );
    channel.on("docsRendered" as any, (e) => console.log("docsRendered", e));
    channel.on("navigateUrl" as any, (e) => console.log("navigateUrl", e));
    channel.on("storyboard-bridge/set-knobs", (e) =>
      console.log("storyboard-bridge/set-knobs", e),
    );
    channel.on("storyboard-bridge/set-knob-value", (e) =>
      console.log("storyboard-bridge/set-knob-value", e),
    );
    channel.on("storyboard-bridge/select-story", (e) =>
      console.log("storyboard-bridge/select-story", e),
    );
    channel.on("storyboard-bridge/story-selected", (e) =>
      console.log("storyboard-bridge/story-selected", e),
    );
    channel.on("storyboard-bridge/hydrate-component", (e) =>
      console.log("storyboard-bridge/hydrate-component", e),
    );
    channel.on("storyboard-bridge/update-component-name", (e) =>
      console.log("storyboard-bridge/update-component-name", e),
    );
    channel.on("storyboard-bridge/update-component-props", (e) =>
      console.log("storyboard-bridge/update-component-props", e),
    );
    channel.on("storyboard-bridge/init-knob-manager", (e) =>
      console.log("storyboard-bridge/init-knob-manager", e),
    );
  }

  channel.on("storyboard-bridge/select-story", (context) => {
    const storyId = api.storyId(context.kind, context.story);
    if (window.localStorage.getItem("debugFireside")) {
      console.log("createStoryId", storyId);
    }
    api.selectStory(storyId);
  });
  channel.on("storyboard-bridge/update-component-name", (name) => {
    component.name = name;
    sendToFiresideApp(component);
  });
  channel.on("storyboard-bridge/update-component-props", (props) => {
    component.props = props;
    sendToFiresideApp(component);
  });
  channel.on("storyboard-bridge/hydrate-component", ({ id }) => {
    component.id = id;
  });

  window.addEventListener("message", (e: any) => {
    if (typeof e.data !== "object" || !e.data.type) return;
    switch (e.data.type) {
      case "fireside-hydrate-component": {
        if (!e.data.component) {
          component.id = uuidv4();
          channel.emit("storyboard-bridge/clear-props");
        }

        if (e.data.component) {
          channel.emit("storyboard-bridge/hydrate-component", e.data.component);
        } else if (e.data.defaultStory) {
          let paths = e.data.defaultStory.split("/");
          const kind = paths.pop();
          api.selectStory(paths.join("/"), kind);
        }
      }
    }
  });

  channel.on("storyboard-bridge/init-knob-manager", () => {
    window.parent.postMessage(
      {
        type: "fireside-init",
      },
      "*",
    );
  });
});

function sendToFiresideApp(component: any) {
  if (!component.createdAt) {
    const now = Date.now();
    component.createdAt = now;
    component.updatedAt = now;
  }
  component.updatedAt = Date.now();
  const hash = hashit({
    props: component.props,
    name: component.name,
    id: component.id,
  }).toString();
  window.parent.postMessage(
    {
      type: "fireside-update-component",
      component: { ...component, hash },
    },
    "*",
  );
}
