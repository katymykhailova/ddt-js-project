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

pagination.refs.paginateContainer.addEventListener('click', onSearchPagination);
pagination.refs.prevPageBtn.addEventListener('click', onPrevPageBtnClick);
pagination.refs.nextPageBtn.addEventListener('click', onNextPageBtnClick);
window.addEventListener('resize', debounce(onWindowResize, 200));

function onWindowResize() {
  clientWidth = document.documentElement.clientWidth;
  pagination.length = clientWidth >= 768 ? 9 : 5;
  pagination.updatePageList();
}

function onPrevPageBtnClick(e) {
  e.preventDefault();
  moviesApiService.decrementPage();
  pagination.decrementPage();
  fetchMoviesPagination();
  pagination.updatePageList();
}

function onNextPageBtnClick(e) {
  e.preventDefault();
  moviesApiService.incrementPage();
  pagination.incrementPage();
  fetchMoviesPagination();
  pagination.updatePageList();
}

function onSearchPagination(e) {
  e.preventDefault();
  if (e.target.classList.contains('disabled')) {
    return;
  }

  moviesApiService.page = e.target.dataset.page;
  pagination.page = e.target.dataset.page;
  clearMoviesContainer();
  fetchMoviesPagination();
  pagination.updatePageList();
}

async function fetchMoviesPagination() {
  clearMoviesContainer();
  try {
    // loadMoreBtn.show();
    // loadMoreBtn.disable();
    const movies = await moviesApiService.fetchMoviesPagination();
    if (movies.length == 0) {
      // loadMoreBtn.hide();
      pagination.hide();
      // return info({
      //   text: 'No country has been found. Please enter a more specific query!',
      // });
    }
    appendMoviesMarkup(movies);
    if (pagination.page == pagination.maxPage) {
      // loadMoreBtn.hide();
    } else {
      // loadMoreBtn.enable();
    }
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

fetchPopularMovies();

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
