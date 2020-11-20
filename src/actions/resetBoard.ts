export interface ResetBoardAction {
  type: "RESET_BOARD";
}

export function resetBoard(): ResetBoardAction {
  return {
    type: "RESET_BOARD",
  };
}
