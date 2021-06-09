// MODAL
  const refs = {
    openTeamModalBtn : document.querySelector('[data-modal-open]'),
    closeTeamModalBtn: document.querySelector('[data-modal-close]'),
    teamModal: document.querySelector('[data-modal]'),
  };

  refs.openTeamModalBtn.addEventListener('click', toggleModal);
  refs.closeTeamModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.teamModal.classList.toggle('visually-hidden');
};
      

//  палитра
const colors = [
  '#ffffff',
  '#85aff2',
  '#f0d7d5',
  '#FF6B08',
  '#273275'
];

// refs & constants
const itemsRef = document.querySelectorAll('.team-list__item');
let intervalId = null;
const ISACTIVE = 'isActive';

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

let activeItem = searchItem(itemsRef);

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
  activeItem = searchItem(itemsRef);
  animateItem(activeItem);
  // красит     
  let ind = randomIntegerFromInterval(0, colors.length - 1);
  activeItem.style.backgroundColor = colors[ind];
}
  , 1000);
        
  
    