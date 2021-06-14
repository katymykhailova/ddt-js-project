// lodash
import debounce from 'lodash.debounce';
// modules
import MoviesApiService from './apiService';
import ligtboxSpinner from './components/spinner';

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

// pagination.refs.paginateContainer.addEventListener('click', onSearchPagination);
// pagination.refs.prevPageBtn.addEventListener('click', onPrevPageBtnClick);
// pagination.refs.nextPageBtn.addEventListener('click', onNextPageBtnClick);
pagination.metod = paginationFetch;
refs.form.addEventListener('submit', onInput);
// refs.inputEl.addEventListener('input', debounce(onInput, 1000));

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
  // moviesApiService.query = e.target.value.trim();
  moviesApiService.query = e.currentTarget.elements.query.value.trim();
  moviesApiService.resetPage();
  pagination.resetPage();
  scrollTo();
  clearMoviesContainer();
  fetchMoviesSearchQuery();
  // e.target.value = '';
  e.currentTarget.elements.query.value = '';
}

// function onPrevPageBtnClick(e) {
//   e.preventDefault();
//   moviesApiService.decrementPage();
//   pagination.decrementPage();
//   paginationFetch();
// }

// function onNextPageBtnClick(e) {
//   e.preventDefault();
//   moviesApiService.incrementPage();
//   pagination.incrementPage();
//   paginationFetch();
// }

// function onSearchPagination(e) {
//   e.preventDefault();
//   if (e.target.classList.contains('disabled')) {
//     return;
//   }

//   moviesApiService.page = Number(e.target.dataset.pagepagination);
//   pagination.page = Number(e.target.dataset.pagepagination);
//   paginationFetch();
// }

function paginationFetch() {
  moviesApiService.page = Number(pagination.page);
  fetchApiMoviesPagination();
  pagination.updatePageList();
}

async function fetchMoviesSearchQuery() {
  pagination.hide();
  try {
    ligtboxSpinner('start'); // Убирает класс is-hidden
    const movies = await moviesApiService.fetchMoviesSearchQuery();

    if (movies.length == 0) {
      ligtboxSpinner('stop');
      refs.jsWarningEl.textContent =
        'Фильм не найден. Пожалуйста, введите более конкретный запрос!';
      return;
    }
    appendMoviesMarkup(movies);
    appendPaginationMarkup(moviesApiService.totalPages);
    pagination.show();
    ligtboxSpinner('stop');
  } catch (error) {
    ligtboxSpinner('stop');
    refs.jsWarningEl.textContent = 'Извините. мы не можем обработать ваш запрос!';
  }
}

async function fetchApiMoviesPagination() {
  pagination.hide();
  try {
    ligtboxSpinner('start'); // Убирает класс is-hidden
    const movies = await moviesApiService.fetchMoviesPagination();
    if (movies.length == 0) {
      ligtboxSpinner('stop');
      refs.jsWarningEl.textContent =
        'Фильм не найден. Пожалуйста, введите более конкретный запрос!';
      return;
    }
    clearMoviesContainer();
    appendMoviesMarkup(movies);
    pagination.show();
    scrollTo();
    ligtboxSpinner('stop');
  } catch (error) {
    ligtboxSpinner('stop');
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
    ligtboxSpinner('start'); // Убирает класс is-hidden
    const movies = await moviesApiService.fetchPopularMovies();

    if (movies.length == 0) {
      ligtboxSpinner('stop');
      refs.jsWarningEl.textContent =
        'Фильм не найден. Пожалуйста, введите более конкретный запрос!';
      return;
    }
    appendMoviesMarkup(movies);
    appendPaginationMarkup(moviesApiService.totalPages);
    pagination.updatePageList;
    pagination.show();
    ligtboxSpinner('stop');
  } catch (error) {
    ligtboxSpinner('stop');
    refs.jsWarningEl.textContent = 'Извините. мы не можем обработать ваш запрос!';
  }
}
