import * as s from "../selectors";
import { State } from "../reducer";
import useConnect, { Config } from "hooks/useConnect";

type Input = {};

type Output = {
  data: ReturnType<typeof s.getGridRowIcons>;
};

const config: Config<Input, Output, State, object> = {
  moduleKey: "plugins",
  name: "plugins/useGridRowIconList",
  createCacheKey: () => "",
  mapState: (state) => ({
    data: s.getGridRowIcons(state),
  }),
};

export default function useGridRowIconList(): Output {
  const input: Input = {};
  const hook: Output = useConnect(input, config);
  return hook;
}
