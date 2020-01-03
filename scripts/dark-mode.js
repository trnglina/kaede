(() => {
  const body = document.getElementsByTagName('body')[0];

  body.isDarkMode = function() {
    return this.classList.contains('dark');
  };

  body.toggleDarkMode = function() {
    if (this.isDarkMode()) {
      this.classList.remove('dark');
      localStorage.setItem('dark-mode', false);
    } else {
      this.classList.add('dark');
      localStorage.setItem('dark-mode', true);
    }
  };

  body.addEventListener('keydown', ({ctrlKey, altKey, keyCode}) => {
    if (ctrlKey && altKey && keyCode == 68) {
      body.toggleDarkMode();
      button.setState(body.isDarkMode());
    }
  });

  const button = (function(lightIcon, darkIcon) {
    const button = (() => {
      const template = document.createElement('div');
      template.innerHTML = `
        <button class="dark-mode-button" aria-hidden="true" tabindex="-1">
          <img src="${lightIcon}">
          <img src="${darkIcon}">
        </button>
        `.trim();
      return template.firstChild;
    })();

    button.setState = function(dark) {
      if (dark) {
        this.children[0].style.display = 'none';
        this.children[1].style.display = 'inline-block';
      } else {
        this.children[0].style.display = 'inline-block';
        this.children[1].style.display = 'none';
      }
    };

    button.onclick = () => {
      body.toggleDarkMode();
      button.setState(body.isDarkMode());
    };

    return button;
  })('/images/icons/moon.svg', '/images/icons/sun.svg');

  if (localStorage.getItem('dark-mode') == 'true') {
    body.classList.add('dark');
  }

  button.setState(body.isDarkMode());
  document.getElementsByClassName('navigation')[0].appendChild(button);
})();
