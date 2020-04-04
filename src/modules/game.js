import { getRoundWinner } from "../utils";

const P1 = "p1";
const P2 = "p2";
const DRAW = "draw";
const SCISSORS = "scissors";
const ROCK = "rock";
const PAPER = "paper";
const EMPTY = "";

// action type
const GAME_START = "GAME_START";
const GAME_STOP = "GAME_STOP";
const GAME_RESTART = "GAME_RESTART";
const GAME_QUIT = "GAME_QUIT";

const INCREASE_SET = "INCREASE_SET";

const PICK_CARD = "PICK_CARD";
const RESET_PICK = "RESET_PICK";

const UPDATE_SCORE = "UPDATE_SCORE";
const UPDATE_SET_WINNER = "UPDATE_SET_WINNER";

const UPDATE_WINNER = "UPDATE_WINNER";

const START_TIMER = "START_TIMER";
const STOP_TIMER = "STOP_TIMER";
const RESET_TIMER = "RESET_TIMER";
const REDUCE_TIME = "REDUCE_TIME";
const SET_INTERVAL_ID = "SET_INTERVAL_ID";

// action creator
export const startGame = () => ({ type: GAME_START });

export const stopGame = () => ({ type: GAME_STOP });

export const restartGame = () => ({ type: GAME_RESTART });

export const quitGame = () => ({ type: GAME_QUIT });

export const increaseSet = () => ({ type: INCREASE_SET });

export const pickCard = input => ({ type: PICK_CARD, input });

export const resetPick = () => ({ type: RESET_PICK });

export const updateScore = input => ({ type: UPDATE_SCORE, input });

export const updateSetWinner = input => ({ type: UPDATE_SET_WINNER, input });

export const updateWinner = winner => ({ type: UPDATE_WINNER, winner });

export const startTimer = () => ({ type: START_TIMER });

export const stopTimer = () => ({ type: STOP_TIMER });

export const resetTimer = () => ({ type: RESET_TIMER });

export const reduceTime = () => ({ type: REDUCE_TIME });

export const setIntervalID = input => ({ type: SET_INTERVAL_ID, input });

// initial state
const initialState = {
  isRunning: false,
  currentSet: 0,
  scores: [{ set: 1, p1: 0, p2: 0, winner: "" }],
  setScores: { p1: 0, p2: 0 },
  p1Pick: "",
  p2Pick: "",
  winner: "",
  timer: {
    isRunning: false,
    remainingTime: 15,
    intervalID: ""
  }
};

// business logics
export const runTimer = () => dispatch => {
  dispatch(startTimer());
  const intervalID = setInterval(() => {
    dispatch(reduceTime());
  }, 1000);
  dispatch(setIntervalID({ intervalID }));
};

export const killTimer = () => (dispatch, getState) => {
  clearInterval(getState().gameReducer.timer.intervalID);
  dispatch(stopTimer());
  dispatch(resetTimer());
};

export const startRound = () => (dispatch, getState) => {
  if (getState().gameReducer.isRunning) {
    alert("이미 게임이 진행중입니다!");
  } else {
    // 패 초기화, 게임 시작
    dispatch(resetPick());
    dispatch(startGame());

    // 타이머 시작
    dispatch(startTimer());
    const intervalID = setInterval(() => {
      dispatch(reduceTime());
    }, 1000);
    dispatch(setIntervalID({ intervalID }));
  }
};

export const endRound = () => (dispatch, getState) => {
  dispatch(stopGame());
  clearInterval(getState().gameReducer.timer.intervalID);
  dispatch(stopTimer());
  dispatch(resetTimer());
};

export const setRoundWinner = () => (dispatch, getState) => {
  const state = getState().gameReducer;
  const result = getRoundWinner(state.p1Pick, state.p2Pick);
  if (result === DRAW) {
    dispatch(endRound());
    alert("무승부!");
  } else {
    dispatch(endRound());
    dispatch(updateScore({ set: state.currentSet, winner: result }));
  }
};

