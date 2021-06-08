import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import modalFilmTpl from '../../template/modal-film-card.hbs';
import MoviesApiService from '../apiService';
import getRefs from '../refs/get-refs';

const moviesApiService = new MoviesApiService();
const refs = getRefs();

refs.galleryListEl.addEventListener('click', onModalOpen);

async function fetchMovieDetails(e) {
  try {
    const movie = await moviesApiService.fetchMovieDetails();
    const movieMarkup = modalFilmTpl(movie);
    const modal = basicLightbox.create(movieMarkup);
    modal.show();
  } catch (error) {
    console.log(error);
  }
}

export default function onModalOpen(e) {
  e.preventDefault();

  const isFilmCardLiEl = e.target.parentNode.classList.contains('gallery-list__item');
  if (!isFilmCardLiEl) {
    return;
  }
  console.log(e.target);
  moviesApiService.id = e.target.parentNode.dataset.id;
  fetchMovieDetails();
}
