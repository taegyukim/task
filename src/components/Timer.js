import React, { useEffect } from "react";
import styled from "styled-components";

const StyledTimer = styled.div`
  width: 200px;
  height: 300px;
  text-align: center;
`;

const Timer = props => {
  useEffect(() => {
    if (props.remainingTime <= 0) {
      props.onTimeout();
      alert("시간 초과. p2 승리!");
    }
  }, [props.remainingTime]);

  return (
    <StyledTimer>
      <h3>제한 시간</h3>
      <h2>{props.remainingTime}</h2>
    </StyledTimer>
  );
};

export default Timer;
