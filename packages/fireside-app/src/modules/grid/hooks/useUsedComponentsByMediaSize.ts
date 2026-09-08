import * as s from "../selectors";
import { State } from "../reducer";
import useConnect, { Config } from "hooks/useConnect";

type Result = {
  data: ReturnType<typeof s.getUsedComponentsByMediaSize>;
};

type Props = {};

const config: Config<Props, Result, State, never> = {
  moduleKey: "grid",
  name: "grid/useUsedComponentsByMediaSize",
  createCacheKey: () => "",
  mapState: (state) => ({
    data: s.getUsedComponentsByMediaSize(state),
  }),
};

export default function useUsedComponentsByMediaSize(): Result {
  const props: Props = {};
  const hook: Result = useConnect(props, config);
  return hook;
}
