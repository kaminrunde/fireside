import * as s from "../selectors";
import { State } from "../reducer";
import useConnect, { Config } from "hooks/useConnect";

type Input = {};

type Output = {
  data: ReturnType<typeof s.getStaticComponents>;
};

const config: Config<Input, Output, State, object> = {
  moduleKey: "plugins",
  name: "plugins/useStaticComponents",
  createCacheKey: () => "",
  mapState: (state) => ({
    data: s.getStaticComponents(state),
  }),
};

export default function useStaticComponents(): Output {
  const input: Input = {};
  const hook: Output = useConnect(input, config);
  return hook;
}
