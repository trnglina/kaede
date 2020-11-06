(function () {
  const figures = document.getElementsByTagName('figure')
  if (figures.length == 0) {
    document.getElementsByTagName('main')[0].classList.add('no-figures')
  }
})()
