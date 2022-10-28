import './index.scss';
import 'bootstrap';
import {onFieldValidator, checkGameModeBtns, setToLocalStorage, redirectToPage} from "./js-ui/main";

const form = document.getElementById('user-form');
const userName = document.getElementById('user-name');
const practiceMode = document.getElementById('practice-mode');
const timeAttackMode = document.getElementById('time-attack-mode');
const practiceModeBtn = document.getElementById('practice-mode-btn');
const timeAttackModeBtn = document.getElementById('time-attack-mode-btn');
const submitBtn = document.getElementById('user-form-submit');
const userNameLocalStorage = JSON.parse(localStorage.getItem('currentUserName'));
const gameModeLocalStorage = JSON.parse(localStorage.getItem('currentGameMode'));

practiceMode.addEventListener('click', () => {
  checkGameModeBtns(practiceMode, practiceModeBtn, timeAttackModeBtn);
});

timeAttackMode.addEventListener('click', () => {
  checkGameModeBtns(timeAttackMode, timeAttackModeBtn, practiceModeBtn);
});


form.addEventListener('submit', event => {
  event.preventDefault();

  setToLocalStorage('currentUserName', userName.value);
  setToLocalStorage('correctAnswers', 0);
  setToLocalStorage('incorrectAnswers', 0);
  setToLocalStorage('currentScore', 0);

  practiceMode.checked ?
    setToLocalStorage('currentGameMode', 'practice') : setToLocalStorage('currentGameMode', 'time-attack')
  ;

  redirectToPage('game');
});

window.addEventListener('DOMContentLoaded', () => {
  if (userNameLocalStorage) {
    userName.value = userNameLocalStorage;
    submitBtn.disabled = false;
  } else {
    userName.value = '';
    submitBtn.disabled = true;
  }
  if (gameModeLocalStorage === 'practice') {
    practiceMode.checked = true;
    timeAttackMode.checked = false;
  } else {
    practiceMode.checked = false;
    timeAttackMode.checked = true;
  }

  checkGameModeBtns(practiceMode, practiceModeBtn, timeAttackModeBtn);
  onFieldValidator('blur', userName, submitBtn);
  onFieldValidator('input', userName, submitBtn);
});




