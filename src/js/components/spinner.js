import 'spin.js/spin.css';
import { Spinner } from 'spin.js';

const spinnerOpts = {
  lines: 14,
  length: 10,
  width: 30,
  radius: 65,
  scale: 1,
  corners: 1,
  speed: 1.3,
  rotate: 0,
  animation: 'spinner-line-shrink',
  direction: 1,
  color: '#ff6b08',
  fadeColor: 'transparent',
  top: '50%',
  left: '50%',
  shadow: '0 0 1px transparent',
  zIndex: 2000000000,
  className: 'spinner',
  position: 'absolute',
};

let target = document.getElementById('foo');
let ligtboxSpinner = new Spinner(spinnerOpts).spin(target);

const modalSpinner = document.querySelector('[data-modal-spinner]');

export function spinnerModal(value = 'start') {
  if (value === 'start') {
    modalSpinner.classList.remove('is-hidden');
  } else if (value === 'stop') {
    setTimeout(() => {
      modalSpinner.classList.add('is-hidden');
    }, 1000);
  }
}

export function addSpinnerForModalWindow() {
  const spinnerForModalWindowEl = document.querySelector('.movie-wrap');

  const spinnerForModalWindow = new Spinner({ ...spinnerOpts, scale: 0.7 }).spin(
    spinnerForModalWindowEl,
  );

  setTimeout(() => {
    spinnerForModalWindow.stop();
  }, 1000);
}
