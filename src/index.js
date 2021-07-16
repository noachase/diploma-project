import maskPhone from './modules/maskCell'
import sendForm from './modules/sendForms'
import useValidateForms from './modules/useValidateForms'
import useValidateCalc from './modules/validateCalc'
import calc from './modules/calc'
import scrollToTop from './modules/scrollUp'
import countTimer from './modules/timer'
import openLightbox from './modules/openLightbox'
import SliderCarousel from './modules/sliders'


calc()
openLightbox()
useValidateCalc()
countTimer()
scrollToTop()
useValidateForms()
maskPhone('input[name="phone"]', '+7 (___) ___-__-__')
sendForm()

const options = {
  main: '.benefits-inner',
  wrap: '.benefits-wrap',
  next: '.benefits__arrow--right',
  prev: '.benefits__arrow--left',
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
