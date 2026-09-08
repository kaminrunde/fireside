import * as React from "react";
import store from "store";
import { push } from "redux-first-history";
import useShortcut from "hooks/useShortcut";
import { useLoadingComponent } from "modules/components";
import { useLocation } from "react-router-dom";
import { focusSearchInput } from "widgets/ComponentList/searchInput";
import { ROUTES, FOCUS_SEARCH } from "shortcuts";

/**
 * app wide shortcuts. Everything that needs grid or storybook state is
 * registered in the widget owning that state instead
 */
export default function Shortcuts() {
  const loadingComponent = useLoadingComponent();
  const location = useLocation();

  /**
   * coming from another route the list has to mount before its search field
   * exists, so keep trying for a few frames instead of firing once and
   * silently doing nothing
   */
  const focusSearch = () => {
    if (location.pathname !== "/") store.dispatch(push("/"));

    let tries = 0;
    const attempt = () => {
      if (focusSearchInput()) return;
      if (++tries > 30) return;
      requestAnimationFrame(attempt);
    };
    attempt();
  };

  useShortcut(FOCUS_SEARCH, focusSearch, !loadingComponent.isLoading);

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
