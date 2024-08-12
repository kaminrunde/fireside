import * as s from "../selectors";
import { State } from "../reducer";
import useConnect, { Config } from "hooks/useConnect";

type Result = {
  data: ReturnType<typeof s.getUsedComponents>;
};

type Props = {};

const config: Config<Props, Result, State, never> = {
  moduleKey: "grid",
  name: "grid/useUsedComponents",
  createCacheKey: () => "",
  mapState: (state) => ({
    data: s.getUsedComponents(state),
  }),
};

export default function useGrid(): Result {
  const props: Props = {};
  const hook: Result = useConnect(props, config);
  return hook;
}
