// lodash
import debounce from 'lodash.debounce';

// modules
import Pagination from './pagination';
const pagination = new Pagination({ selector: '[data-action="pagination"]' });
let clientWidth = document.documentElement.clientWidth;
pagination.length = clientWidth >= 768 ? 9 : 5;

// refs
import getRefs from '../refs/get-refs';

// templates
import filmCard from '../../template/film-card.hbs';

// variables
const refs = getRefs();

window.addEventListener('resize', debounce(onWindowResize, 200));

function onWindowResize() {
  clientWidth = document.documentElement.clientWidth;
  pagination.length = clientWidth >= 768 ? 9 : 5;
  pagination.updatePageList();
}

const appendMoviesMarkup = function (movies) {
  refs.galleryListEl.insertAdjacentHTML('beforeend', filmCard(movies));
};

const clearMoviesContainer = function () {
  refs.galleryListEl.innerHTML = '';
};

const appendPaginationMarkup = function (totalPages) {
  pagination.maxPage = totalPages;
  pagination.updatePageList();
};

export { appendMoviesMarkup, clearMoviesContainer, appendPaginationMarkup, pagination };
