import { DropCoinAction } from "./dropCoin";
import { ResetBoardAction } from "./resetBoard";
import { SetWinnerAction } from "./setWinner";

export type Action = DropCoinAction | ResetBoardAction | SetWinnerAction;
