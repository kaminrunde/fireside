import * as s from "../selectors";
import { State } from "../reducer";
import useConnect, { Config } from "hooks/useConnect";

type Input = {};

type Output = {
  data: ReturnType<typeof s.getComponentBadges>;
};

const config: Config<Input, Output, State, object> = {
  moduleKey: "plugins",
  name: "plugins/useComponentBadgeList",
  createCacheKey: () => "",
  mapState: (state) => ({
    data: s.getComponentBadges(state),
  }),
};

export default function useComponentBadgeList(): Output {
  const input: Input = {};
  const hook: Output = useConnect(input, config);
  return hook;
}
