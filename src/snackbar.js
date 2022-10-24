export const snackbar = (colorClass, isCorrect) => {
  const snackbar = document.getElementById('snackbar');
  snackbar.classList.add('snackbar_show');
    snackbar.innerHTML = `
          ${isCorrect ? `<p class="snackbar_${colorClass}"">+1</p>` : `<p class="snackbar_${colorClass}"">-1</p>`}
    `;

  setTimeout(() => {
    snackbar.classList.remove('snackbar_show');
  }, 500);
};