import React from "react";
import cn from "classnames";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import {
  getBoard,
  getScoreboard,
  getCurrentPlayer,
  getWinner,
} from "../reducers/selectors";
import { Row } from "./Row";
import { dropCoin } from "../actions/dropCoin";
import { resetBoard } from "../actions/resetBoard";
import { setWinner } from "../actions/setWinner";
import { Color } from "../types";

interface Props {
  board: ReturnType<typeof getBoard>;
  scoreboard: ReturnType<typeof getScoreboard>;
  color: ReturnType<typeof getCurrentPlayer>;
  winner: ReturnType<typeof getWinner>;
  dropCoin: typeof dropCoin;
  resetBoard: typeof resetBoard;
  setWinner: typeof setWinner;
}

export class BoardComponent extends React.Component<Props> {
  dropCoin = (column: number) => () => {
    // we only allow a player to drop a coin if there is no winner yet
    if (!this.props.winner) {
      this.props.dropCoin(column, this.props.color);
    }
  };

  displayHeader() {
    // only display the winner if there is one
    if (this.props.winner) {
      return <h2>Congratulations, {this.props.winner.color} wins the game!</h2>;
    } else {
      return <h2>It's {this.props.color}'s turn to play</h2>;
    }
  }

  displayRow = (colors: Color[], key: number) => {
    return (
      <Row
        row={key}
        dropCoin={this.dropCoin}
        colors={colors}
        key={`column-${key}`}
        winner={this.props.winner}
      />
    );
  };

  displayScoreboard = (scoreboard: ReturnType<typeof getScoreboard>) => {
    const { red, yellow } = scoreboard;

    return (
      <div className="Game-Scoreboard">
        <table>
          <thead>
            <tr>
              <th>Red</th>
              <th>Yellow</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{red}</td>
              <td>{yellow}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  hasWinner = () => (this.props.winner ? true : false);

  componentDidUpdate(prevProps: Props) {
    const prevWinner = prevProps.winner;

    if (this.hasWinner() && prevWinner === null) {
      if (this.props.winner?.color) {
        this.props.setWinner(this.props.winner.color);
      }
    }
  }

  render() {
    const classes = cn("Game-Board");
    const replayClasses = cn("Game-Replay-Button", {
      "game-over": this.hasWinner(),
    });
    const replayLabel = this.hasWinner() ? "play again" : "start over";

    return (
      <>
        {this.displayHeader()}

        <div className="Game">
          <div className={classes}>{this.props.board.map(this.displayRow)}</div>
          <button
            className={replayClasses}
            onClick={() => this.props.resetBoard()}
          >
            {replayLabel}
          </button>
        </div>

        {this.displayScoreboard(this.props.scoreboard)}
      </>
    );
  }
}

const mapState = (state: RootState) => ({
  board: getBoard(state),
  scoreboard: getScoreboard(state),
  color: getCurrentPlayer(state),
  winner: getWinner(state),
});

export const Board = connect(mapState, { dropCoin, resetBoard, setWinner })(
  BoardComponent
);
