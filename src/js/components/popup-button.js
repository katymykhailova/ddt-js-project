import HandleButtonClick from './handle-button-click';

const addToQueue = new HandleButtonClick({
  selector: '.to-watched-js',
});

addToQueue.button.addEventListener('click', () => {
  if (addToQueue.button.dataset.action === 'add') {
    return addToQueue.add();
  }
  if (addToQueue.button.dataset.action === 'remove') {
    return addToQueue.remove();
  }
});

const addToWatch = new HandleButtonClick({ selector: '.to-queue-js' });

addToWatch.button.addEventListener('click', () => {
  if (addToWatch.button.dataset.action === 'add') {
    return addToWatch.add();
  }
  if (addToWatch.button.dataset.action === 'remove') {
    return addToWatch.remove();
  }
});
