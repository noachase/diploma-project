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

export default useValidateCalc