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

const Game = props => {
  // 라운드 승패 판별
  useEffect(() => {
    if (
      props.isRunning === true &&
      props.p1Pick !== EMPTY &&
      props.p2Pick !== EMPTY
    ) {
      props.setRoundWinner();
    }
  }, [props.p1Pick, props.p2Pick]);

  // 어느 한쪽이 3게임을 먼저 승리하면 해당 세트 승리
  useEffect(() => {
    props.setSetWinner();
  }, [props.scores]);

  // 어느 한쪽이 3세트를 먼저 승리하면 전체 게임 승리
  useEffect(() => {
    props.setFinalWinner();
  }, [props.setScores]);

  return (
    <div>
      <Panel
        scores={props.scores}
        currentSet={props.currentSet}
        winner={props.winner}
      />
      <button onClick={props.runTimer}>시작</button>
      <button onClick={props.killTimer}>리셋</button>
      <p>{`${props.setScores.p1}, ${props.setScores.p2}`}</p>
      <h2>{props.isRunning ? "게임 진행 중" : "게임 중단"}</h2>
      <StyledGameArea>
        <div className={"game-buttons"}>
          <button
            disabled={props.winner}
            style={{ opacity: props.winner ? 0.3 : 1 }}
            onClick={props.startRound}
          >
            게임 시작
          </button>
          <button onClick={props.onRestartGame}>재시작</button>
          <button onClick={props.onQuitGame}>그만하기</button>
        </div>
        <Player
          player={P1}
          isRunning={props.isRunning}
          pick={props.p1Pick}
          pickCard={props.pickCard}
        />
        <Timer
          onTimeout={props.onTimeout}
          remainingTime={props.timer.remainingTime}
        />
        <Player
          player={P2}
          isRunning={props.isRunning}
          pick={props.p2Pick}
          pickCard={props.pickCard}
        />
      </StyledGameArea>
    </div>
  );
};

export default Game;
