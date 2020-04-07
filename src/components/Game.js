import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Player from "./Player";
import Timer from "./Timer";
import Panel from "./Panel";

import { P1, P2, DRAW } from "../utils";

const StyledGameArea = styled.section`
  margin-top: 50px;
  display: flex;
  > * {
    margin-right: 50px;
  }

  .game-buttons {
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    button {
      width: 100px;
      height: 40px;
      border: 2px solid #000000;
      border-radius: 4px;
      background-color: #ffffff;
      font-size: 16px;

      cursor: pointer;
    }
  }
`;

const Game = ({
  isRunning,
  currentSet,
  scores,
  p1Pick,
  p2Pick,
  winner,
  timer,
  roundResult,
  startRound,
  onQuitGame,
  onRestartGame,
  setScores,
  onTimeout,
  onPickCard,
}) => {
  // 라운드 결과 alert
  useEffect(() => {
    if (roundResult) {
      roundResult === DRAW ? alert("무승부") : alert(`${roundResult} 승`);
    }
  }, [roundResult]);

  return (
    <div>
      <Panel scores={scores} currentSet={currentSet} winner={winner} />
      <p>{`${setScores.p1}, ${setScores.p2}`}</p>
      <h2>{isRunning ? "게임 진행 중" : "게임 중단"}</h2>
      <StyledGameArea>
        <div className={"game-buttons"}>
          <button
            disabled={winner || isRunning}
            style={{ opacity: winner ? 0.3 : 1 }}
            onClick={startRound}
          >
            게임 시작
          </button>
          <button onClick={onRestartGame}>재시작</button>
          <button onClick={onQuitGame}>그만하기</button>
        </div>
        <Player
          player={P1}
          isRunning={isRunning}
          pick={p1Pick}
          pickCard={onPickCard}
        />
        <Timer onTimeout={onTimeout} remainingTime={timer.remainingTime} />
        <Player
          player={P2}
          isRunning={isRunning}
          pick={p2Pick}
          pickCard={onPickCard}
        />
      </StyledGameArea>
    </div>
  );
};

Game.propTypes = {
  isRunning: PropTypes.bool,
  currentSet: PropTypes.number,
  scores: PropTypes.array,
  setScores: PropTypes.object,
  p1Pick: PropTypes.string,
  p2Pick: PropTypes.string,
  winner: PropTypes.string,
  timer: PropTypes.object,
  roundResult: PropTypes.string,
  startRound: PropTypes.func,
  onQuitGame: PropTypes.func,
  onRestartGame: PropTypes.func,
  pickCard: PropTypes.func,
  setRoundWinner: PropTypes.func,
  setSetWinner: PropTypes.func,
  setFinalWinner: PropTypes.func,
  onTimeout: PropTypes.func,
};

export default Game;
