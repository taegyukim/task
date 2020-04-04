import React from "react";
import { connect } from "react-redux";
import Game from "../components/Game";
import {
  startGame,
  stopGame,
  restartGame,
  quitGame,
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
  startGame,
  stopGame,
  restartGame,
  quitGame,
  pickCard,
  timer,
  startRound,
  onTimeout,
  setRoundWinner,
  setSetWinner,
  setScores,
  setFinalWinner,
  onQuitGame,
  onRestartGame
}) => {
  return (
    <Game
      isRunning={isRunning}
      currentSet={currentSet}
      scores={scores}
      p1Pick={p1Pick}
      p2Pick={p2Pick}
      winner={winner}
      startGame={startGame}
      stopGame={stopGame}
      restartGame={restartGame}
      quitGame={quitGame}
      pickCard={pickCard}
      timer={timer}
      startRound={startRound}
      onTimeout={onTimeout}
      setRoundWinner={setRoundWinner}
      setSetWinner={setSetWinner}
      setScores={setScores}
      setFinalWinner={setFinalWinner}
      onQuitGame={onQuitGame}
      onRestartGame={onRestartGame}
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
  startGame: () => {
    dispatch(startGame());
  },
  stopGame: () => {
    dispatch(stopGame());
  },
  restartGame: () => {
    dispatch(restartGame());
  },
  quitGame: () => {
    dispatch(quitGame());
  },
  pickCard: ({ player, pick }) => {
    dispatch(pickCard({ player, pick }));
  },
  startRound: () => {
    dispatch(startRound());
  },
  onTimeout: () => {
    dispatch(onTimeout());
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
  onQuitGame: () => {
    dispatch(onQuitGame());
  },
  onRestartGame: () => {
    dispatch(onRestartGame());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
