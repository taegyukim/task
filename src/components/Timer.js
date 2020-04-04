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
      setIntervalID(interval);
      if (props.isTimerRunning) {
        remainingTime--;
        setDisplayTime(remainingTime);
        if (remainingTime <= 0) {
          resetTimer(interval);
          alert("시간 초과. p2 승리!");
          props.onTimeOut();
        }
      }
    }, 1000);
  };

  // 타이머 정지 및 리셋 함수
  const resetTimer = interval => {
    props.setIsTimerRunning(false);
    clearInterval(interval);
    remainingTime = 15;
    setDisplayTime(remainingTime);
  };

  // 타이머 시작
  useEffect(() => {
    if (props.isTimerRunning) {
      timerFunc();
    }
  }, [props.isTimerRunning]);

  // 양쪽 다 패를 선택한 경우 타이머 정지 및 리셋
  useEffect(() => {
    if (props.p1Pick !== "" && props.p2Pick !== "") {
      props.setIsTimerRunning(false);
      resetTimer(intervalID);
    }
  }, [props.p1Pick, props.p2Pick, displayTime]);

  return (
    <StyledTimer>
      <h3>제한 시간</h3>
      <h2>{displayTime}</h2>
    </StyledTimer>
  );
};

export default Timer;
