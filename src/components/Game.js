import React, { useEffect } from "react";
import styled from "styled-components";
import Player from "./Player";
import Timer from "./Timer";
import Panel from "./Panel";

import { P1, P2, EMPTY } from "../utils";

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
  onTimeout,
}) => {
  // 라운드 승패 판별
  useEffect(() => {
    if (
      isRunning === true &&
      p1Pick !== EMPTY &&
      p2Pick !== EMPTY
    ) {
      setRoundWinner();
    }
  }, [p1Pick, p2Pick]);

  // 어느 한쪽이 3게임을 먼저 승리하면 해당 세트 승리
  useEffect(() => {
    setSetWinner();
  }, [scores]);

  // 어느 한쪽이 3세트를 먼저 승리하면 전체 게임 승리
  useEffect(() => {
    setFinalWinner();
  }, [setScores]);

  return (
    <div>
      <Panel
        scores={scores}
        currentSet={currentSet}
        winner={winner}
      />
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
        <Timer
          onTimeout={onTimeout}
          remainingTime={timer.remainingTime}
        />
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

export default Game;
