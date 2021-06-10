import modalFilmTpl from '../../template/modal-film-card.hbs';
import MoviesApiService from '../apiService';
import getRefs from '../refs/get-refs';

const moviesApiService = new MoviesApiService();
const refs = getRefs();

refs.galleryListEl.addEventListener('click', onModalOpen);
// refs.modalCloseBtn.addEventListener('click', onModalClose);

async function fetchMovieDetails() {
  try {
    const movie = await moviesApiService.fetchMovieDetails();
    const movieMarkup = modalFilmTpl(movie);
    modalMovieRender(movieMarkup);
  } catch (error) {
    console.log(error);
  }
}

const modalMovieRender = markup => {
  refs.movieBackdrop.insertAdjacentHTML('beforeend', markup);
};

const modalClear = () => {
  refs.movieBackdrop.innerHTML = '';
};

export default function onModalOpen(e) {
  e.preventDefault();

  window.addEventListener('keydown', onModalClose);

  const isFilmCardLiEl = e.target.parentNode.classList.contains('gallery-list__item');
  if (!isFilmCardLiEl) {
    return;
  }
  moviesApiService.id = e.target.parentNode.dataset.id;
  fetchMovieDetails();
  refs.movieBackdrop.classList.remove('is-hidden');
}

function onModalClose(e) {
  if (
    e.target.dataset.action !== 'modal-close' &&
    !e.target.classList.contains('movie-backdrop') &&
    e.code !== 'Escape'
  ) {
    return;
  }

  refs.movieBackdrop.classList.add('is-hidden');

  window.removeEventListener('keydown', onModalClose);

  modalClear();
}
