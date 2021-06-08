// import HandleButtonClick from './handle-button-click';
const refs = {
    libraryWatchedBtn: document.querySelector('.watched-js'),
    libraryQueueBtn: document.querySelector('.queue-js'),
};

// const headerBtnWatched = new HandleButtonClick({ selector: '.watched-js' });

// headerBtnWatched.button.addEventListener('click', () => {
//   if (headerBtnWatched.button.dataset.action === 'add') {
//     return headerBtnWatched.goOut();
//   }
//   if (headerBtnWatched.button.dataset.action === 'remove') {
//     return headerBtnWatched.comeIn();
//   }
// });

// const headerBtnQueue = new HandleButtonClick({ selector: '.queue-js' });

// headerBtnQueue.button.addEventListener('click', () => {
//   if (headerBtnQueue.button.dataset.action === 'add') {
//     return headerBtnQueue.goOut();
//   }
//   if (headerBtnQueue.button.dataset.action === 'remove') {
//     return headerBtnQueue.comeIn();
//   }
// });

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