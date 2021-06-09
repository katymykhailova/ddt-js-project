import getRefs from './refs/get-refs';
import { fetchPopularMovies } from './fetchApiMovies';
import { fetchLibraryMovies } from './fetchLibraryMovies';

const refs = getRefs();

refs.navigator.addEventListener('click', loadPageContent);
window.addEventListener('popstate', updateContent);

function updateContent(e) {
  const character = e.state;
  if (character === 'index') {
    loadHomepageContent();
  } else if (character === 'library') {
    loadLibraryContent();
  }
}

function loadPageContent(e) {
  if (e.target.nodeName !== 'A' && e.target.parentNode.nodeName !== 'A') {
    return;
  }
  const data = e.target.dataset.page;
  const url = data + '.html';

  if (e.target.dataset.page === 'index') {
    e.preventDefault();
    loadHomepageContent();
  }
  if (e.target.dataset.page === 'library') {
    e.preventDefault();
    history.pushState(data, null, url);
    loadLibraryContent();
  }
  history.pushState(data, null, url);
}

function loadHomepageContent() {
  refs.headerEl.classList.remove('my-library');
  refs.libraryBtn.classList.remove('current');
  refs.homeBtn.classList.add('current');
  refs.form.classList.remove('visually-hidden');
  refs.buttonBox.classList.add('visually-hidden');
  fetchPopularMovies();
}

function loadLibraryContent() {
  refs.headerEl.classList.add('my-library');
  refs.libraryBtn.classList.add('current');
  refs.homeBtn.classList.remove('current');
  refs.form.classList.add('visually-hidden');
  refs.buttonBox.classList.remove('visually-hidden');
  fetchLibraryMovies();
  //--зарендерить в galleryListEl соответствующий список фильмов watch  или queue для библиотеки //
}
