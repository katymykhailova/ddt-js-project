import getRefs from './refs/get-refs';
import { fetchPopularMovies } from './fetchApiMovies';
import { fetchLibraryMovies } from './fetchLibraryMovies';
import { footerToBottom } from './components/footer';
import { renderTrendy } from './components/slider';

const refs = getRefs();
const hashes = new Map([
  ['#home', 'index'],
  ['#library', 'library'],
]);
const data = new Map([
  [
    'index',
    {
      url: 'index.html#home',
    },
  ],
  [
    'library',
    {
      url: 'index.html#library',
    },
  ],
]);

refs.navigator.addEventListener('click', loadPageContent);
window.addEventListener('popstate', updateContent);

const updatePage = id => {
  if (id === 'index') {
    loadHomepageContent();
  }
  if (id === 'library') {
    loadLibraryContent();
  }

  const entry = data.get(id);
  if (entry) {
    history.pushState(id, null, entry.url);
  }
};

function updateContent(e) {
  const character = e.state;
  if (!character) {
    updatePage('index');
  } else {
    updatePage(character);
  }
}

function loadPageContent(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'A' && e.target.parentNode.nodeName !== 'A') {
    return;
  }
  const data = e.target.dataset.page;
  updatePage(data);
}

function loadHomepageContent() {
  refs.headerEl.classList.remove('my-library');
  refs.libraryBtn.classList.remove('current');
  refs.homeBtn.classList.add('current');
  refs.form.classList.remove('visually-hidden');
  refs.buttonBox.classList.add('visually-hidden');
  refs.chooseLibraryList.classList.add('visually-hidden');
  refs.emptyLibraryList.classList.add('visually-hidden');
  refs.sliderEl.classList.remove('is-hidden');
  renderTrendy();
  fetchPopularMovies(); //рендерит в galleryListEl список популярных фильмов///
}

function loadLibraryContent() {
  refs.jsWarningEl.innerHTML = '';
  refs.headerEl.classList.add('my-library');
  refs.libraryBtn.classList.add('current');
  refs.homeBtn.classList.remove('current');
  refs.form.classList.add('visually-hidden');
  refs.buttonBox.classList.remove('visually-hidden');
  refs.sliderEl.classList.add('is-hidden');
  refs.inputEl.value = '';
  fetchLibraryMovies(); //рендерит в galleryListEl соответствующий список фильмов watch  или queue для библиотеки //
  footerToBottom();
}

(() => {
  const tabId = hashes.get(window.location.hash);
  if (tabId) {
    updatePage(tabId);
  } else {
    updatePage('index');
  }
})();
