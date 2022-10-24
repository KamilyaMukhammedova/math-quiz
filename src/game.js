import './index.scss';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {snackbar} from "./snackbar";

const userName = document.getElementById('user-name');
const number1 = document.getElementById('number-1');
const number2 = document.getElementById('number-2');
const sign = document.getElementById('sign');
const userResult = document.getElementById('user-result');
const userScore = document.getElementById('user-score');
const mathExampleDiv = document.getElementById('math-example');
const stopGameBtn = document.getElementById('stop-game-btn');

const userNameLocalStorage = JSON.parse(localStorage.getItem('currentUserName'));
const gameModeLocalStorage = JSON.parse(localStorage.getItem('currentGameMode'));

let userScoreCounter = 0;
let correctResult = 0;

const signsArray = ['+', '-', '/', '*'];
const minNumber = 1;
const maxNumber = 20;

const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

const getRandomNumberFromMinToMax = (max, min) => {
  return parseInt(Math.random() * (max - min) + min);
};

const getRandomMathSign = () => {
  return signsArray[getRandomNumber(signsArray.length)];
};

const mathExampleAnimation = (element, direction) => {
  const animationHandler = () => {
    element.classList.remove(`${direction}-slide`);
    element.removeEventListener('animationend', animationHandler);
  };

  element.classList.add(`${direction}-slide`);
  element.addEventListener('animationend', animationHandler);
};


const getMathExample = () => {
  const randomSign = getRandomMathSign();
  let randomNumber1 = 0;
  let randomNumber2 = 0;

  randomNumber1 = getRandomNumberFromMinToMax(minNumber, maxNumber);
  randomNumber2 = getRandomNumberFromMinToMax(minNumber, maxNumber);

  number1.innerText = randomNumber1.toString();
  number2.innerText = randomNumber2.toString();
  userScore.innerText = userScoreCounter.toString();
  sign.innerText = randomSign;

  if (randomSign === '+') {
    correctResult = randomNumber1 + randomNumber2;
  } else if (randomSign === '*') {
    correctResult = randomNumber1 * randomNumber2;
  } else if (randomSign === '-') {
    if (randomNumber1 > randomNumber2) {
      correctResult = randomNumber1 - randomNumber2;
    } else {
      number1.innerText = randomNumber2.toString();
      number2.innerText = randomNumber1.toString();
      correctResult = randomNumber2 - randomNumber1;
    }
  } else if (randomSign === '/') {
    const divisorsArray = [];

    for (let i = 1; i < randomNumber1 + 1; i++) {
      if(randomNumber1 % i === 0) {
        divisorsArray.push(i);
      }
    }

    randomNumber2 = divisorsArray[getRandomNumber(divisorsArray.length)];
    number2.innerText = randomNumber2.toString();
    correctResult = randomNumber1 / randomNumber2;
  }
};

window.addEventListener('DOMContentLoaded', () => {
  userName.innerText = userNameLocalStorage;
  userResult.focus();
  mathExampleAnimation(mathExampleDiv, 'right');
  getMathExample();

  userResult.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      if (correctResult === parseInt(e.target.value)) {
        userScoreCounter++;
        snackbar('blue', true);

        userResult.value = '';
      } else {
        if (userScoreCounter !== 0) userScoreCounter--;
        snackbar('red', false);

        userResult.value = '';
      }

      mathExampleAnimation(mathExampleDiv, 'left');
      getMathExample();
    }
  });

});

stopGameBtn.addEventListener('click', () => {
  let lsLeaderBord = [];

  if(gameModeLocalStorage === 'practice') {
    if (JSON.parse(localStorage.getItem('leaderBoardPractice'))) {
      lsLeaderBord = JSON.parse(localStorage.getItem('leaderBoardPractice'));
    }

    if (!(lsLeaderBord.find(user => user.userName === userNameLocalStorage))) {
      lsLeaderBord.push({userName: userNameLocalStorage, score: userScoreCounter});
    } else {
      lsLeaderBord = lsLeaderBord.map(user => {
        if ((user.userName === userNameLocalStorage) && (user.score < userScoreCounter)) {
          user.score = userScoreCounter;
        }
        return user;
      });


    }

    localStorage.setItem('leaderBoardPractice', JSON.stringify(lsLeaderBord));
  }

  window.location.assign('http://localhost:3000/index.html');
});




