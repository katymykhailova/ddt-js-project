export default function getRefs() {
  return {
    galleryListEl: document.querySelector('.gallery-list'),
    prevPageBtn: document.querySelector('[data-action="prev-page"]'),
    nextPageBtn: document.querySelector('[data-action="next-page"]'),
  };
}
