/* eslint-disable quotes */
'use strict'
//*SLIDERS
class SliderCarousel {
  constructor({
    main,
    wrap,
    next,
    prev,
    infinity = false,
    position = 0,
    slidesToShow = 3,
    responsive = [],
  }) {
    if (!main || !wrap) {
      console.warn('slider-carousel: need to add 2 selectors: main and wrap')
    }
    this.main = document.querySelector(main)
    this.wrap = document.querySelector(wrap)
    this.slides = document.querySelector(wrap).children
    this.next = document.querySelector(next)
    this.prev = document.querySelector(prev)
    this.slidesToShow = slidesToShow
    this.options = {
      infinity,
      position,
      widthSlide: Math.floor(100 / this.slidesToShow),
      maxPosition: this.slides.length - this.slidesToShow,
    }
    this.responsive = responsive
  }

  init() {
    this.addGloClass()
    this.addStyles()

    if (this.prev && this.next) {
      this.constrolSlider()
    } else {
      this.addArrows()
      this.constrolSlider()
    }

    if (this.responsive) {
      this.responsiveInit()
    }
  }

  addGloClass() {
    this.main.classList.add('glo-slider')
    this.wrap.classList.add('glo-slider__wrap')
    for (const el of this.slides) {
      el.classList.add('glo-slider__item')
    }
  }

  addStyles() {
    let style = document.getElementById('sliderCarousel-style')
    if (!style) {
      style = document.createElement('style')
      style.id = 'sliderCarousel-style'
    }

    style.textContent = `
      .glo-slider{
        overflow: hidden !important;
        
      }
      .glo-slider__wrap{
        
        display: flex !important;
        transition: transform 0.5s !important;
        will-change: transform !important;
      }
      .glo-slider__item{
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        flex: 0 0 ${this.options.widthSlide}% !important;
        margin: auto 0 !important;
      }
    `
    //overflow: hidden !important;
    document.head.appendChild(style)
  }

  constrolSlider() {
    this.prev.addEventListener('click', this.prevSlider.bind(this))
    this.next.addEventListener('click', this.nextSlider.bind(this))
  }

  prevSlider() {
    if (this.options.infinity || this.options.position > 0) {
      --this.options.position
      if (this.options.position < 0) {
        this.options.position = this.options.maxPosition
      }
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`
    }
  }

  nextSlider() {
    if (this.options.infinity || this.options.position < this.options.maxPosition) {
      ++this.options.position
      if (this.options.position > this.options.maxPosition) {
        this.options.position = 0
      }
      this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`
    }
  }

  addArrows() {
    this.prev = document.createElement('button')
    this.next = document.createElement('button')
    this.prev.className = 'glo-slider__prev'
    this.next.className = 'glo-slider__next'
    this.main.appendChild(this.prev)
    this.main.appendChild(this.next)

    const style = document.createElement('style')
    style.textContent = `
      .glo-slider__prev{
        margin: 0 10px;
        border: 20px solid transparent;
        background: transparent;
        border-right-color: #19b5fe
      }
      .glo-slider__next{
        margin: 0 10px;
        border: 20px solid transparent;
        background: transparent;
        border-left-color: #19b5fe
      }
      .glo-slider__prev:hover,
      .glo-slider__next:hover,
      .glo-slider__prev:focus,
      .glo-slider__next:focus{
        background: transparent;
        outline: transparent;
      }
    
    `
    document.head.appendChild(style)
  }

  responsiveInit() {
    const slidesToShowDefault = this.slidesToShow
    const allResponsiveBreakpoints = this.responsive.map(item => item.breakpoint)
    const maxResponsiveBreakpoint = Math.max(...allResponsiveBreakpoints)

    const checkResponsive = () => {
      const widthWindow = document.documentElement.clientWidth
      if (widthWindow < maxResponsiveBreakpoint) {
        for (let i = 0; i < allResponsiveBreakpoints.length; i++) {
          if (widthWindow < allResponsiveBreakpoints[i]) {
            this.slidesToShow = this.responsive[i].slidesToShow
            this.options.widthSlide = Math.floor(100 / this.slidesToShow)
            this.addStyles()
          }
        }
      } else {
        this.slidesToShow = slidesToShowDefault
        this.options.widthSlide = Math.floor(100 / this.slidesToShow)
        this.addStyles()
      }
    }

    checkResponsive()

    window.addEventListener('resize', checkResponsive)
  }
}

//* OPEN MODALS
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

