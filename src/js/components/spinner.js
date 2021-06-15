import 'spin.js/spin.css';
import { Spinner } from 'spin.js';

const spinnerOpts = {
  lines: 14, // The number of lines to draw
  length: 10, // The length of each line
  width: 30, // The line thickness
  radius: 65, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1.3, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-shrink', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#ff6b08', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

export function stopSpinner() {
  spinner.stop();
}

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

// export function addSpinnerForModalWindow() {
//   const spinnerForModalWindowEl = document.querySelector('.movie-wrap');
//   console.log(spinnerForModalWindowEl);

//   const spinnerForModalWindow = new Spinner({ ...spinnerOpts, scale: 0.7 }).spin(
//     spinnerForModalWindowEl,
//   );

//   spinnerForModalWindowEl.childNodes[2].addEventListener('load', stopSpinner);

//   function stopSpinner() {
//     spinnerForModalWindow.stop();
//   }
// }
