import './index.scss';
import 'bootstrap';

const gameResultScore = document.getElementById('result-score');
const gameMode = document.getElementById('current-mode-name');
const correctAnswers = document.getElementById('correct-answers');
const incorrectAnswers = document.getElementById('incorrect-answers');

window.addEventListener('DOMContentLoaded', () => {
  const userCurrentScoreLocalStorage = JSON.parse(localStorage.getItem('currentScore'));
  const userCurrentGameModeLocalStorage = JSON.parse(localStorage.getItem('currentGameMode'));
  const userCorrectAnswersLocalStorage = JSON.parse(localStorage.getItem('correctAnswers'));
  const userIncorrectAnswersLocalStorage = JSON.parse(localStorage.getItem('incorrectAnswers'));

  gameResultScore.innerText = userCurrentScoreLocalStorage;
  gameMode.innerText = userCurrentGameModeLocalStorage;
  correctAnswers.innerText = userCorrectAnswersLocalStorage;
  incorrectAnswers.innerText = userIncorrectAnswersLocalStorage;
});
