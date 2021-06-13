// REFS
import getRefs from '../refs/get-refs';
const refs = getRefs();
//
const colors = ['#d3b8ea', '#85aff2', '#f0d7d5', '#FF6B08', '#273275'];
let intervalId = null;

// MODAL
refs.openTeamModalBtn.addEventListener('click', onTeamModal);
refs.closeTeamModalBtn.addEventListener('click', onTeamModal);

// formula Random
const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// fn1 поиск случайного блока
const searchItem = function (items) {
  for (let item of items) {
    let index = randomIntegerFromInterval(0, items.length - 1);
    //randomItem
    const currentItem = items[index];
    return currentItem;
  }
};

// fn2 вешает класс
const activateItem = function (item, selector) {
 return item.classList.toggle(selector);
};

// fn 3 рандомное окрашивание
const paintCard = function (card, colors) {
  let ind = randomIntegerFromInterval(0, colors.length - 1);
  card.style.backgroundColor = colors[ind];
};

// fn3  перебирает и красит каждую карточку в рандомный цвет  1 раз
const colorizeModal = function (array, colors) {
  array.forEach(card => {
    paintCard(card, colors);
  });
};

// ==================MODAL-TEAM================ //
colorizeModal(refs.cardsArrRef, colors);
//         УСЛОВИЯ НЕ РАБОТАЮТ!!!!!             //
// const isTeamModalOpen = function () {
//   const isOpen = !refs.teamModal.classList.contains('visually-hidden');
  
//   if (isOpen) {
    intervalId = setInterval(() => {
      let activeCard = searchItem(refs.cardsArrRef);
      activateItem(activeCard, 'isActive');
      paintCard(activeCard, colors);
    }, 500);
        
    intervalId = setInterval(() => {
      let i = randomIntegerFromInterval(0, refs.cardsImages.length - 1);
      let activeImage = searchItem(refs.cardsImages);
      activeImage.classList.toggle('visually-hidden');
      activeImage.classList.toggle('animated');
    }, 3000);
//   }
  
//   else {
//     return;
//   }
// }
// isTeamModalOpen();

