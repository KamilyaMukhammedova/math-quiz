import './index.scss';
import 'bootstrap';

const form = document.getElementById('user-form');
const userName = document.getElementById('user-name');
const practiceMode = document.getElementById('practice-mode');
const timeAttackMode = document.getElementById('time-attack-mode');
const practiceModeBtn = document.getElementById('practice-mode-btn');
const timeAttackModeBtn = document.getElementById('time-attack-mode-btn');
const submitBtn = document.getElementById('user-form-submit');

const onFieldValidator = (eventName, field, btn) => {
  field.addEventListener(eventName, (event) => {
    if (event.target.value === '') {
      field.classList.add('is-invalid');
      btn.disabled = true;
    } else {
      field.classList.remove('is-invalid');
      btn.disabled = false;
    }
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();

  localStorage.setItem('userName', JSON.stringify(userName.value));

  window.location.assign('http://localhost:3000/game.html');
});


onFieldValidator('blur', userName, submitBtn);
onFieldValidator('input', userName, submitBtn);

