// action type
const GAME_START = "GAME_START";
const GAME_STOP = "GAME_STOP";
const GAME_RESTART = "GAME_RESTART";
const GAME_QUIT = "GAME_QUIT";

const INCREASE_SET = "INCREASE_SET";

const PICK_CARD = "PICK_CARD";

const UPDATE_SCORE = "UPDATE_SCORE";
const UPDATE_SET_WINNER = "UPDATE_SET_WINNER";

const UPDATE_WINNER = "UPDATE_WINNER";

// action creator
export const startGame = () => ({ type: GAME_START });

export const stopGame = () => ({ type: GAME_STOP });

export const restartGame = () => ({ type: GAME_RESTART });

export const quitGame = () => ({ type: GAME_QUIT });

export const increaseSet = () => ({ type: INCREASE_SET });

export const pickCard = input => ({ type: PICK_CARD, input });

export const updateScore = input => ({ type: UPDATE_SCORE, input });

export const updateSetWinner = input => ({ type: UPDATE_SET_WINNER, input });

export const updateWinner = winner => ({ type: UPDATE_WINNER, winner });

// initial state
const initialState = {
  isRunning: false,
  currentSet: 0,
  scores: [{ set: 1, p1: 0, p2: 0, winner: "" }],
  pick_p1: "",
  pick_p2: "",
  winner: ""
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
        pick_p1: "",
        pick_p2: "",
        winner: ""
      };
    }
    case GAME_QUIT: {
      return {
        isRunning: false,
        currentSet: 0,
        scores: [{ set: 1, p1: 0, p2: 0, winner: "" }],
        pick_p1: "",
        pick_p2: "",
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
          pick_p1: action.input.pick
        };
      } else if (action.input.player === "p2") {
        return {
          ...state,
          pick_p2: action.input.pick
        };
      }
      break;
    }
    case UPDATE_SCORE: {
      return {
        ...state,
        scores: state.scores.map(score => {
          if (score.set === action.input.set) {
            if (action.input.player === "p1") {
              return {
                ...score,
                p1: score.p1 + 1
              };
            } else if (action.input.player === "p2") {
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
    default: {
      return state;
    }
  }
};

export default gameReducer;
