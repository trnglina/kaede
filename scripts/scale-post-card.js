/* eslint-disable require-jsdoc */

(() => {
  const postCards = document.getElementsByClassName('post-card');
  for (let i = 0; i < postCards.length; i++) {
    const heading = postCards[i].getElementsByTagName('h1')[0];
    const testSize = 500 / (Math.log10(heading.innerText.length));
    if (testSize < 200) {
      testSize = 200;
    } else if (testSize > 400) {
      testSize = 400;
    }
    heading.style.fontSize = `${testSize}%`;
  }
})();
