const refs = {
  libraryWatchedBtn: document.querySelector('.watched-js'),
  libraryQueueBtn: document.querySelector('.queue-js'),
};

refs.libraryWatchedBtn.addEventListener('click', libraryWatched);
refs.libraryQueueBtn.addEventListener('click', libraryQueue);

function libraryWatched(event) {
  event.preventDefault();

  refs.libraryWatchedBtn.classList.add('is-active');
  refs.libraryQueueBtn.classList.remove('is-active');
}

function libraryQueue(event) {
  event.preventDefault();

  refs.libraryQueueBtn.classList.add('is-active');
  refs.libraryWatchedBtn.classList.remove('is-active');
}
