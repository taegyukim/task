import React from "react";
import { connect } from "react-redux";
import Game from "../components/Game";
import {
  pickCard,
  startRound,
  onTimeout,
  setRoundWinner,
  setSetWinner,
  setFinalWinner,
  onQuitGame,
  onRestartGame
} from "../modules/game";

const GameContainer = ({
  isRunning,
  currentSet,
  scores,
  p1Pick,
  p2Pick,
  winner,
  timer,
  startRound,
  onQuitGame,
  onRestartGame,
  pickCard,
  setRoundWinner,
  setSetWinner,
  setScores,
  setFinalWinner,
  onTimeout,
}) => {
  return (
    <Game
      isRunning={isRunning}
      currentSet={currentSet}
      scores={scores}
      p1Pick={p1Pick}
      p2Pick={p2Pick}
      winner={winner}
      timer={timer}
      startRound={startRound}
      onQuitGame={onQuitGame}
      onRestartGame={onRestartGame}
      pickCard={pickCard}
      setRoundWinner={setRoundWinner}
      setSetWinner={setSetWinner}
      setScores={setScores}
      setFinalWinner={setFinalWinner}
      onTimeout={onTimeout}
    />
  );
};

const mapStateToProps = state => {
  const gameState = state.gameReducer;
  return {
    isRunning: gameState.isRunning,
    currentSet: gameState.currentSet,
    scores: gameState.scores,
    p1Pick: gameState.p1Pick,
    p2Pick: gameState.p2Pick,
    winner: gameState.winner,
    timer: gameState.timer,
    setScores: gameState.setScores
  };
};

const mapDispatchToProps = dispatch => ({
  startRound: () => {
    dispatch(startRound());
  },
  onQuitGame: () => {
    dispatch(onQuitGame());
  },
  onRestartGame: () => {
    dispatch(onRestartGame());
  },
  pickCard: ({ player, pick }) => {
    dispatch(pickCard({ player, pick }));
  },
  setRoundWinner: () => {
    dispatch(setRoundWinner());
  },
  setSetWinner: () => {
    dispatch(setSetWinner());
  },
  setFinalWinner: () => {
    dispatch(setFinalWinner());
  },
  onTimeout: () => {
    dispatch(onTimeout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
