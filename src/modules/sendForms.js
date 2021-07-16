const sendForm = () => {
  const errorMessage = `it's broke`
  const successMessage = `Thanks, will get in touch soon!`

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

      if (target.contains(inputsPhone) && !inputsPhone.value.match(checkPhone) || target.contains(inputsPhone) && inputsPhone.value.length < 12) {
        btnDisable()
        statusMessage.textContent = `введите номер полностью`
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
        // .then(
        //   statusMessage.innerHTML = spinner
        // )
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

export default sendForm