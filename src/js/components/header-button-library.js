import HandleButtonClick from './handle-button-click';

const headerBtnWatched = new HandleButtonClick({ selector: '.watched-js' });

headerBtnWatched.button.addEventListener('click', () => {
  if (headerBtnWatched.button.dataset.action === 'add') {
    return headerBtnWatched.goOut();
  }
  if (headerBtnWatched.button.dataset.action === 'remove') {
    return headerBtnWatched.comeIn();
  }
});

const headerBtnQueue = new HandleButtonClick({ selector: '.queue-js' });

headerBtnQueue.button.addEventListener('click', () => {
  if (headerBtnQueue.button.dataset.action === 'add') {
    return headerBtnQueue.goOut();
  }
  if (headerBtnQueue.button.dataset.action === 'remove') {
    return headerBtnQueue.comeIn();
  }
});
