// refs
import getRefs from './refs/get-refs';

import {
  appendMoviesMarkup,
  clearMoviesContainer,
  appendPaginationMarkup,
  pagination,
} from './components/appendMovies';

export async function fetchLibraryMovies() {  
};

// function appendLibraryMoviesMarkup(movies, totalPages) {
//   appendMoviesMarkup(movies);
//   appendPaginationMarkup(totalPages);
// }

const refs = getRefs();
const Library = {
  WATCHED: 'WATCHED',
  QUEUE: 'QUEUE',
};
const { WATCHED, QUEUE } = Library;

refs.libraryWatchedBtn.addEventListener('click', evt => {
  isActiveBtn(evt);
  renderLibrary(WATCHED);
});
refs.libraryQueueBtn.addEventListener('click', evt => {
  isActiveBtn(evt);
  renderLibrary(QUEUE);
});

function isActiveBtn(evt) {
  if (evt.currentTarget.nodeName !== 'BUTTON') {
    return;
  }

  const currentActiveBtn = document.querySelector('.is-active');

  if (currentActiveBtn) {
    currentActiveBtn.classList.remove('is-active');
  }

  evt.currentTarget.classList.add('is-active');
}

function renderLibrary(section) {
  clearMoviesContainer();
  pagination.hide();
  pagination.resetPage();
  const moviesFromLS = JSON.parse(localStorage.getItem(section));

  if (moviesFromLS) {
    const moviesForRender = moviesFromLS.slice(0, 20);
    const numberOfPages = Math.ceil(moviesFromLS.length / 20);
    // appendLibraryMoviesMarkup(moviesForRender, numberOfPages);
    pagination.show();
    appendMoviesMarkup(moviesForRender);
    appendPaginationMarkup(numberOfPages);
  }  
}
