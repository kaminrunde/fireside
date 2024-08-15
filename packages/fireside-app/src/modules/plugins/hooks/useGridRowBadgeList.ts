import * as s from "../selectors";
import { State } from "../reducer";
import useConnect, { Config } from "hooks/useConnect";

type Input = {};

type Output = {
  data: ReturnType<typeof s.getGridRowBadges>;
};

const config: Config<Input, Output, State, object> = {
  moduleKey: "plugins",
  name: "plugins/useGridRowBadgeList",
  createCacheKey: () => "",
  mapState: (state) => ({
    data: s.getGridRowBadges(state),
  }),
};

export default function useGridRowBadgeList(): Output {
  const input: Input = {};
  const hook: Output = useConnect(input, config);
  return hook;
}
