import '../index.scss';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {snackbar} from "../js-ui/snackbar";
import {getFromLocalStorage, redirectToPage, setToLocalStorage} from "../js-ui/main";
import {getShakeAnimation, mathExampleAnimation} from "../js-ui/animations";
import {
  getRandomMathSign,
  getRandomNumber,
  getRandomNumberForDivision,
  getRandomNumberFromMinToMax
} from "../js-ui/math-functions";
import {startTimer} from "../js-ui/timer";

const userName = document.getElementById('user-name');
const number1 = document.getElementById('number-1');
const number2 = document.getElementById('number-2');
const sign = document.getElementById('sign');
const userResult = document.getElementById('user-result');
const userScore = document.getElementById('user-score');
const mathExampleDiv = document.getElementById('math-example');
const stopGameBtn = document.getElementById('stop-game-btn');
const timerContainer = document.getElementById('timer-container');
const timer = document.getElementById('timer');
const userScoreContainer = document.getElementById('user-score-container');

const userNameLocalStorage = getFromLocalStorage('currentUserName');
const gameModeLocalStorage = getFromLocalStorage('currentGameMode');

const signsArray = ['+', '-', '/', '*'];
const minNumber = 2;
const maxNumber = 100;
const TIME_LIMIT = 90;

let userScoreCounter = 0;
let correctMathExampleResult = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;


const getMathExample = () => {
  const randomSign = getRandomMathSign(signsArray);
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
    randomNumber1 = getRandomNumberFromMinToMax(21, minNumber);
    randomNumber2 = getRandomNumberFromMinToMax(11, minNumber);
    number1.innerText = randomNumber1.toString();
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
    randomNumber1 = getRandomNumberForDivision(100, minNumber);
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

export const finishGame = (leaderBoardName) => {
  let lsLeaderBord = [];

  if (getFromLocalStorage(leaderBoardName)) {
    lsLeaderBord.push(getFromLocalStorage(leaderBoardName));

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

    setToLocalStorage(leaderBoardName, [...lsLeaderBord]);
  } else {
    setToLocalStorage(leaderBoardName, {userName: userNameLocalStorage, score: userScoreCounter});
  }
  setToLocalStorage('correctAnswers', correctAnswers);
  setToLocalStorage('incorrectAnswers', incorrectAnswers);
  setToLocalStorage('currentScore', userScoreCounter);
};

stopGameBtn.addEventListener('click', () => {
  gameModeLocalStorage === 'practice' ?
    finishGame('leaderBoardPractice') :
    finishGame('leaderBoardTimeAttack')
  ;

  redirectToPage('results');
});

userResult.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    if (correctMathExampleResult === parseInt(e.target.value)) {
      userScoreCounter++;
      correctAnswers++;
      snackbar('white', true);
    } else {
      if (userScoreCounter !== 0) {
        userScoreCounter--;
        snackbar('red', false);
      } else {
        snackbar('red', false, true);
      }
      incorrectAnswers++;
      getShakeAnimation(userScoreContainer);
    }
    mathExampleAnimation(mathExampleDiv, 'left');
    getMathExample();
    userResult.value = '';
  }
});

window.addEventListener('DOMContentLoaded', () => {
  setToLocalStorage('correctAnswers', 0);
  setToLocalStorage('incorrectAnswers', 0);
  setToLocalStorage('currentScore', 0);

  userName.innerText = userNameLocalStorage;
  userResult.focus();

  mathExampleAnimation(mathExampleDiv, 'left');
  getMathExample();

  if (gameModeLocalStorage === 'practice') {
    timerContainer.style.display = 'none';
  } else {
    timerContainer.style.display = 'block';
    startTimer(TIME_LIMIT, timer);
  }
});
















