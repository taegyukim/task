import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledTimer = styled.div`
  width: 200px;
  height: 300px;
  text-align: center;
`;

const Timer = props => {
  let remainingTime = 15;
  const [displayTime, setDisplayTime] = useState(remainingTime);
  const [intervalID, setIntervalID] = useState();
  let interval;
  const timerFunc = () => {
    interval = setInterval(function() {
      setIntervalID(interval)
      if (props.isTimerRunning) {
        remainingTime--;
        setDisplayTime(remainingTime);
        if (remainingTime <= 0) {
          resetTimer(interval)
          alert("시간 초과!");
        }
      }
    }, 1000);
  };
  const resetTimer = (interval) => {
    props.setIsTimerRunning(false);
    clearInterval(interval);
    remainingTime = 15;
    setDisplayTime(remainingTime);
  };

  useEffect(() => {
    if (props.isTimerRunning) {
      timerFunc();
    }
  }, [props.isTimerRunning]);

  useEffect(() => {
    resetTimer(intervalID);
    props.setIsTimerRunning(false);
  }, [props.pick_p1]);

  return (
    <StyledTimer>
      <h3>제한 시간</h3>
      <h2>{displayTime}</h2>
    </StyledTimer>
  );
};

export default Timer;
