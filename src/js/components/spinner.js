// /**
//  * This function manage spinner, takes on values: start or stop
//  * @param {string} value
//  */
// export const spinner = function (value) {
//   const spinner = {
//     spinnerRef: document.querySelector('[data-index="spinner"]'),

//     markup: `<div class="loading">Loading</div>
//       <div class="spinner-row">
//         <div class="arrow up outer outer-18"></div>
//         <div class="arrow down outer outer-17"></div>
//         <div class="arrow up outer outer-16"></div>
//         <div class="arrow down outer outer-15"></div>
//         <div class="arrow up outer outer-14"></div>
//       </div>
//       <div class="spinner-row">
//         <div class="arrow up outer outer-1"></div>
//         <div class="arrow down outer outer-2"></div>
//         <div class="arrow up inner inner-6"></div>
//         <div class="arrow down inner inner-5"></div>
//         <div class="arrow up inner inner-4"></div>
//         <div class="arrow down outer outer-13"></div>
//         <div class="arrow up outer outer-12"></div>
//       </div>
//       <div class="spinner-row">
//         <div class="arrow down outer outer-3"></div>
//         <div class="arrow up outer outer-4"></div>
//         <div class="arrow down inner inner-1"></div>
//         <div class="arrow up inner inner-2"></div>
//         <div class="arrow down inner inner-3"></div>
//         <div class="arrow up outer outer-11"></div>
//         <div class="arrow down outer outer-10"></div>
//       </div>
//       <div class="spinner-row">
//         <div class="arrow down outer outer-5"></div>
//         <div class="arrow up outer outer-6"></div>
//         <div class="arrow down outer outer-7"></div>
//         <div class="arrow up outer outer-8"></div>
//         <div class="arrow down outer outer-9"></div>
//       </div>`,

//     show() {
//       this.spinnerRef.innerHTML = '';
//       this.spinnerRef.insertAdjacentHTML('beforeend', this.markup);
//     },

//     hide() {
//       this.spinnerRef.innerHTML = '';
//     },
//   };
//   if (value === 'start') {
//     spinner.show();
//   } else if (value === 'stop') {
//     setTimeout(() => {
//       spinner.hide();
//     }, 1000);
//   }
// };

import 'spin.js/spin.css';
import { Spinner } from 'spin.js';

const lightboxSpinnerOpts = {
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

export const previewSpinnerOpts = {
  lines: 14, // The number of lines to draw
  length: 10, // The length of each line
  width: 12, // The line thickness
  radius: 30, // The radius of the inner circle
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

// export const ligtboxSpinner = new Spinner(lightboxSpinnerOpts);

let target = document.getElementById('foo');
let ligtboxSpinner = new Spinner(previewSpinnerOpts).spin(target);

const modalSpinner = document.querySelector('[data-modal-spinner]');

function spinnerModal(value = 'start') {
  if (value === 'start') {
    modalSpinner.classList.remove('is-hidden');
  } else if (value === 'stop') {
    setTimeout(() => {
      modalSpinner.classList.add('is-hidden');
    }, 1000);
  }
  // modalSpinner.classList.toggle('is-hidden');
}
export default spinnerModal;
