const cellElements = document.querySelectorAll('[data-cell]')
let circleTurn
const xClass = 'x'
const cClass = 'circle'
const board = document.getElementById('board')
const restartButton = document.getElementById('restartBtn')
const wintext = document.querySelector('[data-winning-text]')
const winMsg = document.getElementById('winningMessage')
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
StartGame()
restartButton.addEventListener('click',StartGame)
function StartGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(xClass)
        cell.classList.remove(cClass)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click',handleClick,{ once:true })
    })
    setBoardHoverClass()
    winMsg.classList.remove('show')
}
function endGame(draw){
    if(draw){
        wintext.innerText = 'Draw!'
    }
    else {
        wintext.innerText = `${circleTurn? "O" : "X"} Wins!`
    }
    winMsg.classList.add('show')
}


function isDraw() {
    return [...cellElements].every(cell => {
        return (cell.classList.contains(xClass) || cell.classList.contains(cClass))
    })
}
function handleClick(e) {
    const cell = e.target
    const currentTurn = circleTurn? cClass:xClass
    //Place Mark
    placeMark(cell, currentTurn)
    //Check For Win
    if(checkWin(currentTurn)){
        endGame(false)
    }
    //Check For Draw
    else if(isDraw()){
        endGame(true)
    }
    //Switch Turn
    else{
    swapTurn()
    setBoardHoverClass()
    }
}

function placeMark(cell, currentTurn){
    cell.classList.add(currentTurn)
}

function swapTurn() {
    circleTurn = !circleTurn
}
function setBoardHoverClass() {
    board.classList.remove(xClass)
    board.classList.remove(cClass)
    if(circleTurn){
        board.classList.add(cClass)
    }
    else{
        board.classList.add(xClass)
    }

}

function checkWin(currentTurn) {
   return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentTurn)
        })
   })
}

