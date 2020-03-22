// action type
const GAME_START = "GAME_START";
const GAME_STOP = "GAME_STOP";
const GAME_RESTART = "GAME_RESTART";
const GAME_QUIT = "GAME_QUIT";

const INCREASE_SET = "INCREASE_SET";

const PICK_CARD = "PICK_CARD";

const UPDATE_SCORE = "UPDATE_SCORE";

// action creator
export const startGame = () => ({ type: GAME_START });

export const stopGame = () => ({ type: GAME_STOP });

export const restartGame = () => ({ type: GAME_RESTART });

export const quitGame = () => ({ type: GAME_QUIT });

export const increaseSet = () => ({ type: INCREASE_SET });

export const pickCard = input => ({ type: PICK_CARD, input });

export const updateScore = input => ({ type: UPDATE_SCORE, input });

// initial state
const initialState = {
  isRunning: false,
  currentSet: 0,
  score: [
    { set: 1, p1: 0, p2: 0 },
    { set: 2, p1: 0, p2: 0 },
    { set: 3, p1: 0, p2: 0 }
  ],
  pick_p1: "",
  pick_p2: ""
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
        score: [
          { set: 1, p1: 0, p2: 0 },
          { set: 2, p1: 0, p2: 0 },
          { set: 3, p1: 0, p2: 0 }
        ]
      };
    }
    case GAME_QUIT: {
      return {
        isRunning: false,
        currentSet: 0,
        score: [
          { set: 1, p1: 0, p2: 0 },
          { set: 2, p1: 0, p2: 0 },
          { set: 3, p1: 0, p2: 0 }
        ]
      };
    }
    case INCREASE_SET: {
      return {
        ...state,
        currentSet: state.currentSet + 1
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
        score: state.score.map(setScore =>
          setScore.set === action.input.set
            ? setScore[action.input.player]++
            : setScore
        )
      };
    }
    default: {
      return state;
    }
  }
};

export default gameReducer;
