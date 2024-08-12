import * as React from "react";
import { usePluginState } from "modules/plugins";
import { StaticComponentAPI } from "@kaminrunde/fireside-utils";

type Props = {
  pluginKey: string;
  component: {
    isActive?: (api: any) => boolean;
    component: (api: any) => any;
  };
};

export default React.memo(function Component(props: Props) {
  const state = usePluginState(props.pluginKey);

  const api: StaticComponentAPI<any> = {
    state: state.data,
    setState: (data: any) => {
      state.set(data);
    },
    story: state.story,
  };

  const isActive = props.component.isActive;

  if (isActive && !isActive(api)) return null;

  return <props.component.component {...api} />;
});
