(() => {
  const getVar = (key) => {
    return getComputedStyle(document.documentElement).getPropertyValue(key).trim()
  }

  const header = document.getElementsByClassName('article-header')[0]
  const main = document.getElementsByClassName('article-main')[0]
  const fg = header.dataset.accentFg
  const bg = header.dataset.accentBg

  if (fg || bg) {
    header.style.color = fg
    header.style.textShadow = 'rgba(0, 0, 0, 0.5) 0 0 4px'
    const headerLinks = header.getElementsByTagName('a')
    for (let i = 0; i < headerLinks.length; i++) {
      headerLinks[i].style.color = fg
    }

    const breadcrumb = document.getElementsByClassName('breadcrumb')[0]
    breadcrumb.style.color = fg
    const breadcrumbLinks = breadcrumb.getElementsByTagName('a')
    for (let i = 0; i < breadcrumbLinks.length; i++) {
      breadcrumbLinks[i].style.color = fg
    }

    const accentHeader = document.createElement('div')
    accentHeader.setAttribute('aria-hidden', 'true')
    accentHeader.style.position = 'absolute'
    accentHeader.style.top = '0'
    accentHeader.style.left = '0'
    accentHeader.style.right = '0'
    accentHeader.style.height = `${main.offsetTop - parseInt(getVar('--lt--base-padding'))}px`
    accentHeader.style.background = bg
    accentHeader.style.zIndex = -100

    const stylesheet = document.createElement('style')
    stylesheet.innerHTML = `body ::selection { background-color: ${bg}; color: ${fg}; }`

    document.body.appendChild(accentHeader)
    document.body.appendChild(stylesheet)
  }
})()
