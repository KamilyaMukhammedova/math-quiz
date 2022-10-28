export const onFieldValidator = (eventName, field, btn) => {
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

export const checkGameModeBtns = (mode, btn1, btn2) => {
  if(mode.checked) {
    btn1.classList.remove('btn-outline-secondary');
    btn1.classList.add('btn-secondary');
    btn2.classList.remove('btn-secondary');
    btn2.classList.add('btn-outline-secondary');
  } else {
    btn2.classList.remove('btn-outline-secondary');
    btn2.classList.add('btn-secondary');
    btn1.classList.remove('btn-secondary');
    btn1.classList.add('btn-outline-secondary');
  }
};

export const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const redirectToPage = (page) => {
  window.location.assign(`/${page}.html`);
};

