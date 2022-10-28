import './index.scss';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {getFromLocalStorage} from "./js-ui/main";
import {onConfettiFireworks, onConfettiSnow} from "./js-ui/confetti";

const gameResultScore = document.getElementById('result-score');
const gameMode = document.getElementById('current-mode-name');
const correctAnswers = document.getElementById('correct-answers');
const incorrectAnswers = document.getElementById('incorrect-answers');
const timeIsUp = document.getElementById('time-is-up');

window.addEventListener('DOMContentLoaded', () => {
  const userCurrentScoreLocalStorage = getFromLocalStorage('currentScore');
  const userCurrentGameModeLocalStorage = getFromLocalStorage('currentGameMode');
  const userCorrectAnswersLocalStorage = getFromLocalStorage('correctAnswers');
  const userIncorrectAnswersLocalStorage = getFromLocalStorage('incorrectAnswers');

  gameResultScore.innerText = userCurrentScoreLocalStorage;
  gameMode.innerText = userCurrentGameModeLocalStorage;
  correctAnswers.innerText = userCorrectAnswersLocalStorage;
  incorrectAnswers.innerText = userIncorrectAnswersLocalStorage;

  userCurrentGameModeLocalStorage === 'practice' ?
    timeIsUp.innerText = '' : timeIsUp.innerHTML = `<i class="bi bi-hourglass-bottom"></i>`
  ;

  if (parseInt(userCurrentScoreLocalStorage) === 0) {
    onConfettiSnow();
  } else {
    onConfettiFireworks();
  }
});
