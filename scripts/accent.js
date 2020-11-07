(() => {
  const cards = document.getElementsByClassName('list-view-card')

  const setAccent = (e) => {
    const active = e.target.closest('.list-view-card')
    active.style.color = '#fff'

    document.body.style.backgroundColor = active.dataset.accentBg
    document.body.style.color = active.dataset.accentFg

    const links = document.getElementsByTagName('a')
    for (let i = 0; i < links.length; i++) {
      links[i].style.textShadow = 'rgba(0, 0, 0, 0.6) 0 0 6px'
      if (links[i].closest('.list-view-card') == active) {
        links[i].style.color = '#fff'
      } else {
        links[i].style.color = active.dataset.accentFg
      }
    }
  }

  const clearAccent = (e) => {
    const active = e.target.closest('.list-view-card')
    active.style.color = ''

    document.body.style.backgroundColor = ''
    document.body.style.color = ''

    const links = document.getElementsByTagName('a')
    for (let i = 0; i < links.length; i++) {
      links[i].style.textShadow = ''
      links[i].style.color = ''
    }
  }

  document.body.style.transition = 'background-color 0.3s cubic-bezier(0.65, 0, 0.35, 1)'

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('mouseover', setAccent)
    cards[i].addEventListener('mouseleave', clearAccent)
  }
})()
