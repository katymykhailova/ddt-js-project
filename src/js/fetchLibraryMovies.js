// refs
import getRefs from './refs/get-refs';

import {
  appendMoviesMarkup,
  clearMoviesContainer,
  appendPaginationMarkup,
  pagination,
} from './components/appendMovies';

export function fetchLibraryMovies() {
  pagination.metod = paginationLibraryFetch;
  clearMoviesContainer();
  pagination.hide();
  pagination.resetPage();
  checkLibraryStatus();
}

const refs = getRefs();
const Library = {
  LIBRARY_STATUS: 'LibraryStatus',
  WATCHED: 'WATCHED',
  QUEUE: 'QUEUE',
};
const { LIBRARY_STATUS, WATCHED, QUEUE } = Library;
let section = WATCHED;

refs.libraryWatchedBtn.addEventListener('click', evt => {
  isActiveBtn(evt);
  section = WATCHED;
  renderLibrary(section);
  localStorage.setItem(LIBRARY_STATUS, section);
});
refs.libraryQueueBtn.addEventListener('click', evt => {
  isActiveBtn(evt);
  section = QUEUE;
  renderLibrary(section);
  localStorage.setItem(LIBRARY_STATUS, section);
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
};

function renderLibrary(section) {
  clearMoviesContainer();
  pagination.hide();
  pagination.resetPage();
  const moviesFromLS = JSON.parse(localStorage.getItem(section));

  if (moviesFromLS) {
    const moviesForRender = moviesFromLS.slice(0, 20);
    const numberOfPages = Math.ceil(moviesFromLS.length / 20);
    appendMoviesMarkup(moviesForRender);
    appendPaginationMarkup(numberOfPages);
    pagination.show();
  };
};

function paginationLibraryFetch() {
  fetchLibraryMoviesPagination();
  pagination.updatePageList();
};

function fetchLibraryMoviesPagination() {
  pagination.hide();
  clearMoviesContainer();
  const moviesFromLS = JSON.parse(localStorage.getItem(section));
  if (moviesFromLS) {
    const begin = (pagination.page - 1) * 20;
    const end = (pagination.page - 1) * 20 + 20;
    const moviesForRender = moviesFromLS.slice(begin, end);
    const numberOfPages = Math.ceil(moviesFromLS.length / 20);
    appendMoviesMarkup(moviesForRender);
    appendPaginationMarkup(numberOfPages);
    pagination.show();
  };
};

function checkLibraryStatus() {
  if (localStorage.getItem(LIBRARY_STATUS) === WATCHED) {
    refs.libraryWatchedBtn.classList.add('is-active');
    renderLibrary(WATCHED);
  };
  if (localStorage.getItem(LIBRARY_STATUS) === QUEUE) {
    refs.libraryQueueBtn.classList.add('is-active');
    renderLibrary(QUEUE);
  };
};
