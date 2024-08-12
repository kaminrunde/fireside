import * as s from "../selectors";
import { State } from "../reducer";
import useConnect, { Config } from "hooks/useConnect";

type Result = {
  data: ReturnType<typeof s.isLoading>;
};

type Props = {};

const config: Config<Props, Result, State, never> = {
  moduleKey: "connector",
  name: "connector/useLoadingStatus",
  createCacheKey: () => "",
  mapState: (state) => ({
    data: s.isLoading(state),
  }),
};

export default function useLoadingStatus(): Result {
  const props = {};
  const hook = useConnect<Props, Result, State, object>(props, config);
  return hook;
}
