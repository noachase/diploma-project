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

export default calc