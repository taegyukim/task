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
        )
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
