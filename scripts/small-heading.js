/* eslint-disable require-jsdoc */

(() => {
  const postCards = document.getElementsByClassName('post-card');
  for (let i = 0; i < postCards.length; i++) {
    const heading = postCards[i].getElementsByTagName('h1')[0];
    if (heading.clientHeight > 400) {
      postCards[i].classList.add('small-heading');
    }
  }
})();
