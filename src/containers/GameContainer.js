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
  updateWinner
} from "../modules/game";

const GameContainer = ({
  isRunning,
  currentSet,
  scores,
  pick_p1,
  pick_p2,
  winner,
  startGame,
  stopGame,
  restartGame,
  quitGame,
  increaseSet,
  pickCard,
  updateScore,
  updateSetWinner,
  updateWinner
}) => {
  return (
    <Game
      isRunning={isRunning}
      currentSet={currentSet}
      scores={scores}
      pick_p1={pick_p1}
      pick_p2={pick_p2}
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
    />
  );
};

const mapStateToProps = state => {
  const gameState = state.gameReducer;
  return {
    isRunning: gameState.isRunning,
    currentSet: gameState.currentSet,
    scores: gameState.scores,
    pick_p1: gameState.pick_p1,
    pick_p2: gameState.pick_p2,
    winner: gameState.winner
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
  increaseSet: () => {
    dispatch(increaseSet());
  },
  pickCard: ({ player, pick }) => {
    dispatch(pickCard({ player, pick }));
  },
  updateScore: ({ set, player }) => {
    dispatch(updateScore({ set, player }));
  },
  updateSetWinner: ({set, winner}) => {
    dispatch(updateSetWinner({set, winner}));
  },
  updateWinner: (winner) => {
    dispatch(updateWinner(winner))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
