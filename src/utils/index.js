export const P1 = "p1";
export const P2 = "p2";
export const DRAW = "draw";
export const SCISSORS = "scissors";
export const ROCK = "rock";
export const PAPER = "paper";
export const EMPTY = "";

export const pickRandom = () => {
  const randomNumber = Math.floor(Math.random() * 1000) % 3;
  if (randomNumber === 0) {
    return SCISSORS;
  } else if (randomNumber === 1) {
    return ROCK;
  } else if (randomNumber === 2) {
    return PAPER;
  }
};

export const getRoundWinner = (p1Pick, p2Pick) => {
  if (p1Pick === p2Pick) {
    return DRAW;
  } else {
    if (p1Pick === SCISSORS) {
      if (p2Pick === ROCK) {
        return P2;
      } else if (p2Pick === PAPER) {
        return P1;
      }
    } else if (p1Pick === ROCK) {
      if (p2Pick === SCISSORS) {
        return P1;
      } else if (p2Pick === PAPER) {
        return P2;
      }
    } else if (p1Pick === PAPER) {
      if (p2Pick === SCISSORS) {
        return P2;
      } else if (p2Pick === ROCK) {
        return P1;
      }
    }
  }
};

export const pickFormatter = pick => {
  switch (pick) {
    case SCISSORS: {
      return "가위";
    }
    case ROCK: {
      return "바위";
    }
    case PAPER: {
      return "보";
    }
    default: {
      return "";
    }
  }
};
