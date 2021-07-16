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

export default countTimer