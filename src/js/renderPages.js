
import getRefs from './refs/get-refs';
const refs = getRefs();

refs.navigator.addEventListener('click', loadPageContent)
function loadPageContent(e) {
    if (e.target.nodeName !== 'A') {
    return;
    }
    if (e.target.dataset.page === "home") {
    e.preventDefault();
    loadHomepageContent();
    }
    if (e.target.dataset.page === "library") {
    e.preventDefault();
    loadLibraryContent();
    }
 }

function loadHomepageContent() {
    changeClassHeaderComponent();
    //--Переиспользовать класс или через API.fetch получить результат
    // и зарендерить в galleryListEl список фильмов для главной страницы///
};

function loadLibraryContent()  {
    changeClassHeaderComponent();
    //--зарендерить в galleryListEl соответствующий список фильмов watch  или queue для библиотеки //
}

function changeClassHeaderComponent() {
    refs.jsWarningEl.innerHTML = '';
    refs.headerEl.classList.toggle('my-library');
    refs.libraryBtn.classList.toggle('current');
    refs.homeBtn.classList.toggle('current')
    refs.form.classList.toggle('visually-hidden'); 
    refs.buttonBox.classList.toggle('visually-hidden');
}