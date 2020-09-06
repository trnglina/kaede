function getCSSVariable(key) {
  return getComputedStyle(document.documentElement).getPropertyValue(key).trim()
}

function updateInlineFootnotes() {
  const container = document.getElementsByClassName('footnotes')[0]
  if (container) {
    const bar = container.querySelector('hr')
    const notes = container.querySelectorAll('li')

    if (window.innerWidth > parseInt(getCSSVariable('--two-columns'))) {
      bar.style.display = 'none'

      const refs = document.getElementsByClassName('footnote-ref')
      for (let i = 0, acc = 0; i < notes.length; i++) {
        const note = notes[i]
        const offset = refs[i].parentElement.offsetTop + 1

        note.style.width = getCSSVariable('--col-right-width')
        note.style.position = 'absolute'
        note.style.right = 0
        note.style.margin = 0
        note.style.top = (offset > acc ? offset : acc) + 'px'

        if (i == 0) {
          acc += note.offsetTop
        }
        acc += note.clientHeight + parseInt(getCSSVariable('--article-block-margin'))
      }
    } else {
      bar.removeAttribute('style')

      for (let i = 0; i < notes.length; i++) {
        const note = notes[i]
        note.removeAttribute('style')
      }
    }
  }
}

window.addEventListener('resize', updateInlineFootnotes)
window.addEventListener('load', updateInlineFootnotes)