//* LIGHTBOX FOR CERTS
const openLightbox = () => {

  const imagesContainer = document.getElementById('documents')
  const lightbox = document.getElementById('lightbox')
  const aHr = document.querySelector('a.sertificate-document').getAttribute('href')
  const elImg = document.createElement('img')
  elImg.setAttribute('src', aHr)
  elImg.style.height = '100%'
  lightbox.appendChild(elImg)

  const toggleCert = e => {
    e.preventDefault()

    const t = e.target

    const imageWrapper = t.closest('.image-wrapper')

    if (imageWrapper) {
      const image = imageWrapper.querySelector('img')
      if (image) {
        lightbox.innerHTML = `<div class="close-lightbox"></div>` + elImg.outerHTML
        lightbox.classList.add('show')
      }
    }

    //! LIGHTBOX CLOSE
    if (t.classList.contains('close-lightbox')) {
      lightbox.classList.remove('show')
    }
  }

  imagesContainer.addEventListener('click', toggleCert)
}

//*CALC
const calc = (price = 100) => {
  if (document.getElementById('calc-input')) {
    const calcBlock = document.getElementById('calc')
    const calcType = document.getElementById('calc-type')
    const calcTypeMaterial = document.getElementById('calc-type-material')
    const calcSquare = document.getElementById('calc-input')
    const totalValue = document.getElementById('calc-totalid')
    let calcRes

    const countSum = () => {
      let total = 0
      const typeValue = +calcType.options[calcType.selectedIndex].value
      const typeMaterialValue = +calcTypeMaterial.options[calcTypeMaterial.selectedIndex].value
      const squareValue = +calcSquare.value

      if (typeValue > 0 && typeMaterialValue > 0 && squareValue > 0) {
        total = price * typeValue * typeMaterialValue * squareValue
      }
      totalValue.value = total
      window.calcRes = total
    }

    calcBlock.addEventListener('change', e => {
      const target = e.target
      if (target.matches('select') || target.matches('input')) {
        countSum()
      }
    })
  }
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

//*VALIDATION CALC
const useValidateCalc = () => {
  if (document.getElementById('calc-input')) {

    const calcSquare = document.getElementById('calc-input')
    const numRegex = /\D/

    const validateCalc = e => {
      const target = e.target
      target.value = target.value.replace(numRegex, '')
    }
    calcSquare.addEventListener('input', validateCalc)
  }
}

//*VALIDATION FORMS
const useValidateForms = () => {
  const namesInputs = document.querySelectorAll('input[name="fio"]')
  const phonesInputs = document.querySelectorAll('input[name="phone"]')
  const buttons = document.querySelectorAll('button[type="submit"]')

  // const digitsRegex = /\D+/
  const cellRegex = /[^0-9+]/g
  const textRegex = /[^а-яa-z-' ё]/gi

  const btnEnable = () => {
    buttons.forEach(el => {
      el.removeAttribute('disabled')
    })
  }
  const btnDisable = () => {
    buttons.forEach(el => {
      el.setAttribute('disabled', true)
    })
  }

  const colorBorder = e => {
    if (e.target.value.trim() !== '') {
      e.target.style.border = '1px solid #00902a'
      btnEnable()
    } else if (!e.target.value) {
      e.target.style.border = '1px solid red'
      btnDisable()
    }
  }

  const validateCell = e => {
    if (e.target.value.length > 16) e.target.style.border = '1px solid red'
    e.target.value = e.target.value
      .replace(cellRegex, '')

    colorBorder(e)
  }

  const validateNames = e => {
    e.target.value = e.target.value
      .replace(textRegex, '')
    colorBorder(e)
  }

  namesInputs.forEach(el => {
    el.addEventListener('blur', () => { el.style.border = '1px solid #ccc' })
  })
  phonesInputs.forEach(el => {
    el.addEventListener('blur', () => { el.style.border = '1px solid #ccc' })
  })
  namesInputs.forEach(el => {
    el.addEventListener('input', validateNames)
  })
  phonesInputs.forEach(el => {
    el.addEventListener('input', validateCell)
  })
}

//*FORM SUBMIT
const sendForm = () => {
  const errorMessage = `it's broke`
  const successMessage = `Thanks, will get in touch soon!`
  const spinner = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto background: none display: block shape-rendering: auto" width="25px" height="25px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <g>
    <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="#fff" stroke-width="15"></path>
    <path d="M49 3L49 27L61 15L49 3" fill="#ffffff"></path>
    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.2987012987012987s" values="0 50 50360 50 50" keyTimes="01"></animateTransform>
  </g>
  </svg>`

  const forms = document.querySelectorAll('form')
  const statusMessage = document.createElement('div')
  const inputs = document.body.querySelectorAll('input')

  statusMessage.style.cssText = `
    text-align: center;
		font-size: 2rem;
		color: tomato;
	`

  const postData = body => {
    statusMessage.innerHTML = spinner
    return fetch("./server.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
  }

  function delay(ms) {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms)
    })
  }


  const formSend = currentForm => {

    currentForm.addEventListener('input', e => {
      const target = e.target
      e.preventDefault()

      currentForm.appendChild(statusMessage)

      const checkPhone = /[0-9]/
      const checkName = /[a-zа-яё]/gi

      const inputsPhone = currentForm.querySelector('input[name="phone"]')
      const inputsName = currentForm.querySelector('input[name="fio"]')
      const formBtn = document.querySelectorAll('button[type="submit"]')

      const btnEnable = () => {
        formBtn.forEach(el => {
          el.removeAttribute('disabled')
        })
      }
      const btnDisable = () => {
        formBtn.forEach(el => {
          el.setAttribute('disabled', true)
        })
      }

      if (target.contains(inputsName) && !checkName.test(inputsName.value)) {
        btnDisable()
        statusMessage.textContent = `только буквы`
        delay(5000).then(() => {
          statusMessage.innerHTML = ''
        })
        return
      } else {
        btnEnable()
        statusMessage.textContent = ''
      }

      if (target.contains(inputsPhone) && !inputsPhone.value.match(checkPhone) || inputsPhone.value.length > 16) {
        btnDisable()
        statusMessage.textContent = `only numbers allowed`
        delay(5000).then(() => {
          statusMessage.innerHTML = ''
        })
        return
      } else {
        btnEnable()
        statusMessage.textContent = ''
      }


    })

    currentForm.addEventListener('submit', e => {
      e.preventDefault()

      currentForm.appendChild(statusMessage)
      const formData = new FormData(currentForm)
      let body = {}

      formData.forEach((val, key) => {
        body[key] = val
      })
      if (window.calcRes > 0) body.calcTotal = window.calcRes



      postData(body)
        .then(res => {
          if (res.status !== 200) {
            throw new Error(`response status isn't 200!`)
          }
          return res
        })
        .then(
          statusMessage.innerHTML = spinner
        )
        .then(() => {
          statusMessage.textContent = successMessage

          body = {}
          inputs.forEach(el => {
            el.value = ''
          })
        })
        .catch(err => {
          statusMessage.textContent = errorMessage
          console.error(err)
        })

      delay(5000).then(() => {
        statusMessage.innerHTML = ''
      })
    })

  }
  forms.forEach(el => formSend(el))
}

