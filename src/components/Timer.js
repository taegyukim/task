import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTimer = styled.div`
  width: 200px;
  height: 300px;
  text-align: center;
`;

const Timer = ({ onTimeout, remainingTime }) => {
  useEffect(() => {
    if (remainingTime <= 0) {
      onTimeout();
      alert("시간 초과. p2 승리!");
    }
  }, [remainingTime]);

  return (
    <StyledTimer>
      <h3>제한 시간</h3>
      <h2>{remainingTime}</h2>
    </StyledTimer>
  );
};

Timer.propTypes = {
  onTimeout: PropTypes.func,
  remainingTime: PropTypes.number
};

export default Timer;
