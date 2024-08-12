import * as React from "react";
import { bindActionCreators } from "redux";
import store from "store";

interface CustomFunction extends Function {
  updateList: Function[];
}

export type Config<
  Input extends object,
  Result,
  State,
  DP extends Partial<{ [key in keyof Result]: Function }>
> = {
  moduleKey: string;
  moduleKey2?: string;
  name: string;
  createCacheKey: (props: Input) => string;
  mapState: (state: State, props: Input) => Partial<Result>;
  // mapDispatch?: Partial<{ [K in keyof Result]: Function }>,
  mapDispatch?: DP;
  transformDispatch?: Partial<{
    [K in keyof Result]: (fn: DP[K], sp: Result, props: Input) => Result[K];
  }>;
  areStatesEqual?: (a: State, b: State) => boolean;
};

const cache: Record<string, [any, any]> = {};
const creators: any = {};
const listeners: CustomFunction[] = [];
const dict: any = {};
const cbDict: any = {};
let setup = false;

function runSetup() {
  setup = true;
  store.subscribe(() => {
    const state = store.getState();
    for (let i = 0; i < listeners.length; i++) {
      listeners[i](state, (state: any) => {
        for (let j = 0; j < listeners[i].updateList.length; j++) {
          listeners[i].updateList[j](state);
        }
      });
    }
  });
}

export function removeItem<Item>(list: Item[], item: Item) {
  let i, j;

  for (i = 0, j = 0; i < list.length; ++i) {
    if (item !== list[i]) {
      list[j] = list[i];
      j++;
    }
  }

  if (j < i) list.pop();
}

function subscribe(cacheKey: string, update: Function, cb: any) {
  if (!dict[cacheKey]) {
    dict[cacheKey] = [];
    listeners.push(cb);
    cbDict[cacheKey] = cb;
    cb.updateList = [update];
  } else {
    cb = cbDict[cacheKey];
    cb.updateList.push(update);
  }
  return () => {
    if (cb.updateList.length === 1) {
      removeItem(listeners, cbDict[cacheKey]);
      dict[cacheKey] = null;
    } else {
      removeItem(cb.updateList, update);
    }
  };
}

export default function useBetterConnect<
  Input extends object,
  Result,
  State,
  DP
>(props: Input, m: Config<Input, Result, State, DP>): Result {
  if (!setup) runSetup();
  const rootState: any = store.getState();
  let state: State = rootState[m.moduleKey];
  if (m.moduleKey2) {
    // @ts-ignore
    state = state[m.moduleKey2];
  }
  const [, update] = React.useState(0);
  const cacheKey = m.name + m.createCacheKey(props);
  const cachedData = cache[cacheKey];
  const savedCacheKey = React.useRef("");
  let cachedState: State | null = null;
  let cachedResult: Result | null = null;
  if (cachedData) {
    cachedState = cachedData[0];
    cachedResult = cachedData[1];
  }
  savedCacheKey.current = cacheKey;

  React.useLayoutEffect(
    () =>
      subscribe(cacheKey, update, (state: any, update: any) => {
        state = state[m.moduleKey];
        if (m.moduleKey2) {
          state = state[m.moduleKey2];
        }
        const cachedData = cache[savedCacheKey.current];
        if (!cachedData) {
          update(state);
          return;
        }
        if (state === cachedData[0]) return;
        if (m.areStatesEqual && m.areStatesEqual(state, cachedData[0])) return;
        update(state);
      }),
    []
  );

  if (cachedResult && cachedState === state) {
    return cachedResult;
  }

  if (!creators[m.name]) {
    // @ts-ignore
    creators[m.name] = bindActionCreators(m.mapDispatch || {}, store.dispatch);
  }

  const dp = creators[m.name];
  let result: any = m.mapState(state, props);

  for (let name in dp) result[name] = dp[name];

  if (m.transformDispatch) {
    for (let name in m.transformDispatch) {
      const fn = m.transformDispatch[name];
      // @ts-ignore
      result[name] = fn(result[name], result, props);
    }
  }
  cache[cacheKey] = [state, result];
  return result;
}
