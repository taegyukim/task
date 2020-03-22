import React, { useEffect } from "react";
import styled from "styled-components";

const StyledPlayer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .choice {
    width: 150px;
    height: 150px;
    border: 3px solid #000000;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      margin: auto;
      font-size: 30px;
      font-weight: bold;
    }
  }

  .player-buttons {
    margin-top: 20px;
    button {
      width: 80px;
      height: 40px;
      border: 2px solid #000000;
      border-radius: 4px;
      background-color: #ffffff;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }
    button:not(:last-child) {
      margin-right: 20px;
    }
  }
`;

const pickRandom = () => {
  const randomNumber = Math.floor(Math.random() * 1000) % 3;
  if (randomNumber === 0) {
    return "scissors";
  } else if (randomNumber === 1) {
    return "rock";
  } else if (randomNumber === 2) {
    return "paper";
  }
};

const Player = props => {
  useEffect(() => {
    if(props.isRunning && props.player === 'p2') {
      const card = pickRandom();
      props.pickCard({player: 'p2', pick: card})
    }
  }, [props.isRunning])
  
  return (
    <StyledPlayer>
      <h2>{props.player}</h2>
      <div className={`choice + ${props.player}`}>
        <span>가위</span>
      </div>
      {props.player === "P1" ? (
        <div className="player-buttons">
          <button>가위</button>
          <button>바위</button>
          <button>보</button>
        </div>
      ) : (
        <></>
      )}
    </StyledPlayer>
  );
};

export default Player;
