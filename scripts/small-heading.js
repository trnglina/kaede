/* eslint-disable require-jsdoc */

(() => {
  const postCards = document.getElementsByClassName('post-card');

  function updateHeadings() {
    for (let i = 0; i < postCards.length; i++) {
      const testHeight = window.innerWidth < 768 ? 300 : 400;
      if (postCards[i].getElementsByTagName('h1')[0].clientHeight > testHeight) {
        postCards[i].classList.add('small-heading');
      }
    }
  }

  window.addEventListener('resize', () => updateHeadings());
  updateHeadings();
})();
