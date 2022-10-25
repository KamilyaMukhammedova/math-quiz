import './index.scss';
import 'bootstrap';

const gameResultScore = document.getElementById('result-score');
const correctAnswers = document.getElementById('correct-answers');
const incorrectAnswers = document.getElementById('incorrect-answers');

window.addEventListener('DOMContentLoaded', () => {
  const userCurrentScoreLocalStorage = JSON.parse(localStorage.getItem('currentScore'));
  const userCorrectAnswersLocalStorage = JSON.parse(localStorage.getItem('correctAnswers'));
  const userIncorrectAnswersLocalStorage = JSON.parse(localStorage.getItem('incorrectAnswers'));

  gameResultScore.innerText = userCurrentScoreLocalStorage;
  correctAnswers.innerText = userCorrectAnswersLocalStorage;
  incorrectAnswers.innerText = userIncorrectAnswersLocalStorage;
});
