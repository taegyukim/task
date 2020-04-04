import React from "react";
import styled from "styled-components";

import { P1, P2 } from "../utils";

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

const Panel = ({ scores, currentSet, winner }) => {
  return (
    <StyledPanel>
      <table>
        <thead>
          <tr id="sets">
            <td></td>
            {scores.map((score, index) => (
              <td
                key={`set ${index + 1}`}
                className={currentSet === score.set ? "running" : ""}
              >{`${index + 1} 세트`}</td>
            ))}
            <td>최종</td>
          </tr>
        </thead>
        <tbody>
          <tr id="result-p1">
            <td>플레이어 1</td>
            {scores.map((score, index) => (
              <td
                key={`p1 score ${index + 1}`}
                className={score.winner === "p1" ? "winner" : ""}
              >
                {score.p1}
              </td>
            ))}
            <td style={{ fontSize: "25px", fontWeight: "bold" }}>
              {winner === P1 ? "승" : ""}
            </td>
          </tr>
          <tr id="result-p2">
            <td>플레이어 2</td>
            {scores.map((score, index) => (
              <td
                key={`p2 score ${index + 1}`}
                className={score.winner === "p2" ? "winner" : ""}
              >
                {score.p2}
              </td>
            ))}
            <td style={{ fontSize: "25px", fontWeight: "bold" }}>
              {winner === P2 ? "승" : ""}
            </td>
          </tr>
        </tbody>
      </table>
    </StyledPanel>
  );
};

export default Panel;
