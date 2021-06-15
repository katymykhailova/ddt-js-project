new Swiper('.image-slider', {
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
// прокрутка мышей
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