export const setSetWinner = () => (dispatch, getState) => {
  const state = getState().gameReducer;
  if (state.currentSet >= 1) {
    if (state.scores[state.currentSet - 1].p1 === 3) {
      dispatch(updateSetWinner({ set: state.currentSet, winner: "p1" }));
      dispatch(increaseSet());
    } else if (state.scores[state.currentSet - 1].p2 === 3) {
      dispatch(updateSetWinner({ set: state.currentSet, winner: "p2" }));
      dispatch(increaseSet());
    }
  }
};

export const onTimeout = () => (dispatch, getState) => {
  console.log("123");
  const state = getState().gameReducer;
  // 타이머 중지, 리셋
  clearInterval(state.timer.intervalID);
  dispatch(stopTimer());
  dispatch(resetTimer());

  // p2 의 승리
  dispatch(updateScore({ set: state.currentSet, winner: P2 }));

  // 게임 상태 중단으로 변경
  dispatch(stopGame());
};

// reducer
const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GAME_START: {
      return {
        ...state,
        currentSet:
          state.currentSet === 0 ? state.currentSet + 1 : state.currentSet,
        isRunning: true
      };
    }
    case GAME_STOP: {
      return {
        ...state,
        isRunning: false
      };
    }
    case GAME_RESTART: {
      return {
        isRunning: true,
        currentSet: 1,
        scores: [{ set: 1, p1: 0, p2: 0, winner: "" }],
        p1Pick: "",
        p2Pick: "",
        winner: ""
      };
    }
    case GAME_QUIT: {
      return {
        isRunning: false,
        currentSet: 0,
        scores: [{ set: 1, p1: 0, p2: 0, winner: "" }],
        p1Pick: "",
        p2Pick: "",
        winner: ""
      };
    }
    case INCREASE_SET: {
      return {
        ...state,
        currentSet: state.currentSet + 1,
        scores: state.scores.concat({ set: state.currentSet + 1, p1: 0, p2: 0 })
      };
    }
    case PICK_CARD: {
      if (action.input.player === "p1") {
        return {
          ...state,
          p1Pick: action.input.pick
        };
      } else if (action.input.player === "p2") {
        return {
          ...state,
          p2Pick: action.input.pick
        };
      }
      break;
    }
    case RESET_PICK: {
      return {
        ...state,
        p1Pick: "",
        p2Pick: ""
      };
    }
    case UPDATE_SCORE: {
      return {
        ...state,
        scores: state.scores.map(score => {
          if (score.set === action.input.set) {
            if (action.input.winner === "p1") {
              return {
                ...score,
                p1: score.p1 + 1
              };
            } else if (action.input.winner === "p2") {
              return {
                ...score,
                p2: score.p2 + 1
              };
            }
          } else {
            return score;
          }
        })
      };
    }
    case UPDATE_SET_WINNER: {
      return {
        ...state,
        scores: state.scores.map(score =>
          score.set === action.input.set
            ? { ...score, winner: action.input.winner }
            : score
        ),
        setScores:
          action.input.winner === P1
            ? { ...state.setScores, p1: state.setScores.p1 + 1 }
            : { ...state.setScores, p2: state.setScores.p2 + 1 }
      };
    }
    case UPDATE_WINNER: {
      return {
        ...state,
        winner: action.winner
      };
    }
    case START_TIMER: {
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: true
        }
      };
    }
    case STOP_TIMER: {
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: false,
          intervalID: ""
        }
      };
    }
    case RESET_TIMER: {
      return {
        ...state,
        timer: {
          ...state.timer,
          remainingTime: 15
        }
      };
    }
    case REDUCE_TIME: {
      return {
        ...state,
        timer: {
          ...state.timer,
          remainingTime: state.timer.remainingTime - 1
        }
      };
    }
    case SET_INTERVAL_ID: {
      return {
        ...state,
        timer: {
          ...state.timer,
          intervalID: action.input.intervalID
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default gameReducer;
