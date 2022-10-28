export const mathExampleAnimation = (element, direction) => {
  const animationHandler = () => {
    element.classList.remove(`game__${direction}-slide`);
    element.removeEventListener('animationend', animationHandler);
  };

  element.classList.add(`game__${direction}-slide`);
  element.addEventListener('animationend', animationHandler);
};

export const getShakeAnimation = (element) => {
  element.classList.add('game__score-shake');
  setTimeout(() => {
    element.classList.remove('game__score-shake');
  }, 500);
};