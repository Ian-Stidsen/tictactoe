const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


const cellElement = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winMessage = document.querySelector('[data-winner-text]')
const endScreen = document.getElementById('endScreen')
const restartButton = document.getElementById('restartButton')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElement.forEach(cell => {
    // loops through all the cells and removes X or O's
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  endScreen.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurn()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winMessage.innerText = 'Draw!'
  } else {
    winMessage.innerText = `${circleTurn ? 'O' : 'X'} Wins!`
  }
  endScreen.classList.add('show')
}

function isDraw() {
  //restructure cellElement into an array so i can use '.every' method.
  return [...cellElement].every(cell =>{
    return cell.classList.contains(X_CLASS) ||
    cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurn() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  // checks who's turn it is and adds the hover effect
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  // loops through all the combinations and checks if the board matches
  // one of the winning combinations.
  return winCombinations.some(combination =>{
    return combination.every(index =>{
      return cellElement[index].classList.contains(currentClass)
    })
  })
}
