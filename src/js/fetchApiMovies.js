// lodash
import debounce from 'lodash.debounce';
// modules
import MoviesApiService from './apiService';

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

pagination.refs.paginateContainer.addEventListener('click', onSearchPagination);
pagination.refs.prevPageBtn.addEventListener('click', onPrevPageBtnClick);
pagination.refs.nextPageBtn.addEventListener('click', onNextPageBtnClick);
refs.inputEl.addEventListener('input', debounce(onInput, 500));

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
  moviesApiService.query = e.target.value.trim();
  moviesApiService.resetPage();
  pagination.resetPage();
  scrollTo();
  clearMoviesContainer();
  fetchMoviesSearchQuery();
  e.target.value = '';
}

function onPrevPageBtnClick(e) {
  e.preventDefault();
  moviesApiService.decrementPage();
  pagination.decrementPage();
  paginationFetch();
}

function onNextPageBtnClick(e) {
  e.preventDefault();
  moviesApiService.incrementPage();
  pagination.incrementPage();
  paginationFetch();
}

function onSearchPagination(e) {
  e.preventDefault();
  if (e.target.classList.contains('disabled')) {
    return;
  }

  moviesApiService.page = Number(e.target.dataset.pagepagination);
  pagination.page = Number(e.target.dataset.pagepagination);
  paginationFetch();
}

function paginationFetch() {
  if (pagination.fetch === 'api') {
    fetchApiMoviesPagination();
  }

  pagination.updatePageList();
}

async function fetchMoviesSearchQuery() {
  pagination.hide();
  try {
    const movies = await moviesApiService.fetchMoviesSearchQuery();

    if (movies.length == 0) {
      refs.jsWarningEl.textContent =
        'Фильм не найден. Пожалуйста, введите более конкретный запрос!';
      return;
    }
    appendMoviesMarkup(movies);
    appendPaginationMarkup(moviesApiService.totalPages);
    pagination.show();
  } catch (error) {
    refs.jsWarningEl.textContent = 'Извините. мы не можем обработать ваш запрос!';
  }
}

async function fetchApiMoviesPagination() {
  pagination.hide();
  try {
    const movies = await moviesApiService.fetchMoviesPagination();
    if (movies.length == 0) {
      refs.jsWarningEl.textContent =
        'Фильм не найден. Пожалуйста, введите более конкретный запрос!';
      return;
    }
    clearMoviesContainer();
    appendMoviesMarkup(movies);
    pagination.show();
    scrollTo();
  } catch (error) {
    refs.jsWarningEl.textContent = 'Извините. мы не можем обработать ваш запрос!';
  }
}

export async function fetchPopularMovies() {
  clearMoviesContainer();
  pagination.hide();
  try {
    const movies = await moviesApiService.fetchPopularMovies();

    if (movies.length == 0) {
      refs.jsWarningEl.textContent =
        'Фильм не найден. Пожалуйста, введите более конкретный запрос!';
      return;
    }
    pagination.show();
    appendMoviesMarkup(movies);
    appendPaginationMarkup(moviesApiService.totalPages);
  } catch (error) {
    refs.jsWarningEl.textContent = 'Извините. мы не можем обработать ваш запрос!';
  }
}

fetchPopularMovies();
