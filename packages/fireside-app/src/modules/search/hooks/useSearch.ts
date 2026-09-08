import * as a from "../actions";
import * as s from "../selectors";
import { State } from "../reducer";
import useConnect, { Config } from "hooks/useConnect";

type Result = {
  query: string;
  setQuery: (query: string) => a.SetQuery;
};

type DP = {
  setQuery: typeof a.setQuery;
};

type Props = {};

const config: Config<Props, Result, State, DP> = {
  moduleKey: "search",
  name: "search/useSearch",
  createCacheKey: () => "",
  mapState: (state) => ({
    query: s.getQuery(state),
  }),
  mapDispatch: {
    setQuery: a.setQuery,
  },
};

export default function useSearch(): Result {
  const props = {};
  return useConnect<Props, Result, State, DP>(props, config);
}
