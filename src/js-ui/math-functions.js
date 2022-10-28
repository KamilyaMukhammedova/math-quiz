export const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

export const getRandomNumberFromMinToMax = (max, min) => {
  return parseInt(Math.random() * (max - min) + min);
};

export const getRandomMathSign = (arrayName) => {
  return arrayName[getRandomNumber(arrayName.length)];
};

export const getRandomNumberForDivision = (max, min) => {
  let isMatchToDivision = true;
  let number = 0;

  while (isMatchToDivision) {
    number = getRandomNumberFromMinToMax(max, min);
    const divisorsArray = [];

    for (let i = 2; i < number; i++) {
      if ((number % i) === 0 && (i !== number)) {
        divisorsArray.push(i);
      }
    }

    if (divisorsArray.length > 0) {
      isMatchToDivision = false;
      break;
    }
  }

  return number;
};