//* CELL INPUT MASK
function maskPhone(selector, masked = '+7 (___) ___-__-__') {
  const elems = document.querySelectorAll(selector)

  function mask(event) {
    const keyCode = event.keyCode
    const template = masked,
      def = template.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "")
    let i = 0,
      newValue = template.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a
      })
    i = newValue.indexOf("_")
    if (i != -1) {
      newValue = newValue.slice(0, i)
    }
    let reg = template.substr(0, this.value.length).replace(/_+/g,
      function (a) {
        return "\\d{1," + a.length + "}"
      }).replace(/[+()]/g, "\\$&")
    reg = new RegExp("^" + reg + "$")
    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
      this.value = newValue
    }
    if (event.type == "blur" && this.value.length < 5) {
      this.value = ""
    }
  }

  for (const elem of elems) {
    elem.addEventListener("input", mask)
    elem.addEventListener("focus", mask)
    elem.addEventListener("blur", mask)
  }

}

// use

maskPhone('input[name="phone"]')

const options = {
  main: '.benefits-inner',
  wrap: '.benefits-wrap',
  next: '.benefits__arrow--right',
  prev: '.benefits__arrow--left',
  // maxWidth: 560,
  slidesToShow: 3,
  infinity: true,
  responsive: [
    {
      breakpoint: 576,
      slidesToShow: 1
    },
  ]
}
const carousel = new SliderCarousel(options)
carousel.init()

const servicesOptions = {
  main: '.servicesSlide--container',
  wrap: '.servicesSlide--wrap',
  next: '.services__arrow--right',
  prev: '.services__arrow--left',
  slidesToShow: 2,
  infinity: true,
  responsive: [
    {
      breakpoint: 576,
      slidesToShow: 1
    },
  ]
}
const carouselServices = new SliderCarousel(servicesOptions)
carouselServices.init()

// slider()
sendForm()
useValidateForms()
useValidateCalc()
calc()
scrollToTop()
countTimer()
openLightbox()
modals()

// export default scrollToTop
// export default openLightbox
// export default countTimer
// export default modals