

import getRefs from '../refs/get-refs';
const refs = getRefs();
//colors
const colors = ['#d3b8ea', '#85aff2', '#f0d7d5', '#FF6B08', '#273275'];
let paintCardInterval = null;
let animateCardInterval = null;

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
const paintCard = function (card, colorsArr) {
  let ind = randomIntegerFromInterval(0, colorsArr.length - 1);
  card.style.backgroundColor = colorsArr[ind];
};

// fn3  перебирает и красит каждую карточку в рандомный цвет  1 раз
const colorizeModal = function (array, colorsArr) {
  array.forEach(card => {
    paintCard(card, colorsArr);
  });
};

// ==================MODAL-TEAM================ //
const teamModalAnimations = function () {
  colorizeModal(refs.cardsArrRef, colors);

    paintCardInterval = setInterval(() => {
      let activeCard = searchItem(refs.cardsArrRef);
      activateItem(activeCard, 'isActive');
      paintCard(activeCard, colors);
    }, 500);
        
    animateCardInterval = setInterval(() => {
      let i = randomIntegerFromInterval(0, refs.cardsImages.length - 1);
      let activeImage = searchItem(refs.cardsImages);
      activeImage.classList.remove('is-hidden');
      activeImage.classList.toggle('animated');
    }, 1000);
}

const teamModalOpen = function() {
  refs.teamBackdrop.classList.remove('is-hidden');
  refs.teamBackdrop.addEventListener('click',closingBackdropClick)
  teamModalAnimations();
  window.addEventListener('keydown', onEscapePress);
  
}

const teamModalClose = function() {
  refs.teamBackdrop.classList.add('is-hidden');
  clearInterval(paintCardInterval);
  clearInterval(animateCardInterval);
  window.removeEventListener('keydown', onEscapePress);
  refs.teamBackdrop.removeEventListener('click',teamModalClose)
}
const closingBackdropClick = function (e) {
  if (e.target.classList.contains('backdrop'))
    teamModalClose();
  
}

const onEscapePress = function (e) {
  if (e.code === 'Escape') {
    teamModalClose();
  }
  else {
    return;
  }
}
refs.openTeamModalBtn.addEventListener('click', teamModalOpen);
refs.closeTeamModalBtn.addEventListener('click', teamModalClose);




