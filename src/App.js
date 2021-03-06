import React from "react";
import GameContainer from "./containers/GameContainer";

function App() {
  return (
    <div>
      <h2>게임 설명</h2>
      <p>- 컴퓨터와 플레이하는 가위바위보 게임입니다.</p>
      <p>
        - 시작 버튼을 누르면 게임이 시작되며, 그만하기를 누르면 게임이 중단되고
        초기화됩니다.
      </p>
      <p>
        - 각 게임의 제한시간은 15초이며, 플레이어는 제한시간 내에 패를 골라야
        합니다.
      </p>
      <p>
        - 컴퓨터(p2)가 패를 골랐으나 유저(p1)는 아직 패를 고르지 않은 경우
        컴퓨터의 패는 ? 로 표시됩니다.
      </p>
      <p>
        - 각 세트는 한 플레이어가 3승을 먼저 달성할 시 해당 플레이어의 승리로
        처리됩니다.
      </p>
      <p>
        - 한 플레이어가 3세트를 먼저 승리할 시 해당 플레이어가 최종 승자가 되며
        게임이 종료됩니다.
      </p>
      <GameContainer />
    </div>
  );
}

export default App;
