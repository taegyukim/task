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

      &.running {
        color: blue;
      }
    }
  }
`;

const Panel = props => {
  return (
    <StyledPanel>
      <table>
        <thead>
          <tr id="sets">
            <td></td>
            <td className={props.currentSet === 1 ? "running" : ""}>1 세트</td>
            <td className={props.currentSet === 2 ? "running" : ""}>2 세트</td>
            <td className={props.currentSet === 3 ? "running" : ""}>3 세트</td>
            <td>최종</td>
          </tr>
        </thead>
        <tbody>
          <tr id="result-p1">
            <td>플레이어 1</td>
            <td>{props.score[0].p1}</td>
            <td>{props.score[1].p1}</td>
            <td>{props.score[2].p1}</td>
            <td></td>
          </tr>
          <tr id="result-p2">
            <td>플레이어 2</td>
            <td>{props.score[0].p2}</td>
            <td>{props.score[1].p2}</td>
            <td>{props.score[2].p2}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </StyledPanel>
  );
};

export default Panel;
