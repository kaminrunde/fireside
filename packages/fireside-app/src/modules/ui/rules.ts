import { addRule } from "redux-ruleset";
import { LOCATION_CHANGE } from "redux-first-history";
import { defaultState } from "./reducer";
import * as a from "./actions";
import * as at from "./const";

addRule<any>({
  id: "ui/CLEAR",
  target: LOCATION_CHANGE,
  output: at.CLEAR,
  condition: (_, { getState }) => {
    return getState().ui !== defaultState;
  },
  consequence: () => a.clear(),
});
