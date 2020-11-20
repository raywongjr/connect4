import { Action } from "../../actions/types";

export interface ScoreBoardState {
  yellow: number;
  red: number;
}

const initialState: ScoreBoardState = {
  yellow: 0,
  red: 0,
};

export const reducer = (
  state: ScoreBoardState = initialState,
  action: Action
): ScoreBoardState => {
  console.log(action.type);
  switch (action.type) {
    case "SET_WINNER":
      const { color } = action.payload;
      console.log(color);
      if (color) {
        const winnerCount = state[color];
        return {
          ...state,
          [color]: winnerCount + 1,
        };
      }

      return state;
    default:
      return state;
  }
};
