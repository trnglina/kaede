(function () {
  const figures = document.getElementsByTagName('figure')
  const footnotes = document.getElementsByClassName('footnotes')
  if (figures.length == 0 && footnotes.length == 0) {
    document.getElementsByTagName('main')[0].classList.add('no-figures')
  }
})()
