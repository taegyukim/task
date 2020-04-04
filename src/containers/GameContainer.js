import React from "react";
import { connect } from "react-redux";
import Game from "../components/Game";
import {
  startGame,
  stopGame,
  restartGame,
  quitGame,
  increaseSet,
  pickCard,
  updateScore,
  updateSetWinner,
  updateWinner,
  runTimer,
  killTimer,
  startRound
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
  increaseSet,
  pickCard,
  updateScore,
  updateSetWinner,
  updateWinner,
  runTimer,
  killTimer,
  timer,
  startRound
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
      increaseSet={increaseSet}
      pickCard={pickCard}
      updateScore={updateScore}
      updateSetWinner={updateSetWinner}
      updateWinner={updateWinner}
      runTimer={runTimer}
      killTimer={killTimer}
      timer={timer}
      startRound={startRound}
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
    timer: gameState.timer
  };
};

const mapDispatchToProps = (dispatch) => ({
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
  increaseSet: () => {
    dispatch(increaseSet());
  },
  pickCard: ({ player, pick }) => {
    dispatch(pickCard({ player, pick }));
  },
  updateScore: ({ set, player }) => {
    dispatch(updateScore({ set, player }));
  },
  updateSetWinner: ({ set, winner }) => {
    dispatch(updateSetWinner({ set, winner }));
  },
  updateWinner: winner => {
    dispatch(updateWinner(winner));
  },
  runTimer: () => {
    dispatch(runTimer());
  },
  killTimer: () => {
    dispatch(killTimer());
  },
  startRound: () => {
    dispatch(startRound());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
