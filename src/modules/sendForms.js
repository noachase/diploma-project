const sendForm = () => {
  const errorMessage = `it's broke`
  const successMessage = `Спасибо! Данные отправлены!`

  const forms = document.querySelectorAll('form')
  const statusMessage = document.createElement('div')
  const inputs = document.body.querySelectorAll('input')



  statusMessage.style.cssText = `
    text-align: center;
		font-size: 2rem;
		color: tomato;
	`

  const postData = body => {
    return fetch("./server.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
  }

  const delay = ms => {
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

      if (target.contains(inputsPhone) && !inputsPhone.value.match(checkPhone) || target.contains(inputsPhone) && inputsPhone.value.length < 12) {
        btnDisable()
        statusMessage.textContent = `введите номер полностью`
        delay(5000).then(() => {
          statusMessage.innerHTML = ''
        })
        return
      }

    })

    const closeModal = currentForm => {
      const overlays = document.querySelectorAll('.overlay')
      const headerModal = document.querySelectorAll('.header-modal')
      const servicesModal = document.querySelectorAll('.services-modal')

      if (currentForm.parentElement.parentElement.classList.contains('box-modal')) {
        overlays.forEach(el => el.style.display = 'none')
        servicesModal.forEach(el => el.style.display = 'none')
        headerModal.forEach(el => el.style.display = 'none')
      }
    }

    currentForm.addEventListener('submit', e => {
      e.preventDefault()
      const currentFormBtn = currentForm.querySelector('button[type="submit"]')
      const btnText = currentFormBtn.textContent
      const formData = new FormData(currentForm)
      let body = {}

      const spinner = `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="25px" height="25px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <g>
        <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="#ffffff" stroke-width="15"></path>
        <path d="M49 3L49 27L61 15L49 3" fill="#ffffff"></path>
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.2987012987012987s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
      </g>
      </svg>`

      currentFormBtn.innerHTML = spinner

      currentForm.appendChild(statusMessage)

      formData.forEach((val, key) => {
        body[key] = val
      })

      if (window.calcRes > 0) body.calcTotal = window.calcRes //savind calcTotal from calculator result to send with form submit

      postData(body)
        .then(res => {
          if (res.status !== 200) {
            throw new Error(`response status isn't 200!`)
          }
          return res
        })
        .then(() => {
          statusMessage.textContent = successMessage
          currentFormBtn.innerHTML = btnText
          setTimeout(() => {
            statusMessage.innerHTML = ''
            setTimeout(closeModal, 1000, currentForm)
          }, 4000)
        })
        .then(inputs.forEach(el => el.value = ''))
        .catch(err => {
          statusMessage.textContent = errorMessage
          console.error(err)
        })
    })
  }
  forms.forEach(el => formSend(el))
}

export default sendForm
