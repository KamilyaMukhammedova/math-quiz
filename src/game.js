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
const timer = document.getElementById('timer');

const userScoreContainer = document.getElementById('user-score-container');

const userNameLocalStorage = JSON.parse(localStorage.getItem('currentUserName'));
const gameModeLocalStorage = JSON.parse(localStorage.getItem('currentGameMode'));

let userScoreCounter = 0;
let correctMathExampleResult = 0;

let correctAnswers = 0;
let incorrectAnswers = 0;

// const signsArray = ['+', '-', '/', '*'];
const signsArray = ['*'];
const minNumber = 2;
const maxNumber = 100;

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

const getShakeAnimation = (element) => {
  element.classList.add('game__score-shake');
  setTimeout(() => {
    element.classList.remove('game__score-shake');
  }, 500);
};

const getRandomNumberForDivision = () => {
  let isMatchToDivision = true;
  let number = 0;

  while (isMatchToDivision) {
    number = getRandomNumberFromMinToMax(100, 3);
    const divisorsArray = [];

    for (let i = 2; i < number; i++) {
      if ((number % i) === 0 && (i !== number)) {
        divisorsArray.push(i);
      }
    }

    if(divisorsArray.length > 0) {
      isMatchToDivision = false;
       break;
    }
  }

  return number;
};

const getMathExample = () => {
  const randomSign = getRandomMathSign();
  let randomNumber1 = 0;
  let randomNumber2 = 0;

  randomNumber1 = getRandomNumberFromMinToMax(maxNumber, minNumber);
  randomNumber2 = getRandomNumberFromMinToMax(maxNumber, minNumber);

  number1.innerText = randomNumber1.toString();
  number2.innerText = randomNumber2.toString();
  userScore.innerText = userScoreCounter.toString();
  sign.innerText = randomSign;

  if (randomSign === '+') {
    correctMathExampleResult = randomNumber1 + randomNumber2;
  } else if (randomSign === '*') {
    randomNumber2 = getRandomNumberFromMinToMax(11, minNumber);
    number2.innerText = randomNumber2.toString();
    correctMathExampleResult = randomNumber1 * randomNumber2;
  } else if (randomSign === '-') {
    if (randomNumber1 > randomNumber2) {
      correctMathExampleResult = randomNumber1 - randomNumber2;
    } else {
      number1.innerText = randomNumber2.toString();
      number2.innerText = randomNumber1.toString();
      correctMathExampleResult = randomNumber2 - randomNumber1;
    }
  } else if (randomSign === '/') {
    randomNumber1 = getRandomNumberForDivision();
    randomNumber2 = 0;
    const divisorsArray = [];

      for (let i = 2; i < randomNumber1; i++) {
        if ((randomNumber1 % i) === 0 && (i !== randomNumber1)) {
          divisorsArray.push(i);
        }
      }

      randomNumber2 = divisorsArray[getRandomNumber(divisorsArray.length)];
      number1.innerText = randomNumber1.toString();
      number2.innerText = randomNumber2.toString();
      correctMathExampleResult = randomNumber1 / randomNumber2;
  }
};

window.addEventListener('DOMContentLoaded', () => {

  userName.innerText = userNameLocalStorage;
  userResult.focus();
  mathExampleAnimation(mathExampleDiv, 'right');
  getMathExample();

  userResult.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      if (correctMathExampleResult === parseInt(e.target.value)) {
        userScoreCounter++;
        correctAnswers++;
        snackbar('blue', true);

        userResult.value = '';
      } else {
        if (userScoreCounter !== 0) userScoreCounter--;
        incorrectAnswers++;
        getShakeAnimation(userScoreContainer);
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

  if (gameModeLocalStorage === 'practice') {
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

    localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
    localStorage.setItem('incorrectAnswers', JSON.stringify(incorrectAnswers));
    localStorage.setItem('currentScore', JSON.stringify(userScoreCounter));
    localStorage.setItem('leaderBoardPractice', JSON.stringify(lsLeaderBord));
  }

  window.location.assign('http://localhost:3000/results.html');
});







