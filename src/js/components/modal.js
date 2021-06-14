import modalFilmTpl from '../../template/modal-film-card.hbs';
import MoviesApiService from '../apiService';
import getRefs from '../refs/get-refs';
import noposter from '../../images/no-poster.png';

// import * as basicLightbox from 'basiclightbox';
// import 'basiclightbox/dist/basicLightbox.min.css';
// import 'spin.js/spin.css';

import ligtboxSpinner from './spinner';

import {
  getMovieQueueOfLocalStorage,
  getMovieWatchOfLocalStorage,
  addToWatchInLocalStorage,
  addToQuequeInLocalStorage,
} from './localStoragе';

const moviesApiService = new MoviesApiService();
const refs = getRefs();

let addedMovie;
let addedQuequeMovie;
let currentMovie;
let addWatchedBtn;
let addQuequeBtn;
const btnWatchTextContent = 'REMOVE TO WATCHED';
const btnQueueTextContent = 'REMOVE TO QUEUE';

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

    addQuequeBtn = document.querySelector('.add-queue-js');
    addWatchedBtn = document.querySelector('.add-watched-js');
    const modalCloseBtn = document.querySelector('[data-action="modal-close"]');
    addQuequeBtn.addEventListener('click', onAddQueque);
    addWatchedBtn.addEventListener('click', onAddWatched);
    modalCloseBtn.addEventListener('click', onModalClose);

    currentMovie = JSON.parse(localStorage.getItem('movie'));
    if (getMovieWatchOfLocalStorage(currentMovie)) {
      addedMovie = false;
      //есть в LocalStorage меняем внешний вид кнопки Watch
      addWatchedBtn.textContent = btnWatchTextContent;
      addWatchedBtn.classList.add('accent-button');
    } else {
      addedMovie = true;

      //нет в LocalStorage
    }
    if (getMovieQueueOfLocalStorage(currentMovie)) {
      addedQuequeMovie = false;
      //есть в LocalStorage меняем внешний вид кнопки Queue
      addQuequeBtn.textContent = btnQueueTextContent;
      addQuequeBtn.classList.add('accent-button');
    } else {
      addedQuequeMovie = true;
      //нет в LocalStorage
    }
  } catch (error) {
    console.log(error);
  }
}

const modalMovieRender = markup => {
  // refs.movieBackdrop.insertAdjacentHTML('beforeend', markup);
  refs.movieWrap.insertAdjacentHTML('beforeend', markup);
};

const modalClear = () => {
  // refs.movieBackdrop.innerHTML = '';
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
  refs.movieBackdrop.classList.remove('is-hidden');
  document.body.classList.add('body-overflowHidden');
  refs.toTopBtn.classList.remove('upview');
  // console.log(toTopBtn);

  // const instance = basicLightbox.create(``);

  // instance.show();
  // const lightboxEl = instance.element();
  // const modalSpinner = ligtboxSpinner.spin(lightboxEl);
  // const modalImg = document.querySelector('.modal__movie-img');

  // modalImg.addEventListener('load', e => {
  //   modalSpinner.stop();
  // });

  // modalSpinner.stop();
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
  document.body.classList.remove('body-overflowHidden');
  refs.toTopBtn.classList.add('upview');

  window.removeEventListener('keydown', onModalClose);

  modalClear();
}

function onAddMovieInLocalStorage(watchedMovie) {
  localStorage.setItem('movie', JSON.stringify(watchedMovie));
}

function onAddQueque() {
  addToQuequeInLocalStorage({ addedQuequeMovie, currentMovie });

  addQuequeBtn.textContent = btnQueueTextContent;
  addQuequeBtn.classList.add('accent-button');
  if ((addedQuequeMovie = !addedQuequeMovie)) {
    addQuequeBtn.textContent = 'QUEUE';
    addQuequeBtn.classList.remove('accent-button');
  }
}

function onAddWatched() {
  addToWatchInLocalStorage({ addedMovie, currentMovie });

  addWatchedBtn.textContent = btnWatchTextContent;
  addWatchedBtn.classList.add('accent-button');
  if ((addedMovie = !addedMovie)) {
    addWatchedBtn.textContent = 'ADD TO WATCHED';
    addWatchedBtn.classList.remove('accent-button');
  }
}
