import React, { useEffect } from "react";
import styled from "styled-components";

import {
  P1,
  P2,
  SCISSORS,
  ROCK,
  PAPER,
  pickRandom,
  pickFormatter
} from "../utils";

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

const Player = ({ player, isRunning, pick, pickCard }) => {
  useEffect(() => {
    const timeToWait = Math.floor(Math.random() * 1000) % 2;
    if (isRunning && player === P2) {
      setTimeout(() => {
        const card = pickRandom();
        pickCard({ player: P2, pick: card });
      }, timeToWait * 1000);
    }
  }, [isRunning]);

  const handleP1Pick = pick => {
    if (isRunning === false) {
      alert("게임 중이 아닙니다!");
    } else {
      pickCard({ player: P1, pick: pick });
    }
  };

  return (
    <StyledPlayer>
      <h2>{player}</h2>
      <div className={`choice + ${player}`}>
        <span>
          {player === P2
            ? isRunning && pick
              ? "?"
              : pickFormatter(pick)
            : pickFormatter(pick)}
        </span>
      </div>
      {player === P1 ? (
        <div className="player-buttons">
          <button
            disabled={!isRunning}
            value={SCISSORS}
            onClick={e => handleP1Pick(e.target.value)}
          >
            가위
          </button>
          <button
            disabled={!isRunning}
            value={ROCK}
            onClick={e => handleP1Pick(e.target.value)}
          >
            바위
          </button>
          <button
            disabled={!isRunning}
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
