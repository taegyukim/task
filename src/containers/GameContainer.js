import React from "react";
import { connect } from "react-redux";
import Game from "../components/Game";
import {
  startRound,
  onTimeout,
  onQuitGame,
  onRestartGame,
  onPickCard,
} from "../modules/game";

const GameContainer = ({
  isRunning,
  currentSet,
  scores,
  setScores,
  p1Pick,
  p2Pick,
  winner,
  timer,
  roundResult,
  startRound,
  onQuitGame,
  onRestartGame,
  onTimeout,
  onPickCard,
}) => {
  return (
    <Game
      isRunning={isRunning}
      currentSet={currentSet}
      scores={scores}
      setScores={setScores}
      p1Pick={p1Pick}
      p2Pick={p2Pick}
      winner={winner}
      timer={timer}
      roundResult={roundResult}
      startRound={startRound}
      onQuitGame={onQuitGame}
      onRestartGame={onRestartGame}
      onTimeout={onTimeout}
      onPickCard={onPickCard}
    />
  );
};

const mapStateToProps = (state) => {
  const gameState = state.gameReducer;
  return {
    isRunning: gameState.isRunning,
    currentSet: gameState.currentSet,
    scores: gameState.scores,
    setScores: gameState.setScores,
    p1Pick: gameState.p1Pick,
    p2Pick: gameState.p2Pick,
    winner: gameState.winner,
    timer: gameState.timer,
    roundResult: gameState.roundResult,
  };
};

const mapDispatchToProps = (dispatch) => ({
  startRound: () => {
    dispatch(startRound());
  },
  onQuitGame: () => {
    dispatch(onQuitGame());
  },
  onRestartGame: () => {
    dispatch(onRestartGame());
  },
  onTimeout: () => {
    dispatch(onTimeout());
  },
  onPickCard: ({ player, pick }) => {
    dispatch(onPickCard({ player, pick }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
