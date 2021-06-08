document.addEventListener('DOMContentLoaded', () => {
  let toTopBtn = document.querySelector('.uptop');

  window.onscroll = function () {
    if (window.pageYOffset > 500) {
      toTopBtn.classList.add('upview');
    } else {
      toTopBtn.classList.remove('upview');
    }
  };

  // плавный скролл наверх
  toTopBtn.addEventListener('click', function () {
    window.scrollBy({
      top: -document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  });
});
