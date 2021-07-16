const scrollToTop = () => {
  const toTopBtn = document.querySelector('.smooth-scroll')

  const scroll = () => {
    window.scroll({ top: 0, left: 0 })
  }

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 350) {
      toTopBtn.classList.add('active')
      toTopBtn.style.cursor = 'pointer'
    } else {
      toTopBtn.classList.remove('active')
    }
  })

  toTopBtn.addEventListener('click', scroll)
}

export default scrollToTop