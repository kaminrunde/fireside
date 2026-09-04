import * as React from "react";
import store from "store";
import { push } from "redux-first-history";
import useShortcut from "hooks/useShortcut";
import { useLoadingComponent } from "modules/components";
import { ROUTES } from "shortcuts";

/**
 * app wide shortcuts. Everything that needs grid or storybook state is
 * registered in the widget owning that state instead
 */
export default function Shortcuts() {
  const loadingComponent = useLoadingComponent();

  return (
    <>
      {/*
       * plain digits instead of cmd+digit: browsers reserve cmd/ctrl+1-9 for
       * tab switching and do not let preventDefault() through
       */}
      {ROUTES.map((route, i) => (
        <RouteShortcut
          key={route.path}
          digit={String(i + 1)}
          path={route.path}
          enabled={!loadingComponent.isLoading}
        />
      ))}
    </>
  );
}

/**
 * ROUTES is built once at module level, so rendering one of these per entry
 * keeps the hook order stable
 */
function RouteShortcut(props: {
  digit: string;
  path: string;
  enabled: boolean;
}) {
  useShortcut(
    { key: props.digit },
    () => store.dispatch(push(props.path)),
    props.enabled
  );
  return null;
}
