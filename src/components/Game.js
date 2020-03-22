import React from "react";
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
    console.log(Math.floor(Math.random() * 1000) % 3);
  };
  return (
    <div>
      <Panel scores={props.scores} currentSet={props.currentSet} />
      <button onClick={handleDebug}>디버그</button>
      <StyledGameArea>
        <div className={"game-buttons"}>
          <button onClick={props.startGame}>게임 시작</button>
          <button onClick={props.restartGame}>재시작</button>
          <button onClick={props.quitGame}>그만하기</button>
        </div>
        <Player player={"p1"} isRunning={props.isRunning} pickCard={props.pickCard} />
        <Timer />
        <Player player={"p2"} isRunning={props.isRunning} pickCard={props.pickCard} />
      </StyledGameArea>
    </div>
  );
};

export default Game;
