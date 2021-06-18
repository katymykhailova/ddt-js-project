// lodash
import debounce from 'lodash.debounce';
// modules
import MoviesApiService from './apiService';
import { spinnerModal } from './components/spinner';
import { footerToBottom } from './components/footer';

// refs
import getRefs from './refs/get-refs';

import {
  appendMoviesMarkup,
  clearMoviesContainer,
  appendPaginationMarkup,
  pagination,
} from './components/appendMovies';

// variables
const moviesApiService = new MoviesApiService();

// templates
import filmCard from '../template/film-card.hbs';

const refs = getRefs();
const headerClientHeight = refs.headerEl.clientHeight;

pagination.metod = paginationFetch;
refs.form.addEventListener('submit', onInput);

function scrollTo() {
  if (headerClientHeight === 0) {
    return;
  }

  window.scrollTo({
    top: headerClientHeight,
    behavior: 'smooth',
  });
}

function onInput(e) {
  e.preventDefault();
  moviesApiService.query = e.currentTarget.elements.query.value.trim();
  moviesApiService.resetPage();
  pagination.resetPage();
  scrollTo();
  clearMoviesContainer();
  fetchMoviesSearchQuery();
}

function paginationFetch() {
  moviesApiService.page = Number(pagination.page);
  fetchApiMoviesPagination();
  pagination.updatePageList();
}

async function fetchMoviesSearchQuery() {
  pagination.hide();
  try {
    spinnerModal('start'); // Убирает класс is-hidden
    const movies = await moviesApiService.fetchMoviesSearchQuery();

    if (movies.length == 0) {
      footerToBottom();
      spinnerModal('stop');
      refs.jsWarningEl.textContent =
        'Фильм не найден. Пожалуйста, введите более конкретный запрос!';
      return;
    }
    appendMoviesMarkup(movies);
    appendPaginationMarkup(moviesApiService.totalPages);
    pagination.show();
    footerToBottom();
    spinnerModal('stop');
  } catch (error) {
    footerToBottom();
    spinnerModal('stop');
    refs.jsWarningEl.textContent = 'Извините. мы не можем обработать ваш запрос!';
  }
}

async function fetchApiMoviesPagination() {
  pagination.hide();
  try {
    spinnerModal('start'); // Убирает класс is-hidden
    const movies = await moviesApiService.fetchMoviesPagination();
    if (movies.length == 0) {
      footerToBottom();
      spinnerModal('stop');
      refs.jsWarningEl.textContent =
        'Фильм не найден. Пожалуйста, введите более конкретный запрос!';
      return;
    }
    clearMoviesContainer();
    appendMoviesMarkup(movies);
    pagination.show();

    footerToBottom();
    scrollTo();
    spinnerModal('stop');
  } catch (error) {
    footerToBottom();
    spinnerModal('stop');
    refs.jsWarningEl.textContent = 'Извините. мы не можем обработать ваш запрос!';
  }
}

export async function fetchPopularMovies() {
  pagination.hide();
  pagination.resetPage();
  pagination.metod = paginationFetch;
  moviesApiService.page = Number(pagination.page);
  moviesApiService.searchQuery = '';
  clearMoviesContainer();
  try {
    footerToBottom();
    spinnerModal('start'); // Убирает класс is-hidden
    const movies = await moviesApiService.fetchPopularMovies();

    if (movies.length == 0) {
      spinnerModal('stop');
      refs.jsWarningEl.textContent =
        'Фильм не найден. Пожалуйста, введите более конкретный запрос!';
      return;
    }
    appendMoviesMarkup(movies);
    appendPaginationMarkup(moviesApiService.totalPages);
    pagination.updatePageList;
    pagination.show();
    footerToBottom();
    spinnerModal('stop');
  } catch (error) {
    footerToBottom();
    spinnerModal('stop');
    refs.jsWarningEl.textContent = 'Извините. мы не можем обработать ваш запрос!';
  }
}
