// REFS
import { modalTeamRefs } from '../refs/get-refs';

//  палитра
const colors = [
  '#ffffff',
  '#85aff2',
  '#f0d7d5',
  '#FF6B08',
  '#273275'
];

//constants
let intervalId = null;
const ISACTIVE = 'isActive';

// formula Random
const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// MODAL
  modalTeamRefs.openTeamModalBtn.addEventListener('click', toggleModal);
  modalTeamRefs.closeTeamModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    modalTeamRefs.teamModal.classList.toggle('visually-hidden');
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

let activeItem = searchItem(modalTeamRefs.itemsRef);

// fn2 вешает класс
const animateItem = function (item) {
  if (item.classList.contains(ISACTIVE)) {
    return item.classList.remove(ISACTIVE);
  }
  else {
    return item.classList.add(ISACTIVE);
  }
};

// fn 3 запускает вечный двигатель
intervalId = setInterval(() => {
  // выбирает рандомный блок и анимирует
  activeItem = searchItem(modalTeamRefs.itemsRef);
  animateItem(activeItem);
  // красит     
  let ind = randomIntegerFromInterval(0, colors.length - 1);
  activeItem.style.backgroundColor = colors[ind];
}
  , 1000);
        
  
    