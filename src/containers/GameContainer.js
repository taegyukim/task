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
  updateScore
} from "../modules/game";

const GameContainer = ({
  isRunning,
  currentSet,
  score,
  pick_p1,
  pick_p2,
  startGame,
  stopGame,
  restartGame,
  quitGame,
  increaseSet,
  pickCard,
  updateScore
}) => {
  return (
    <Game
      isRunning={isRunning}
      currentSet={currentSet}
      score={score}
      pick_p1={pick_p1}
      pick_p2={pick_p2}
      startGame={startGame}
      stopGame={stopGame}
      restartGame={restartGame}
      quitGame={quitGame}
      increaseSet={increaseSet}
      pickCard={pickCard}
      updateScore={updateScore}
    />
  );
};

const mapStateToProps = state => {
  const gameState = state.gameReducer;
  return {
    isRunning: gameState.isRunning,
    currentSet: gameState.currentSet,
    score: gameState.score,
    pick_p1: gameState.pick_p1,
    pick_p2: gameState.pick_p2
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
