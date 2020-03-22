import React from "react";
import styled from "styled-components";
import Player from "./Player";
import Timer from "./Timer";

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

const Game = () => {
  return (
    <div>
      <StyledGameArea>
        <div className={"game-buttons"}>
          <button>게임 시작</button>
          <button>재시작</button>
          <button>그만하기</button>
        </div>
        <Player player={"P1"} />
        <Timer />
        <Player player={"P2"} />
      </StyledGameArea>
    </div>
  );
};

export default Game;
