const STORAGE_KEY = {
  WATCHED: 'WATCHED',
  QUEUE: 'QUEUE',
};

let toWatchArray = JSON.parse(localStorage.getItem(STORAGE_KEY.WATCHED)) || [];
let toQueueArray = JSON.parse(localStorage.getItem(STORAGE_KEY.QUEUE)) || [];

function addToWatchInLocalStorage({ addedMovie, currentMovie }) {
  if (addedMovie) {
    // Сохраняет фильм в local storage при нажатии на кнопку "Add to watched"
    toWatchArray.push(currentMovie);
    localStorage.setItem(`${STORAGE_KEY.WATCHED}`, JSON.stringify(toWatchArray));
  } else {
    toWatchArray = toWatchArray.filter(({ id }) => id !== currentMovie.id);
    localStorage.setItem(`${STORAGE_KEY.WATCHED}`, JSON.stringify(toWatchArray));
  }
}

function addToQuequeInLocalStorage({ addedQuequeMovie, currentMovie }) {
  if (addedQuequeMovie) {
    // Сохраняет фильм в local storage при нажатии на кнопку "Queue"
    toQueueArray.push(currentMovie);
    localStorage.setItem(`${STORAGE_KEY.QUEUE}`, JSON.stringify(toQueueArray));
  } else {
    toQueueArray = toQueueArray.filter(({ id }) => id !== currentMovie.id);
    localStorage.setItem(`${STORAGE_KEY.QUEUE}`, JSON.stringify(toQueueArray));
  }
}

function getMovieWatchOfLocalStorage(currentMovie) {
  return toWatchArray.some(({ id }) => id === currentMovie.id);
}

function getMovieQueueOfLocalStorage(currentMovie) {
  return toQueueArray.some(({ id }) => id === currentMovie.id);
}

export {
  getMovieQueueOfLocalStorage,
  getMovieWatchOfLocalStorage,
  addToWatchInLocalStorage,
  addToQuequeInLocalStorage,
};
