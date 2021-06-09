import HandleButtonClick from './handle-button-click';

const DATA_SET = {
  ADD: 'add',
  REMOVE: 'remove',
};

const CLICK = {
  WATCHED: new HandleButtonClick({
    selector: '.add-watched-js',
  }),
  QUEUE: new HandleButtonClick({
    selector: '.add-queue-js',
  }),
};

CLICK.WATCHED.button.addEventListener('click', () => {
  return CLICK.WATCHED.button.dataset.action === DATA_SET.ADD
    ? CLICK.WATCHED.add()
    : CLICK.WATCHED.remove();
});

CLICK.QUEUE.button.addEventListener('click', () => {
  return CLICK.WATCHED.button.dataset.action === DATA_SET.ADD
    ? CLICK.QUEUE.add()
    : CLICK.QUEUE.remove();
});
