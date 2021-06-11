export default function getRefs() {
  return {
    inputEl: document.querySelector('#search-form input'),
    galleryListEl: document.querySelector('.gallery-list'),
    headerEl: document.querySelector('.header-main'),
    jsWarningEl: document.querySelector('#js-warning'),
    navigator: document.querySelector('.navigation'),
    logoBtn: document.querySelector('#logoBtn'),
    homeBtn: document.querySelector('#index'),
    libraryBtn: document.querySelector('#library'),
    form: document.querySelector('#search-form'),
    buttonBox: document.querySelector('#js-buttons'),
    movieBackdrop: document.querySelector('.movie-backdrop'),
    movieWrap: document.querySelector('.movie-wrap'),
  };
}

export const modalTeamRefs = {
  openTeamModalBtn: document.querySelector('[data-modal-open]'),
  closeTeamModalBtn: document.querySelector('[data-modal-close]'),
  teamModal: document.querySelector('[data-modal]'),
  itemsRef: document.querySelectorAll('.team-list__item'),
};
