// refs
import getRefs from './refs/get-refs';
import { LIBRARY_STATUS, WATCHED, QUEUE } from './refs/settings';

import {
  appendMoviesMarkup,
  clearMoviesContainer,
  appendPaginationMarkup,
  pagination,
} from './components/appendMovies';

export function fetchLibraryMovies() {
  pagination.metod = paginationLibraryFetch;
  checkLibraryStatus();
}

const refs = getRefs();
let section = WATCHED;

refs.libraryWatchedBtn.addEventListener('click', onlibraryBtnClick);

refs.libraryQueueBtn.addEventListener('click', onlibraryBtnClick);

function onlibraryBtnClick(evt) {
  if (evt.currentTarget.nodeName !== 'BUTTON') {
    return;
  }
  isActiveBtn(evt);
  section = evt.currentTarget.dataset.action.toUpperCase();
  renderLibrary(section);
}

function isActiveBtn(evt) {
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
    appendMoviesMarkup(moviesForRender);
    appendPaginationMarkup(numberOfPages);
    pagination.show();
  }
  if (!moviesFromLS || JSON.parse(moviesFromLS).length === 0) {
    refs.chooseLibraryList.classList.add('visually-hidden');
    refs.emptyLibraryList.classList.remove('visually-hidden');
  }
  localStorage.setItem(LIBRARY_STATUS, section);
}

function paginationLibraryFetch() {
  fetchLibraryMoviesPagination();
  pagination.updatePageList();
}

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
  }
}

function checkLibraryStatus() {
  pagination.hide();
  pagination.resetPage();
  clearMoviesContainer();
  const activeLibrary = document.querySelector('.is-active');
  if (!activeLibrary) {
    refs.chooseLibraryList.classList.remove('visually-hidden');
  }

  section = localStorage.getItem(LIBRARY_STATUS);

  if (section) {
    const libraryBtn = document.querySelector(`[data-action=${section.toLowerCase()}]`);
    libraryBtn.classList.add('is-active');
    renderLibrary(section);
  }

  // if (localStorage.getItem(LIBRARY_STATUS) === WATCHED) {
  //   refs.libraryWatchedBtn.classList.add('is-active');
  //   renderLibrary(WATCHED);
  // }
  // if (localStorage.getItem(LIBRARY_STATUS) === QUEUE) {
  //   refs.libraryQueueBtn.classList.add('is-active');
  //   renderLibrary(QUEUE);
  // }
}
