import { getInitialBoard } from "../getInitialBoard";
import { BoardState } from "../board";

describe("getInitialBoard function", () => {
  it("returns an empty board", () => {
    const state: BoardState = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ];

    const newState = getInitialBoard();

    expect(newState).toEqual(state);
  });
});
