import * as React from "react";
import { createPlugin } from "@kaminrunde/fireside-utils";
import * as t from "./types";

export default createPlugin<t.State, t.Options>((ctx) => {
  ctx.extendComponentButtonList({
    onClickFn: (c: any) => () => {
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

  const component = localStorage.getItem("copy-storybook-component");
  ctx.extendComponentButtonList({
    onClickFn: (c: any) => ctx.actions.addComponentToComponentList(component),
    btnLabel: "Insert Component",
    btnPlacement: "global",
    btnRenderCondition: () => {
      // because we have to use localStorage and cannot use copyToClipboard
      // i decided to check if the component is older than 5 minutes
      // to imitate the copyToClipboard behaviour
      const isOlderThanXMins = (dateString: string) => {
        const date = new Date(dateString);
        const currentTime = new Date();
        const differenceInMilliseconds = currentTime.getTime() - date.getTime();
        const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
        return differenceInMinutes > 5;
      };

      const timestamp = localStorage.getItem(
        "copy-storybook-component-timestamp"
      );

      if (timestamp !== null && isOlderThanXMins(timestamp)) {
        return false;
      }

      return component === null ? false : true;
    },
  });

  return undefined;
});
