import * as s from "../selectors";
import { State } from "../reducer";
import useConnect, { Config } from "hooks/useConnect";

type Input = {};

type Output = {
  data: ReturnType<typeof s.getExtendedComponentButtonList>;
};

const config: Config<Input, Output, State, object> = {
  moduleKey: "plugins",
  name: "plugins/useExtendedButtonList",
  createCacheKey: () => "",
  mapState: (state) => ({
    data: s.getExtendedComponentButtonList(state),
  }),
};

export default function useExtendedButtonList(): Output {
  const input: Input = {};
  const hook: Output = useConnect(input, config);
  return hook;
}
