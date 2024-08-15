import * as s from "../selectors";
import { State } from "../reducer";
import useConnect, { Config } from "hooks/useConnect";

type Input = {};

type Output = {
  data: ReturnType<typeof s.getComponentIcons>;
};

const config: Config<Input, Output, State, object> = {
  moduleKey: "plugins",
  name: "plugins/useComponentIconList",
  createCacheKey: () => "",
  mapState: (state) => ({
    data: s.getComponentIcons(state),
  }),
};

export default function useComponentIconList(): Output {
  const input: Input = {};
  const hook: Output = useConnect(input, config);
  return hook;
}
