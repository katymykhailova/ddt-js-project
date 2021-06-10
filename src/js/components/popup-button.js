const STORAGE_KEY = {
  WATCHED: 'WATCHED',
  QUEUE: 'QUEUE',
};

const refs = {
  getBtnWatched: document.querySelector('.add-watched-js'),
  getBtnQueue: document.querySelector('.add-queue-js'),
};

refs.getBtnWatched.addEventListener('click', () => {
  checkButton(refs.getBtnWatched);
});

refs.getBtnQueue.addEventListener('click', () => {
  checkButton(refs.getBtnQueue);
});

function checkButton(event) {
  if (event.dataset.action === 'remove') {
    event.dataset.action = 'add';
    event.classList.add('--accent-button');
    return event;
  }
  event.dataset.action = 'remove';
  event.classList.remove('--accent-button');
}
