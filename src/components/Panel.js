import React from "react";
import styled from "styled-components";

const StyledPanel = styled.div`
  table {
    border-collapse: collapse;
    text-align: center;

    td {
      width: 120px;
      height: 80px;
      border: 1px solid #000000;

      &.running {
        color: blue;
      }

      &.winner {
        background-color: blue;
      }
      &.loser {
        background-color: grey;
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
            {props.scores.map((score, index) => (
              <td
                key={`set ${index + 1}`}
                className={props.currentSet === score.set ? "running" : ""}
              >{`${index + 1} 세트`}</td>
            ))}
            <td>최종</td>
          </tr>
        </thead>
        <tbody>
          <tr id="result-p1">
            <td>플레이어 1</td>
            {props.scores.map((score, index) => (
              <td
                key={`p1 score ${index + 1}`}
                className={score.winner === "p1" ? "winner" : ""}
              >
                {score.p1}
              </td>
            ))}
            <td></td>
          </tr>
          <tr id="result-p2">
            <td>플레이어 2</td>
            {props.scores.map((score, index) => (
              <td
                key={`p2 score ${index + 1}`}
                className={score.winner === "p2" ? "winner" : ""}
              >
                {score.p2}
              </td>
            ))}
            <td></td>
          </tr>
        </tbody>
      </table>
    </StyledPanel>
  );
};

export default Panel;
