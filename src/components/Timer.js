import React from "react";
import styled from "styled-components";

const StyledTimer = styled.div`
  width: 200px;
  height: 300px;
  text-align: center;
`;

const Timer = () => {
  return (
    <StyledTimer>
      <h3>제한 시간</h3>
      <h2>15</h2>
    </StyledTimer>
  );
};

export default Timer;