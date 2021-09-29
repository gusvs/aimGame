const startBtn = document.querySelector('#start'),
  screens = document.querySelectorAll('.screen'),
  timeList = document.querySelector('#time-list'),
  timeEl = document.querySelector('#time'),
  board = document.querySelector('#board'),
  colors = [
    '#F08080',
    '#FF0000',
    '#00FA9A',
    '#00FF00',
    '#20B2AA',
    '#FF1493',
    '#1E90FF',
    '#DAA520',
  ]

let time = 0
let score = 0

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]

const startGame = () => {
  setInterval(decreaseTime, 1000)
  createRandonCircle()
  setTime(time)
}

const finishGame = () => {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
}

const decreaseTime = () => {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) current = `0${current}`
    setTime(current)
  }
}

const setTime = (value) => {
  timeEl.innerHTML = `00:${value}`
}

const createRandonCircle = () => {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 60)
  const { width, height } = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.background = getRandomColor()
  board.append(circle)
}

const getRandomNumber = (min, max) =>
  Math.round(Math.random() * (max - min) + min)

startBtn.addEventListener('click', (e) => {
  e.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (e) => {
  if (e.target.classList.contains('time-btn')) {
    time = parseInt(e.target.dataset.time)
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', (e) => {
  if (e.target.classList.contains('circle')) {
    score++
    e.target.remove()
    createRandonCircle()
  }
})
