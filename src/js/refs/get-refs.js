export default function getRefs() {
  return {
    inputEl: document.querySelector('#search-form input'),
    galleryListEl: document.querySelector('.gallery-list'),
    headerEl: document.querySelector('.header-main'),
    prevPageBtn: document.querySelector('[data-action="prev-page"]'),
    nextPageBtn: document.querySelector('[data-action="next-page"]'),
    jsWarningEl: document.querySelector('#js-warning'),
    signUpModal: document.querySelector('.sign-up'),
    headerHome: document.querySelector('.header-home'),
    openModalBtn: document.querySelector('[data-action="open-modal"]'),
  closeModalBtn: document.querySelector('[data-action="close-modal"]'),
  backdrop: document.querySelector('.js-backdrop'),
  };
}
