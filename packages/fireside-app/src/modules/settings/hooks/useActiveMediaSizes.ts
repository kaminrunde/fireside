import * as a from "../actions";
import * as s from "../selectors";
import { State } from "../reducer";
import useConnect, { Config } from "hooks/useConnect";

type Result = {
  data: ReturnType<typeof s.getActiveMediaSizes>;
  toggleSize: typeof a.toggleMediaSize;
};

type Props = {};

const config: Config<Props, Result, State, object> = {
  moduleKey: "settings",
  name: "settings/useActiveMediaSizes",
  createCacheKey: () => "",
  mapState: (state) => ({
    data: s.getActiveMediaSizes(state),
  }),
  mapDispatch: {
    toggleSize: a.toggleMediaSize,
  },
};

/**
 * list of all available components
 */
export default function useActiveMediaSizes(): Result {
  const props = {};
  const hook = useConnect<Props, Result, State, object>(props, config);
  return hook;
}
