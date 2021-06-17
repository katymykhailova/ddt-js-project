import getRefs from '../refs/get-refs';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const refs = {
  checkbox: document.getElementById('theme-switch-toggle'),
  body: document.querySelector('body'),
};

const modalRefs = getRefs();

refs.body.classList.add(Theme.LIGHT);
modalRefs.movieWrap.classList.add(Theme.LIGHT);

refs.checkbox.addEventListener('change', onClickCheckbox);

function onClickCheckbox(e) {
  refs.body.classList.toggle(Theme.LIGHT);
  refs.body.classList.toggle(Theme.DARK);

  modalRefs.movieWrap.classList.toggle(Theme.LIGHT);
  modalRefs.movieWrap.classList.toggle(Theme.DARK);

  if (e.currentTarget.checked) {
    localStorage.setItem('theme', Theme.DARK);
  } else {
    localStorage.setItem('theme', Theme.LIGHT);
  }
}

const saveTheme = localStorage.getItem('theme');
if (saveTheme === Theme.DARK) {
  refs.checkbox.checked = true;
  refs.body.classList.add(Theme.DARK);
  modalRefs.movieWrap.classList.toggle(Theme.DARK);
}
