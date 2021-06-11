const STORAGE_KEY = {
  WATCHED: 'WATCHED',
  QUEUE: 'QUEUE',
};

const toWatch = JSON.parse(localStorage.getItem(`${STORAGE_KEY.WATCHED}`));
const toQueue = JSON.parse(localStorage.getItem(`${STORAGE_KEY.QUEUE}`));

const toWatchArray = toWatch !== null ? [...toWatch] : [];
const toQueueArray = toQueue !== null ? [...toQueue] : [];

function addToWatchInLocalStorage() {
  // Читаем текущий фильм
  const addedMovie = JSON.parse(localStorage.getItem('movie'));
  // Сиздаем масси id из массива уже записанных в хранилище фильмов
  const idArr = toWatchArray.map(movie => {
    if (!movie) {
      return;
    }
    return movie.id;
  });

  if (idArr.includes(addedMovie.id)) {
    return;
  }

  toWatchArray.push(addedMovie);
  localStorage.setItem(`${STORAGE_KEY.WATCHED}`, JSON.stringify(toWatchArray));

  console.log('Добавлено в просмотренные');
}

function addToQuequeInLocalStorage() {
  console.log('Добавлено в очередь');
}

export { addToWatchInLocalStorage, addToQuequeInLocalStorage };
