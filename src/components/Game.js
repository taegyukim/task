import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Player from "./Player";
import Timer from "./Timer";
import Panel from "./Panel";

import { P1, P2 } from "../utils";

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
  startRound,
  onQuitGame,
  onRestartGame,
  pickCard,
  setRoundWinner,
  setSetWinner,
  setScores,
  setFinalWinner,
  onTimeout
}) => {
  // 라운드 승패 판별
  useEffect(() => {
    if (isRunning === true && p1Pick !== "" && p2Pick !== "") {
      setRoundWinner();
    }
  }, [p1Pick, p2Pick]);

  // 세트 승패 판별
  useEffect(() => {
    setSetWinner();
  }, [scores]);

  // 최종 승자 판별
  useEffect(() => {
    setFinalWinner();
  }, [setScores]);

  return (
    <div>
      <Panel scores={scores} currentSet={currentSet} winner={winner} />
      <p>{`${setScores.p1}, ${setScores.p2}`}</p>
      <h2>{isRunning ? "게임 진행 중" : "게임 중단"}</h2>
      <StyledGameArea>
        <div className={"game-buttons"}>
          <button
            disabled={winner}
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
          pickCard={pickCard}
        />
        <Timer onTimeout={onTimeout} remainingTime={timer.remainingTime} />
        <Player
          player={P2}
          isRunning={isRunning}
          pick={p2Pick}
          pickCard={pickCard}
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
  startRound: PropTypes.func,
  onQuitGame: PropTypes.func,
  onRestartGame: PropTypes.func,
  pickCard: PropTypes.func,
  setRoundWinner: PropTypes.func,
  setSetWinner: PropTypes.func,
  setFinalWinner: PropTypes.func,
  onTimeout: PropTypes.func
};

export default Game;
