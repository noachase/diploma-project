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

    if (t.classList.contains('close-lightbox') || t.classList.contains('lightbox')) {
      lightbox.classList.remove('show')
    }
  }

  imagesContainer.addEventListener('click', toggleCert)
}

export default openLightbox