import filmsCardSliderTpl from '../../template/slider-card.hbs';
import trailer from './trailer';

const sliderContainer = document.querySelector('.swiper-wrapper');
renderTrendy();

const swipe = new Swiper('.image-slider', {
   // навигация стрелками
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
   },
// курсор рука при перетаскивании
   grabCursor: true,
// прокрутка клава
   keyboard: {
      enabled: true,
   },
// прокрутка мышa
   mousewheel: {
      sensitivity: 1,
      eventsTarget: '.image-slider'
   },
// кол-во слайдов
   slidesPerView: 4,
// отступы между слайдами
   spaceBetween: 10,
// кол-во пролистываемых слайдов
   slidesPerGroup: 1,
// бесконечный слайд
   loop: true,
// свободный режим
   freeMode: true,
// автопрокрутка
   autoplay: {
      delay: 1500,
      disableOnInteractyon: false
   },
// скорость
   speed: 300,
// брейкпоинты 
   breakpoints: {
      768: {
         slidesPerView: 4
      },
      1024: {
         slidesPerView: 5
      }
   }
});

swipe.mount();

function renderTrendy() {
   const url = `https://api.themoviedb.org/3/trending/all/day?api_key=3bb7c750e6d9b2ae7509ab17b85a7611`;
   return fetch(url)
     .then(response => response.json())
     .then(({ results }) => {
       return results;
     })
     .then(renderSliderFilms)
     .catch(err => {
       sliderContainer.innerHTML = `<img class="catch-error-pagination" src="${erorrUrl}" />`;
     });
}

function renderSliderFilms(articles) {
   sliderContainer.innerHTML = filmsCardSliderTpl(articles);
   trailer.createTrailerLink(document.querySelectorAll('.btn-youtube-slider'));
}

