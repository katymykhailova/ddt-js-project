// refs
import getRefs from './refs/get-refs';

import {
  appendMoviesMarkup,
  clearMoviesContainer,
  appendPaginationMarkup,
  pagination,
} from './components/appendMovies';

export async function fetchLibraryMovies(key) {
  const movies = JSON.parse(localStorage.getItem(key));

  clearMoviesContainer();
  pagination.hide();
  // pagination.show();
  appendMoviesMarkup(movies);
  // appendPaginationMarkup(totalPages);
}

const refs = getRefs();
const Library = {
  LIBRARY_KEY: 'LIBRARY',
  WATCHED: 'WATCHED',
  QUEUE: 'QUEUE',
};
const { LIBRARY_KEY, WATCHED, QUEUE } = Library;

refs.libraryWatchedBtn.addEventListener('click', libraryWatched);
refs.libraryQueueBtn.addEventListener('click', libraryQueue);

const currentLibrary = localStorage.getItem(LIBRARY_KEY);

if (currentLibrary === WATCHED) {
  libraryWatched();
}
if (currentLibrary === QUEUE) {
  libraryQueue();
} else {
  // return;
}

function libraryWatched() {
  refs.libraryWatchedBtn.classList.add('is-active');
  refs.libraryQueueBtn.classList.remove('is-active');
  localStorage.setItem(LIBRARY_KEY, WATCHED);
  fetchLibraryMovies(WATCHED);
}

function libraryQueue() {
  refs.libraryQueueBtn.classList.add('is-active');
  refs.libraryWatchedBtn.classList.remove('is-active');
  localStorage.setItem(LIBRARY_KEY, QUEUE);
  fetchLibraryMovies(QUEUE);
}
