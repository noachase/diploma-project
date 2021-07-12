const modals = () => {

  console.log('modals')
  const popup = document.querySelector('.header-modal')
  const overlay = document.querySelector('.overlay')
  let count = 0
  let movePopUp
  let width = document.documentElement.clientWidth

  const move = () => {
    movePopUp = requestAnimationFrame(move)
    count += 10
    count++
    if (count < 200) {
      popup.firstElementChild.style.top = count + 'px'
    } else {
      cancelAnimationFrame(movePopUp)
    }
  }

  const resetAnim = () => {
    count = 0
    popup.firstElementChild.style.top = -350 + 'px'
    popup.style.display = 'none'
    overlay.style.display = 'none'
  }

  document.body.addEventListener('click', event => {
    let target = event.target
    console.log("🚀 ~ file: modals.js ~ line 28 ~ modals ~ target", target)
    width = document.documentElement.clientWidth

    if (target.classList.contains('fancyboxModal')) {
      console.log('asd')
      popup.style.display = 'block'
      overlay.style.display = 'flex'
      if (width > 768) {
        movePopUp = requestAnimationFrame(move)
      } else if (width < 768) {
        cancelAnimationFrame(movePopUp)
        popup.firstElementChild.style.top = 200 + 'px'
      }
    } else if (target.classList.contains('.header-modal__close')) {
      resetAnim()
    } else {
      target = target.closest('.popup-content')
      if (!target) {
        resetAnim()
      }
    }
  })
}

export default modals