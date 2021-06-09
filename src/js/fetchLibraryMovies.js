// refs
import getRefs from './refs/get-refs';

import {
  appendMoviesMarkup,
  clearMoviesContainer,
  appendPaginationMarkup,
  pagination,
} from './components/appendMovies';

export async function fetchLibraryMovies() {
  clearMoviesContainer();
  pagination.hide();
  // pagination.show();
  // appendMoviesMarkup(movies);
  // appendPaginationMarkup(totalPages);
}
