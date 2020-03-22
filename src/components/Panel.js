import React from "react";
import styled from "styled-components";

const StyledPanel = styled.div`
  table {
    border-collapse: collapse;
    text-align: center;

    td {
      width: 150px;
      height: 80px;
      border: 1px solid #000000;
    }
  }
`;

const Panel = () => {
  return (
    <StyledPanel>
      <table>
        <tr id="sets">
          <td></td>
          <td>1 세트</td>
          <td>2 세트</td>
          <td>3 세트</td>
          <td>최종</td>
        </tr>
        <tr id="result-p1">
          <td>플레이어 1</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr id="result-p2">
          <td>플레이어 2</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </StyledPanel>
  );
};

export default Panel;
