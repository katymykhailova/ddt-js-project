// modules
import MoviesApiService from './apiService';
import Pagination from './components/pagination';

// refs
import getRefs from './refs/get-refs';

// variables
const moviesApiService = new MoviesApiService();
const refs = getRefs();

// templates
import filmCard from '../template/film-card.hbs';

async function fetchPopularMovies() {
  try {
    const movies = await moviesApiService.fetchPopularMovies();

    if (movies.length == 0) {
      // return info({
      //   text: 'No country has been found. Please enter a more specific query!',
      // });
    }
    // pagination.show();
    appendMoviesMarkup(movies);
    // appendPaginationMarkup();
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
