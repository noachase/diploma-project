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

export default useValidateForms