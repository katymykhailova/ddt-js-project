import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import MoviesApiService from '../apiService';

const moviesApiService = new MoviesApiService();

function createTrailerLink(elementRef) {
  const trailerBtn = elementRef;

  trailerBtn.forEach(el =>
    el.addEventListener('click', e => {
      drawModalForTrailler(e.target.dataset.id);
    }),
  );

  async function drawModalForTrailler(id) {
    moviesApiService.id = id;
    try {
      const data = await moviesApiService.fetchTraillerMovie();
      const id = data.results[0].key;
      const instance = basicLightbox.create(`
    <iframe width="560" height="315" src='https://www.youtube.com/embed/${id}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `);
      instance.show();
      modalClBtTrailer(instance);
    } catch (error) {
      const instance = basicLightbox.create(`
      <iframe width="560" height="315" src='http://www.youtube.com/embed/zwBpUdZ0lrQ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `);

      instance.show();
      modalClBtTrailer(instance);
    }
  }

  function modalClBtTrailer(instance) {
    const modalBox = document.querySelector('.basicLightbox--iframe');
    modalBox.insertAdjacentHTML(
      'afterbegin',
      `<button
        type="button"
        class="lightbox__button"
        data-action="close-lightbox"
        ></button>
    `,
    );
    BodyOverflowHidden();
    const modalCloseBtn = document.querySelector('[data-action="close-lightbox"]');
    modalCloseBtn.addEventListener('click', () => {
      instance.close();
      BodyOverflowHidden();
    });
  }

  function BodyOverflowHidden() {
    document.body.classList.toggle('body-overflow--hidden');
  }
}

export default { createTrailerLink };
