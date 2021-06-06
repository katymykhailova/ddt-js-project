// modules
import MoviesApiService from './apiService';
import Pagination from './components/pagination';

// refs
import getRefs from './refs/get-refs';

// variables
const moviesApiService = new MoviesApiService();
const pagination = new Pagination({ selector: '[data-action="pagination"]' });
const refs = getRefs();

// templates
import filmCard from '../template/film-card.hbs';

pagination.refs.paginateContainer.addEventListener('click', onSearchPagination);

function onSearchPagination(e) {
  e.preventDefault();
  if (e.target.classList.contains('disabled')) {
    return;
  }

  moviesApiService.currentPage = e.target.dataset.page;
  pagination.currentPage = e.target.dataset.page;
  clearMoviesContainer();
  fetchMoviesPagination();
  pagination.updatePageList();
}

async function fetchMoviesPagination() {
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
    if (pagination.currentPage == pagination.maxPage) {
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
