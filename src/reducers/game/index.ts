import { reducer as board } from "./board";
import { reducer as scoreboard } from "./scoreboard";
import { combineReducers } from "redux";

export const reducer = combineReducers({
  board,
  scoreboard,
});

export type LocalState = ReturnType<typeof reducer>;
