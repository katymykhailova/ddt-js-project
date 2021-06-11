const STORAGE_KEY = {
  WATCHED: 'WATCHED',
  QUEUE: 'QUEUE',
};

const toWatch = JSON.parse(localStorage.getItem(`${STORAGE_KEY.WATCHED}`));
const toQueue = JSON.parse(localStorage.getItem(`${STORAGE_KEY.QUEUE}`));

const toWatchArray = toWatch !== null ? [...toWatch] : [];
const toQueueArray = toQueue !== null ? [...toQueue] : [];

function addToWatchInLocalStorage({ addedMovie, currentMovie }) {
  if (addedMovie) {
    // Сохраняет фильм в local storage при нажатии на кнопку "Add to watched"
    toWatchArray.push(currentMovie);
    localStorage.setItem(`${STORAGE_KEY.WATCHED}`, JSON.stringify(toWatchArray));
  } else {
    // Удаляет фильм из local storage при нажатии на кнопку "Remove from watched"
    const idArray = toWatchArray.map(movie => {
      if (!movie) {
        return;
      }
      return movie.id;
    });

    const index = idArray.indexOf(currentMovie.id);
    toWatchArray.splice(index, 1);
    localStorage.setItem(`${STORAGE_KEY.WATCHED}`, JSON.stringify(toWatchArray));
  }

  console.log('Добавлено в просмотренные');
}

function addToQuequeInLocalStorage({ addedMovie, currentMovie }) {
  if (addedMovie) {
    if (addedMovie) {
      // Сохраняет фильм в local storage при нажатии на кнопку "Queue"
      toQueueArray.push(currentMovie);
      localStorage.setItem(`${STORAGE_KEY.QUEUE}`, JSON.stringify(toQueueArray));
    } else {
      // Удаляет фильм из local storage при нажатии на кнопку "Remove from watched"
      const idArray = toQueueArray.map(movie => {
        if (!movie) {
          return;
        }
        return movie.id;
      });

      const index = idArray.indexOf(currentMovie.id);
      toQueueArray.splice(index, 1);
      localStorage.setItem(`${STORAGE_KEY.QUEUE}`, JSON.stringify(toQueueArray));
    }
    // Сохраняет фильм в local storage при нажатии на кнопку "Ad) {
    console.log('Добавлено в очередь');
  }
}

function getMovieWatchOfLocalStorage(currentMovie) {
  // Читаем текущий фильм
  // const currentMovie = JSON.parse(localStorage.getItem('movie'));
  // Сиздаем масси id из массива уже записанных в хранилище фильмов
  const idArr = toWatchArray.map(movie => {
    if (!movie) {
      return;
    }
    return movie.id;
  });

  if (idArr.includes(currentMovie.id)) {
    return true;
  } else {
    return false;
  }
}

function getMovieQueueOfLocalStorage(currentMovie) {
  // Читаем текущий фильм
  // const currentMovie = JSON.parse(localStorage.getItem('movie'));
  // Сиздаем масси id из массива уже записанных в хранилище фильмов
  const idArr = toQueueArray.map(movie => {
    if (!movie) {
      return;
    }
    return movie.id;
  });

  if (idArr.includes(currentMovie.id)) {
    return true;
  } else {
    return false;
  }
}

export {
  getMovieQueueOfLocalStorage,
  getMovieWatchOfLocalStorage,
  addToWatchInLocalStorage,
  addToQuequeInLocalStorage,
};
