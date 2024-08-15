import * as s from "../selectors";
import { State } from "../reducer";
import useConnect, { Config } from "hooks/useConnect";

type Input = {};

type Output = {
  data: ReturnType<typeof s.getGridRowSettingComponents>;
};

const config: Config<Input, Output, State, object> = {
  moduleKey: "plugins",
  name: "plugins/useGridRowSettingList",
  createCacheKey: () => "",
  mapState: (state) => ({
    data: s.getGridRowSettingComponents(state),
  }),
};

export default function useGridRowSettingList(): Output {
  const input: Input = {};
  const hook: Output = useConnect(input, config);
  return hook;
}
