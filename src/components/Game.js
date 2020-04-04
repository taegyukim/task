import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Player from "./Player";
import Timer from "./Timer";
import Panel from "./Panel";

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
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [setWins, setSetWins] = useState({ p1: 0, p2: 0 });

  // 라운드 승패 판별
  useEffect(() => {
    if (
      props.isRunning === true &&
      props.p1Pick !== "" &&
      props.p2Pick !== ""
    ) {
      props.setRoundWinner();
    }
  }, [props.p1Pick, props.p2Pick]);

  // 어느 한쪽이 3게임을 먼저 승리하면 해당 세트 승리
  useEffect(() => {
    if (props.currentSet >= 1) {
      if (props.scores[props.currentSet - 1].p1 === 3) {
        props.updateSetWinner({ set: props.currentSet, winner: "p1" });
        setSetWins({ ...setWins, p1: setWins.p1 + 1 });
        props.increaseSet();
      } else if (props.scores[props.currentSet - 1].p2 === 3) {
        props.updateSetWinner({ set: props.currentSet, winner: "p2" });
        setSetWins({ ...setWins, p2: setWins.p2 + 1 });
        props.increaseSet();
      }
    }
  }, [props.scores]);

  // 어느 한쪽이 3세트를 먼저 승리하면 전체 게임 승리
  useEffect(() => {
    if (setWins.p1 === 3) {
      props.updateWinner("p1");
      alert("p1 최종 승리!");
    } else if (setWins.p2 === 3) {
      props.updateWinner("p2");
      alert("p2 최종 승리!");
    }
  }, [setWins]);

  const getRoundWinner = (p1Pick, p2Pick) => {
    if (p1Pick === p2Pick) {
      return "draw";
    } else {
      if (p1Pick === "scissors") {
        if (p2Pick === "rock") {
          return "p2";
        } else if (p2Pick === "paper") {
          return "p1";
        }
      } else if (p1Pick === "rock") {
        if (p2Pick === "scissors") {
          return "p1";
        } else if (p2Pick === "paper") {
          return "p2";
        }
      } else if (p1Pick === "paper") {
        if (p2Pick === "scissors") {
          return "p2";
        } else if (p2Pick === "rock") {
          return "p1";
        }
      }
    }
  };

  // const onTimeOut = () => {
  //   props.updateScore({ set: props.currentSet, player: "p2" });
  //   props.stopGame();
  // };

  return (
    <div>
      <Panel
        scores={props.scores}
        currentSet={props.currentSet}
        winner={props.winner}
      />
      <button onClick={props.runTimer}>시작</button>
      <button onClick={props.killTimer}>리셋</button>
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
          <button onClick={props.restartGame}>재시작</button>
          <button onClick={props.quitGame}>그만하기</button>
        </div>
        <Player
          player={"p1"}
          isRunning={props.isRunning}
          pick={props.p1Pick}
          pickCard={props.pickCard}
        />
        <Timer
          isTimerRunning={isTimerRunning}
          setIsTimerRunning={setIsTimerRunning}
          p1Pick={props.p1Pick}
          p2Pick={props.p2Pick}
          onTimeout={props.onTimeout}
          killTimer={props.killTimer}
          remainingTime={props.timer.remainingTime}
        />
        <Player
          player={"p2"}
          isRunning={props.isRunning}
          pick={props.p2Pick}
          pickCard={props.pickCard}
        />
      </StyledGameArea>
    </div>
  );
};

export default Game;
