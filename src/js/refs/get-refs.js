export default function getRefs() {
  return {
    inputEl: document.querySelector('#search-form input'),
    galleryListEl: document.querySelector('.gallery-list'),
    headerEl: document.querySelector('.header-main'),
    prevPageBtn: document.querySelector('[data-action="prev-page"]'),
    nextPageBtn: document.querySelector('[data-action="next-page"]'),
    jsWarningEl: document.querySelector('#js-warning'),
    logoBtn:document.querySelector('#logoBtn'),
    homeBtn: document.querySelector('#index'),
    libraryBtn:document.querySelector('#library'),
    form: document.querySelector('#search-form'),
    buttonBox: document.querySelector("#js-buttons"),
  };
}
