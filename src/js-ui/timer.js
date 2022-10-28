import {finishGame} from "../js/game";
import {redirectToPage} from "./main";

export const formatTimeLeft = (time) => {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

export const startTimer = (timeLimit, timerDiv) => {
  let timePassed = 0;
  let timeLeft = timeLimit;
  let timerInterval = null;

  timerInterval = setInterval(() => {

    timePassed = timePassed += 1;
    timeLeft = timeLimit - timePassed;
    timerDiv.textContent = formatTimeLeft(timeLeft);

    if (timeLeft === 10) {
      timerDiv.classList.remove('text-bg-secondary');
      timerDiv.classList.add('text-bg-danger');
    }

    if (timeLeft === 0) {
      finishGame('leaderBoardTimeAttack');
      clearInterval(timerInterval);
      redirectToPage('results');
    }
  }, 1000);
};