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

  if (moviesApiService.query === '') {
    // return info({
    //   text: 'You must enter query parameters. Try again',
    // });
  }

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

  moviesApiService.page = Number(e.target.dataset.page);
  pagination.page = Number(e.target.dataset.page);
  paginationFetch();
}

function paginationFetch() {
  if (pagination.fetch === 'api') {
    fetchApiMoviesPagination();
  }

  pagination.updatePageList();
}

async function fetchMoviesSearchQuery() {
  try {
    const movies = await moviesApiService.fetchMoviesSearchQuery();

    if (movies.length == 0) {
      // return info({
      //   text: 'No country has been found. Please enter a more specific query!',
      // });
    }
    pagination.show();
    appendMoviesMarkup(movies);
    appendPaginationMarkup(moviesApiService.totalPages);
  } catch (error) {
    // info({
    //   text: 'Sorry. we cannot process your request!',
    // });
  }
}

async function fetchApiMoviesPagination() {
  try {
    const movies = await moviesApiService.fetchMoviesPagination();
    if (movies.length == 0) {
      pagination.hide();
      // return info({
      //   text: 'No country has been found. Please enter a more specific query!',
      // });
    }
    clearMoviesContainer();
    appendMoviesMarkup(movies);
    scrollTo();
  } catch (error) {
    // info({
    //   text: 'Sorry. we cannot process your request!',
    // });
  }
}

async function fetchPopularMovies() {
  clearMoviesContainer();
  try {
    const movies = await moviesApiService.fetchPopularMovies();

    if (movies.length == 0) {
      // return info({
      //   text: 'No country has been found. Please enter a more specific query!',
      // });
    }
    pagination.show();
    appendMoviesMarkup(movies);
    appendPaginationMarkup(moviesApiService.totalPages);
  } catch (error) {
    // info({
    //   text: 'Sorry. we cannot process your request!',
    // });
  }
}

fetchPopularMovies();
