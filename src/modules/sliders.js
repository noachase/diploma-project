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

export default SliderCarousel