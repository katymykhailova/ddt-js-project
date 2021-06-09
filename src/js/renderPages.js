
import getRefs from './refs/get-refs';
const refs = getRefs();

refs.logoBtn.addEventListener('click', loadHomepageContent);
refs.homeBtn.addEventListener('click', loadHomepageContent);
refs.libraryBtn.addEventListener('click', loadLibraryContent);


function loadHomepageContent(e) {
    preventDefault(e);
    refs.headerEl.classList.remove('.my-library');
    refs.libraryBtn.classList.remove('.current');
    refs.homeBtn.classList.add('.current')
    refs.form.classList.remove('.visually-hidden'); 
    refs.buttonBox.classList.add('.visually-hidden');
    //--Переиспользовать класс или через API.fetch получить результат
    // и зарендерить в galleryListEl список фильмов для главной страницы///
};

function loadLibraryContent (e)  {
    preventDefault(e);
    refs.headerEl.classList.add('.my-library');
    refs.libraryBtn.classList.add('.current');
    refs.homeBtn.classList.remove('.current')
    refs.form.classList.add('.visually-hidden'); 
    refs.buttonBox.classList.remove('.visually-hidden');
    //--зарендерить в galleryListEl соответствующий список фильмов watch  или queue для библиотеки //
}