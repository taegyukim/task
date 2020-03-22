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
  const handleDebug = () => {
    setIsTimerRunning(true);
  };

  const handleDebug2 = () => {
    setIsTimerRunning(false);
  };

  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [setWins, setSetWins] = useState({ p1: 0, p2: 0 });

  useEffect(() => {
    if (
      props.isRunning === true &&
      props.pick_p1 !== "" &&
      props.pick_p2 !== ""
    ) {
      const result = getRoundWinner(props.pick_p1, props.pick_p2);
      if (result === "draw") {
        alert("무승부입니다!");
        props.stopGame();
      } else {
        alert(`${result} 승리!`);
        props.updateScore({ set: props.currentSet, player: result });
        props.stopGame();
      }
    }
  }, [props.pick_p1, props.pick_p2]);

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
      props.updateWinner({ winner: "p1" });
      alert("p1 최종 승리!");
    } else if (setWins.p2 === 3) {
      props.updateWinner({ winner: "p2" });
      alert("p2 최종 승리!");
    }
  }, [setWins]);

  const getRoundWinner = (pick_p1, pick_p2) => {
    if (pick_p1 === pick_p2) {
      return "draw";
    } else {
      if (pick_p1 === "scissors") {
        if (pick_p2 === "rock") {
          return "p2";
        } else if (pick_p2 === "paper") {
          return "p1";
        }
      } else if (pick_p1 === "rock") {
        if (pick_p2 === "scissors") {
          return "p1";
        } else if (pick_p2 === "paper") {
          return "p2";
        }
      } else if (pick_p1 === "paper") {
        if (pick_p2 === "scissors") {
          return "p2";
        } else if (pick_p2 === "rock") {
          return "p1";
        }
      }
    }
  };

  const onTimeOut = () =>
    props.updateScore({ set: props.currentSet, player: "p2" });

  const resetPicks = () => {
    props.pickCard({ player: "p1", pick: "" });
    props.pickCard({ player: "p2", pick: "" });
  };

  const onGameStart = () => {
    if (props.isRunning) {
      alert("이미 게임이 진행중입니다!");
    } else {
      resetPicks();
      props.startGame();
      setIsTimerRunning(true);
    }
  };

  return (
    <div>
      <Panel scores={props.scores} currentSet={props.currentSet} />
      <button onClick={handleDebug}>디버그</button>
      <button onClick={handleDebug2}>디버그2</button>
      <h2>{props.isRunning ? "게임 진행 중" : "게임 중단"}</h2>
      <StyledGameArea>
        <div className={"game-buttons"}>
          <button
            disabled={props.scores.winner}
            style={{ opacity: props.scores.winner ? 0.3 : 1 }}
            onClick={onGameStart}
          >
            게임 시작
          </button>
          <button onClick={props.restartGame}>재시작</button>
          <button onClick={props.quitGame}>그만하기</button>
        </div>
        <Player
          player={"p1"}
          isRunning={props.isRunning}
          pick={props.pick_p1}
          pickCard={props.pickCard}
        />
        <Timer
          isTimerRunning={isTimerRunning}
          setIsTimerRunning={setIsTimerRunning}
          pick_p1={props.pick_p1}
          onTimeOut={onTimeOut}
        />
        <Player
          player={"p2"}
          isRunning={props.isRunning}
          pick={props.pick_p2}
          pickCard={props.pickCard}
        />
      </StyledGameArea>
    </div>
  );
};

export default Game;
