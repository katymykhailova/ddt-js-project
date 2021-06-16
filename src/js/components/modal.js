import modalFilmTpl from '../../template/modal-film-card.hbs';
import MoviesApiService from '../apiService';
import getRefs from '../refs/get-refs';
import {
  btnWatchTextContentRemove,
  btnQueueTextContentRemove,
  btnWatchTextContent,
  btnQueueTextContent,
} from '../refs/settings';
import noposter from '../../images/no-poster.png';

import { addSpinnerForModalWindow } from './spinner';

import {
  getMovieQueueOfLocalStorage,
  getMovieWatchOfLocalStorage,
  addToWatchInLocalStorage,
  addToQuequeInLocalStorage,
} from './localStoragе';

import { fetchLibraryMovies } from '../fetchLibraryMovies';

const moviesApiService = new MoviesApiService();
const refs = getRefs();

let addedMovie;
let addedQuequeMovie;
let currentMovie;
let addWatchedBtn;
let addQuequeBtn;

refs.galleryListEl.addEventListener('click', onModalOpen);
refs.movieBackdrop.addEventListener('click', onModalClose);

async function fetchMovieDetails() {
  try {
    const movie = await moviesApiService.fetchMovieDetails();

    const poster_path = movie.poster_path
      ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path
      : noposter;
    const genres = movie.genres.map(genre => genre.name);
    const release_date = movie.release_date.split('-')[0];
    const watchedMovie = {
      id: movie.id,
      poster_path,
      vote_average: movie.vote_average,
      title: movie.title,
      backdrop_path: movie.backdrop_path,
      genres,
      name: movie.name,
      release_date,
    };
    onAddMovieInLocalStorage(watchedMovie);

    const movieNormalizer = { ...movie, poster_path };
    const movieMarkup = modalFilmTpl(movieNormalizer);
    modalMovieRender(movieMarkup);
    removeIsHiddenFromBackdrop();
    addBodyOverflowHidden();
    removeTopBtnUpview();
    insertAddBtnsLogic();
    insertCloseBtnLogic();

    currentMovie = JSON.parse(localStorage.getItem('movie'));
    if (getMovieWatchOfLocalStorage(currentMovie)) {
      addedMovie = false;
      //есть в LocalStorage меняем внешний вид кнопки Watch
      addWatchedBtn.textContent = btnWatchTextContentRemove;
      addWatchedBtn.classList.add('accent-button');
    } else {
      addedMovie = true;

      //нет в LocalStorage
    }
    if (getMovieQueueOfLocalStorage(currentMovie)) {
      addedQuequeMovie = false;
      //есть в LocalStorage меняем внешний вид кнопки Queue
      addQuequeBtn.textContent = btnQueueTextContentRemove;
      addQuequeBtn.classList.add('accent-button');
    } else {
      addedQuequeMovie = true;
      //нет в LocalStorage
    }
  } catch (error) {
    console.log(error);
  }
}

const insertAddBtnsLogic = () => {
  addQuequeBtn = document.querySelector('.add-queue-js');
  addWatchedBtn = document.querySelector('.add-watched-js');
  addQuequeBtn.addEventListener('click', onAddQueque);
  addWatchedBtn.addEventListener('click', onAddWatched);
};

const insertCloseBtnLogic = () => {
  const modalCloseBtn = document.querySelector('[data-action="modal-close"]');
  modalCloseBtn.addEventListener('click', onModalClose);
};

const removeIsHiddenFromBackdrop = () => {
  refs.movieBackdrop.classList.remove('is-hidden');
};

const addBodyOverflowHidden = () => {
  document.body.classList.add('body-overflow--hidden');
};

const removeTopBtnUpview = () => {
  refs.toTopBtn.classList.remove('upview');
};

const modalMovieRender = markup => {
  refs.movieWrap.insertAdjacentHTML('beforeend', markup);
  addSpinnerForModalWindow();
};

const modalClear = () => {
  refs.movieWrap.innerHTML = '';
};

export default function onModalOpen(e) {
  e.preventDefault();

  window.addEventListener('keydown', onModalClose);

  const isFilmCardLiEl = e.target.parentNode.classList.contains('gallery-list__item');
  if (!isFilmCardLiEl) {
    return;
  }
  moviesApiService.id = e.target.parentNode.dataset.id;
  fetchMovieDetails();
}

function onModalClose(e) {
  if (
    !e.target.classList.contains('modal__close-button') &&
    !e.target.classList.contains('movie-backdrop') &&
    e.code !== 'Escape'
  ) {
    return;
  }

  refs.movieBackdrop.classList.add('is-hidden');
  document.body.classList.remove('body-overflow--hidden');
  if (window.pageYOffset > 500) {
    refs.toTopBtn.classList.add('upview');
  }

  window.removeEventListener('keydown', onModalClose);
  setTimeout(() => {
    modalClear();
  }, 250);
}

function onAddMovieInLocalStorage(watchedMovie) {
  localStorage.setItem('movie', JSON.stringify(watchedMovie));
}

function onAddQueque() {
  addToQuequeInLocalStorage({ addedQuequeMovie, currentMovie });

  addQuequeBtn.textContent = btnQueueTextContentRemove;
  addQuequeBtn.classList.add('accent-button');
  if ((addedQuequeMovie = !addedQuequeMovie)) {
    addQuequeBtn.textContent = btnQueueTextContent;
    addQuequeBtn.classList.remove('accent-button');
    if (refs.headerEl.classList.contains('my-library')) {
      fetchLibraryMovies();
    }
  }
}

function onAddWatched() {
  addToWatchInLocalStorage({ addedMovie, currentMovie });

  addWatchedBtn.textContent = btnWatchTextContentRemove;
  addWatchedBtn.classList.add('accent-button');
  if ((addedMovie = !addedMovie)) {
    addWatchedBtn.textContent = btnWatchTextContent;
    addWatchedBtn.classList.remove('accent-button');
    if (refs.headerEl.classList.contains('my-library')) {
      fetchLibraryMovies();
    }
  }
}
