export default function getRefs() {
  return {
    galleryListEl: document.querySelector('.gallery-list'),
    headerEl: document.querySelector('.header-main'),
    prevPageBtn: document.querySelector('[data-action="prev-page"]'),
    nextPageBtn: document.querySelector('[data-action="next-page"]'),
  };
}
