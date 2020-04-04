import React, { useEffect } from "react";
import styled from "styled-components";

import { P1, P2, SCISSORS, ROCK, PAPER, pickRandom } from "../utils";

const StyledPlayer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    text-transform: uppercase;
  }

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

const pickFormatter = pick => {
  switch (pick) {
    case SCISSORS: {
      return "가위";
    }
    case ROCK: {
      return "바위";
    }
    case PAPER: {
      return "보";
    }
    default: {
      return "";
    }
  }
};

const Player = props => {
  useEffect(() => {
    const timeToWait = Math.floor(Math.random() * 1000) % 2;
    if (props.isRunning && props.player === P2) {
      setTimeout(() => {
        const card = pickRandom();
        props.pickCard({ player: P2, pick: card });
      }, timeToWait * 1000);
    }
  }, [props.isRunning]);

  const handleP1Pick = pick => {
    if (props.isRunning === false) {
      alert("게임 중이 아닙니다!");
    } else {
      props.pickCard({ player: P1, pick: pick });
    }
  };

  return (
    <StyledPlayer>
      <h2>{props.player}</h2>
      <div className={`choice + ${props.player}`}>
        <span>
          {props.player === P2
            ? props.isRunning && props.pick
              ? "?"
              : pickFormatter(props.pick)
            : pickFormatter(props.pick)}
        </span>
      </div>
      {props.player === P1 ? (
        <div className="player-buttons">
          <button
            disabled={!props.isRunning}
            value={SCISSORS}
            onClick={e => handleP1Pick(e.target.value)}
          >
            가위
          </button>
          <button
            disabled={!props.isRunning}
            value={ROCK}
            onClick={e => handleP1Pick(e.target.value)}
          >
            바위
          </button>
          <button
            disabled={!props.isRunning}
            value={PAPER}
            onClick={e => handleP1Pick(e.target.value)}
          >
            보
          </button>
        </div>
      ) : (
        <></>
      )}
    </StyledPlayer>
  );
};

export default Player;
