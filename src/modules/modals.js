'use strict'

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
      console.log('modal', target.classList)
      servicesModal.style.display = 'block'
    }

    if (target.classList.contains('fancyboxModal')) {
      popup.style.display = 'block'
      overlay.style.display = 'flex'
    }
    else {
      console.log('asadnan')
      target = target.closest('.box-modal')
      if (!target) {
        closeModal()
        closeServicesModal()
      }
    }
  })
}

//* LIGHTBOX FOR CERTS
const openLightbox = () => {
  const certs = document.querySelectorAll('.sertificate-document')
  const cert = document.querySelector('.sertificate-document')
  const certsParent = document.getElementById('documents')
  console.log(certsParent)

  const imagesContainer = document.getElementById('documents')
  const lightbox = document.getElementById('lightbox')

  // Show lightbox 
  imagesContainer.addEventListener('click', e => {
    e.preventDefault()
    const imageWrapper = e.target.closest('.image-wrapper')
    if (imageWrapper) {
      const image = imageWrapper.querySelector('img')
      const imageSrc = imageWrapper.querySelector('img').getAttribute('src')

      const aHref = imageWrapper.querySelector('a').getAttribute('href')
      image.setAttribute('src', aHref)
      console.log("🚀 ~ file: modals.js ~ line 61 ~ openLightbox ~ aHref", aHref)
      if (image) {
        lightbox.innerHTML = '<div class="close-lightbox"></div>' + image.outerHTML
        lightbox.classList.add('show')
      }
    }
  })

  // Hide Lightbox
  lightbox.addEventListener('click', e => {
    // const imageWrapper = e.target.closest('.image-wrapper')
    // const imageSrc = imageWrapper.querySelector('img').getAttribute('src')
    // image.setAttribute('src', imageSrc)
    console.log(e.target)
    if (e.target.classList.contains('close-lightbox')) {
      lightbox.classList.remove('show')
      // e.target.setAttribute('src', imageSrc)
    }
    // if (!e.target.hasAttribute('src')) {
    //   lightbox.classList.remove('show')
    // }
  })

  // Loading...
  // setTimeout(() =>
  //   imagesContainer.classList.remove('loading')
  //   , 1500)
}

//* TIMER
const countTimer = (deadline = '26 december 2021') => {
  const timerDays = document.querySelectorAll('.count_1 span')
  const timerHours = document.querySelectorAll('.count_2 span')
  const timerMinutes = document.querySelectorAll('.count_3 span')
  const timerSeconds = document.querySelectorAll('.count_4 span')

  const getTimeRamaining = () => {
    const dateStop = new Date(deadline).getTime()
    const dateNow = new Date().getTime()
    const timeRemaining = (dateStop - dateNow) / 1000

    const seconds = Math.floor(timeRemaining % 60)
    const minutes = Math.floor(timeRemaining / 60) % 60
    const hours = Math.floor(timeRemaining / 60 / 60) % 24
    const days = Math.floor(timeRemaining / 60 / 60 / 24)

    return {
      days,
      hours,
      minutes,
      seconds,
      timeRemaining
    }
  }

  const updateClock = () => {
    const timer = getTimeRamaining()

    timerDays.forEach(el => {
      el.textContent = timer.days
      if (timer.days < 10) {
        el.textContent = '0' + timer.days
      }
    })
    timerHours.forEach(el => {
      el.textContent = timer.hours
      if (timer.hours < 10) {
        el.textContent = '0' + timer.hours
      }
    })
    timerMinutes.forEach(el => {
      el.textContent = timer.minutes
      if (timer.minutes < 10) {
        el.textContent = '0' + timer.minutes
      }
    })
    timerSeconds.forEach(el => {
      el.textContent = timer.seconds
      if (timer.seconds < 10) {
        el.textContent = '0' + timer.seconds
      }
    })
  }

  if (getTimeRamaining().timeRemaining > 0) {
    updateClock()
    setInterval(updateClock, 1000)
  } else if (getTimeRamaining().timeRemaining < 0) {
    const zeros = '00'
    timerDays.forEach(el => {
      el.textContent = zeros
    })
    timerHours.forEach(el => {
      el.textContent = zeros
    })
    timerMinutes.forEach(el => {
      el.textContent = zeros
    })
    timerSeconds.forEach(el => {
      el.textContent = zeros
    })
  }
}

//* SMOOTH SCROLL
const scrollToTop = () => {
  const toTopBtn = document.querySelector('.smooth-scroll')

  const scroll = () => {
    window.scroll({ top: 0, left: 0 })
  }

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 350) {
      toTopBtn.classList.add('active')
    } else {
      toTopBtn.classList.remove('active')
    }
  })

  toTopBtn.addEventListener('click', scroll)
}



scrollToTop()
countTimer()
openLightbox()
modals()

// export default scrollToTop
// export default openLightbox
// export default countTimer
// export default modals