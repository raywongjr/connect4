import { Color } from "../types";

export interface SetWinnerAction {
  type: "SET_WINNER";
  payload: { color: Color };
}

export function setWinner(color: Color): SetWinnerAction {
  return {
    type: "SET_WINNER",
    payload: { color },
  };
}
