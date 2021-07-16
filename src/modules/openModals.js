const modals = () => {
  const popup = document.querySelector('.header-modal')
  const servicesModal = document.querySelector('.services-modal')
  const overlay = document.querySelector('.overlay')

  const closeModal = () => {
    popup.style.display = 'none'
    overlay.style.display = 'none'
  }

  const closeServicesModal = () => {
    servicesModal.style.display = 'none'
    overlay.style.display = 'none'
  }

  document.body.addEventListener('click', e => {
    let target = e.target

    if (target.classList.contains('servicesBtn')) {
      servicesModal.style.display = 'block'
    }

    if (target.classList.contains('fancyboxModal')) {
      popup.style.display = 'block'
      overlay.style.display = 'flex'
    }
    else {
      target = target.closest('.box-modal')
      if (!target) {
        closeModal()
        closeServicesModal()
      }
    }
  })
}

export default modals