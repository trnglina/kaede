(() => {
  const getVar = (key) => {
    return getComputedStyle(document.documentElement).getPropertyValue(key).trim()
  }

  const updateFootnotes = () => {
    const container = document.getElementsByClassName('footnotes')[0]
    if (container) {
      const bar = container.querySelector('hr')
      const notes = container.querySelectorAll('li')

      if (window.innerWidth > parseInt(getVar('--lt--two-columns'))) {
        bar.style.display = 'none'

        const refs = document.getElementsByClassName('footnote-ref')
        for (let i = 0, acc = 0; i < notes.length; i++) {
          const note = notes[i]
          const offset = refs[i].parentElement.offsetTop + 1

          note.style.width = getVar('--lt--col-right')
          note.style.position = 'absolute'
          note.style.right = 0
          note.style.margin = 0
          note.style.top = (offset > acc ? offset : acc) + 'px'

          if (i == 0) {
            acc += note.offsetTop
          }
          acc += note.clientHeight + parseInt(getVar('--ty--block-margin'))
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

  window.addEventListener('resize', updateFootnotes)
  window.addEventListener('load', updateFootnotes)
})()
