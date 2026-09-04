import * as a from "../actions";
import * as s from "../selectors";
import { State } from "../reducer";
import useConnect, { Config } from "hooks/useConnect";

type Result = {
  /** ids of the currently selected components */
  ids: string[];
  /** last individually clicked id. shift-click selects the range from here */
  anchor: string | null;
  set: (ids: string[], anchor?: string | null) => a.Set;
  toggle: (id: string) => a.Toggle;
  clear: () => a.Clear;
};

type DP = {
  set: typeof a.set;
  toggle: typeof a.toggle;
  clear: typeof a.clear;
};

type Props = {};

const config: Config<Props, Result, State, DP> = {
  moduleKey: "selection",
  name: "selection/useSelection",
  createCacheKey: () => "",
  mapState: (state) => ({
    ids: s.getSelection(state),
    anchor: s.getAnchor(state),
  }),
  mapDispatch: {
    set: a.set,
    toggle: a.toggle,
    clear: a.clear,
  },
};

export default function useSelection(): Result {
  const props = {};
  return useConnect<Props, Result, State, DP>(props, config);
}
