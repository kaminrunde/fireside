import * as a from "../actions";
import * as s from "../selectors";
import { State } from "../reducer";
import useConnect, { Config } from "hooks/useConnect";

type Result = {
  data: ReturnType<typeof s.getComponents>;
  removeComponent: typeof a.remove;
};

type Props = {};

const config: Config<Props, Result, State, object> = {
  moduleKey: "components",
  name: "components/useComponents",
  createCacheKey: () => "",
  mapState: (state) => ({
    data: s.getComponents(state),
  }),
  mapDispatch: {
    removeComponent: a.remove,
  },
};

/**
 * list of all available components
 */
export default function useComponents(): Result {
  const props = {};
  const hook = useConnect<Props, Result, State, object>(props, config);
  return hook;
}
