(() => {
  /* IE9+ shim, source: MDN */
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      let el = this

      do {
        if (Element.prototype.matches.call(el, s)) return el
        el = el.parentElement || el.parentNode
      } while (el !== null && el.nodeType === 1)
      return null
    }
  }

  const getVar = (key) => {
    return getComputedStyle(document.documentElement).getPropertyValue(key).trim()
  }

  const cards = document.getElementsByClassName('list-view-card')
  const disableSize = parseInt(getVar('--lt--one-column'))

  const setAccent = (e) => {
    if (window.innerWidth > disableSize) {
      const active = e.target.closest('.list-view-card')
      active.style.color = '#fff'
      active.style.textShadow = 'rgba(0, 0, 0, 0.8) 0 0 6px'

      document.body.style.backgroundColor = active.dataset.accentBg
      document.body.style.color = active.dataset.accentFg

      const links = document.getElementsByTagName('a')
      for (let i = 0; i < links.length; i++) {
        if (links[i].closest('.list-view-card') == active) {
          links[i].style.color = '#fff'
        } else {
          links[i].style.color = active.dataset.accentFg
        }
      }
    }
  }

  const clearAccent = (e) => {
    const active = e.target.closest('.list-view-card')
    active.style.color = ''
    active.style.textShadow = ''

    document.body.style.backgroundColor = ''
    document.body.style.color = ''

    const links = document.getElementsByTagName('a')
    for (let i = 0; i < links.length; i++) {
      links[i].style.color = ''
    }
  }

  document.body.style.transition = 'background-color 0.3s cubic-bezier(0.65, 0, 0.35, 1)'

  for (let i = 0; i < cards.length; i++) {
    if (cards[i].dataset.accentBg) {
      cards[i].addEventListener('mouseover', setAccent)
      cards[i].addEventListener('mouseleave', clearAccent)
    }
  }
})()
