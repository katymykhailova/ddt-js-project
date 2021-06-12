// modules
import MoviesApiService from './apiService';
import Pagination from './components/pagination';
// lodash
import debounce from 'lodash.debounce';

// refs
import getRefs from './refs/get-refs';

// variables
let clientWidth = document.documentElement.clientWidth;
const moviesApiService = new MoviesApiService();
const pagination = new Pagination({ selector: '[data-action="pagination"]' });
pagination.length = clientWidth >= 768 ? 9 : 5;

// templates
import filmCard from '../template/film-card.hbs';

const refs = getRefs();
const headerClientHeight = refs.headerEl.clientHeight;

pagination.refs.paginateContainer.addEventListener('click', onSearchPagination);
pagination.refs.prevPageBtn.addEventListener('click', onPrevPageBtnClick);
pagination.refs.nextPageBtn.addEventListener('click', onNextPageBtnClick);
refs.inputEl.addEventListener('input', debounce(onInput, 500));
window.addEventListener('resize', debounce(onWindowResize, 200));

function scrollTo() {
  if (headerClientHeight === 0) {
    return;
  }

  window.scrollTo({
    top: headerClientHeight,
    behavior: 'smooth',
  });
}

function onWindowResize() {
  clientWidth = document.documentElement.clientWidth;
  pagination.length = clientWidth >= 768 ? 9 : 5;
  pagination.updatePageList();
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

  moviesApiService.page = e.target.dataset.page;
  pagination.page = e.target.dataset.page;
  paginationFetch();
}

function paginationFetch() {
  scrollTo();
  clearMoviesContainer();
  // if (pagination.fetch === 'api') {
    fetchApiMoviesPagination();
  // }

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
    appendPaginationMarkup();
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
    appendMoviesMarkup(movies);
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
    appendPaginationMarkup();
  } catch (error) {
    // info({
    //   text: 'Sorry. we cannot process your request!',
    // });
  }
}

function appendMoviesMarkup(movies) {
  refs.galleryListEl.insertAdjacentHTML('beforeend', filmCard(movies));
}

function clearMoviesContainer() {
  refs.galleryListEl.innerHTML = '';
}

function appendPaginationMarkup() {
  pagination.maxPage = moviesApiService.totalPages;
  pagination.updatePageList();
}

fetchPopularMovies();
