// refs
import getRefs from './refs/get-refs';

import {
  appendMoviesMarkup,
  clearMoviesContainer,
  appendPaginationMarkup,
  pagination,
} from './components/appendMovies';

export async function fetchLibraryMovies(movies, totalPages) {
  clearMoviesContainer();
  pagination.hide();
  pagination.show();
  appendMoviesMarkup(movies);
  appendPaginationMarkup(totalPages);
}

const refs = getRefs();
const Library = {
  WATCHED: 'WATCHED',
  QUEUE: 'QUEUE',
};
const { WATCHED, QUEUE } = Library;

refs.libraryWatchedBtn.addEventListener('click', (evt) => {
  isActiveBtn(evt);
  renderLibrary(WATCHED);
});
refs.libraryQueueBtn.addEventListener('click', (evt) => {
  isActiveBtn(evt);
  renderLibrary(QUEUE);
});

function isActiveBtn(evt) {
  if (evt.currentTarget.nodeName !== 'BUTTON') {
    return;
  };

  const currentActiveBtn = document.querySelector('.is-active');

  if (currentActiveBtn) {
    currentActiveBtn.classList.remove('is-active');
  };

  evt.currentTarget.classList.add('is-active');
};

function renderLibrary(section) {
  const movies = JSON.parse(localStorage.getItem(section));

  if (movies) {
    const numberOfPages = Math.ceil(movies.length / 12);
    fetchLibraryMovies(movies, numberOfPages);
  };
};