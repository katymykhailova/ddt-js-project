// import Swiper JS
import Swiper from 'swiper/bundle';
// import Swiper styles
import 'swiper/swiper-bundle.css';

import filmsCardSliderTpl from '../../template/slider-card.hbs';
import trailer from './trailer';
import noposter from '../../images/no-poster.png';

import MoviesApiService from '../apiService';

const sliderContainer = document.querySelector('.swiper-wrapper');
const erorrUrl = '';
const moviesApiService = new MoviesApiService();
renderTrendy();

const swipe = new Swiper('.image-slider', {
  // навигация стрелками
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
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
    eventsTarget: '.image-slider',
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
    disableOnInteractyon: false,
  },
  autoHeight: true,
  // скорость
  speed: 300,
  // брейкпоинты
  breakpoints: {
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 5,
    },
  },
});

const swiperEl = document.querySelector('.swiper-container').swiper;

export async function renderTrendy() {
  try {
    const movies = await moviesApiService.fetchTrendingMovies();
    renderSliderFilms(movies);
  } catch (err) {
    sliderContainer.innerHTML = `<img class="catch-error-pagination" src="${noposter}" />`;
  }
}

function renderSliderFilms(articles) {
  sliderContainer.innerHTML = filmsCardSliderTpl(articles);
  swiperEl.update();
  trailer.createTrailerLink(document.querySelectorAll('.btn-youtube-slider'));
}
