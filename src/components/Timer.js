import React, { useEffect } from "react";
import styled from "styled-components";

const StyledTimer = styled.div`
  width: 200px;
  height: 300px;
  text-align: center;
`;

const Timer = props => {
  let remainingTime = props.timerState.remainingTime;
  let interval;
  const timerFunc = () => {
    interval = setInterval(function() {
      if (props.timerState.isRunning) {
        remainingTime--;
        props.setTimerState({
          ...props.timerState,
          remainingTime: remainingTime
        });
        if (remainingTime <= 0) {
          resetTimer();
          alert("시간 초과!");
        }
      }
    }, 1000);
  };
  const resetTimer = () => {
    clearInterval(interval);
    props.setTimerState({
      isRunning: false,
      remainingTime: 15
    });
  };

  useEffect(() => {
    timerFunc();
  }, [props.timerState.isRunning]);

  return (
    <StyledTimer>
      <h3>제한 시간</h3>
      <h2>{props.timerState.remainingTime}</h2>
    </StyledTimer>
  );
};

export default Timer;
