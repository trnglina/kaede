(() => {
  const body = document.getElementsByTagName('body')[0];

  const button = (function () {
    const template = document.createElement('div');
    template.innerHTML = `
      <button class="dark-mode-button" aria-hidden="true" tabindex="-1">
        <svg enable-background="new 0 0 20 20" version="1.1" viewBox="0 0 20 20" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
          <path class="vector-path" d="m11 0c0.7 1.2 1 2.5 1 4 0 4.4-3.6 8-8 8-1.4 0-2.8-0.4-4-1 0.5 5.1 4.7 9 10 9 5.5 0 10-4.5 10-10 0-5.2-4-9.5-9-10z"/>
        </svg>
        <svg enable-background="new 0 0 20 20" version="1.1" viewBox="0 0 20 20" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
          <circle class="vector-path" cx="10" cy="10" r="7.5"/>
          <path class="vector-path" d="m10 5c-0.6 0-1-0.4-1-1v-3c0-0.6 0.4-1 1-1s1 0.4 1 1v3c0 0.6-0.4 1-1 1z"/>
          <path class="vector-path" d="m10 20c-0.6 0-1-0.4-1-1v-3c0-0.6 0.4-1 1-1s1 0.4 1 1v3c0 0.6-0.4 1-1 1z"/>
          <path class="vector-path" d="m15 10c0-0.6 0.4-1 1-1h3c0.6 0 1 0.4 1 1s-0.4 1-1 1h-3c-0.6 0-1-0.4-1-1z"/>
          <path class="vector-path" d="m0 10c0-0.6 0.4-1 1-1h3c0.6 0 1 0.4 1 1s-0.4 1-1 1h-3c-0.6 0-1-0.4-1-1z"/>
          <path class="vector-path" d="m13.5 6.5c-0.4-0.4-0.4-1 0-1.4l2.1-2.1c0.4-0.4 1-0.4 1.4 0s0.4 1 0 1.4l-2.1 2.1c-0.3 0.4-1 0.4-1.4 0z"/>
          <path class="vector-path" d="m2.9 17.1c-0.4-0.4-0.4-1 0-1.4l2.1-2.1c0.4-0.4 1-0.4 1.4 0s0.4 1 0 1.4l-2.1 2.1c-0.3 0.4-1 0.4-1.4 0z"/>
          <path class="vector-path" d="m6.5 6.5c-0.4 0.4-1 0.4-1.4 0l-2.2-2.2c-0.4-0.4-0.4-1 0-1.4s1-0.4 1.4 0l2.1 2.1c0.5 0.4 0.5 1.1 0.1 1.5z"/>
          <path class="vector-path" d="m17.1 17.1c-0.4 0.4-1 0.4-1.4 0l-2.1-2.1c-0.4-0.4-0.4-1 0-1.4s1-0.4 1.4 0l2.1 2.1c0.4 0.3 0.4 1 0 1.4z"/>
        </svg>
      </button>
      `.trim();
    return template.firstChild;
  })();

  function isDarkMode() {
    return body.classList.contains('dark');
  }

  function toggleDarkMode() {
    if (isDarkMode()) {
      body.classList.remove('dark');
      localStorage.setItem('dark-mode', false);
    } else {
      body.classList.add('dark');
      localStorage.setItem('dark-mode', true);
    }
  }

  function setState(button, isDark) {
    if (isDark) {
      button.children[0].style.display = 'none';
      button.children[1].style.display = 'inline-block';
    } else {
      button.children[0].style.display = 'inline-block';
      button.children[1].style.display = 'none';
    }
  }

  body.addEventListener('keydown', ({ ctrlKey, altKey, keyCode }) => {
    if (ctrlKey && altKey && keyCode == 68) {
      toggleDarkMode();
      setState(button, isDarkMode());
    }
  });

  button.addEventListener('click', () => {
    toggleDarkMode();
    setState(button, isDarkMode());
  });

  if (localStorage.getItem('dark-mode') == 'true') {
    body.classList.add('dark');
  }
  setState(button, isDarkMode());
  document.getElementsByClassName('navigation')[0].appendChild(button);
})();
