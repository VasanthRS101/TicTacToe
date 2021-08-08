const X_CLASS = 'x';
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
 const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
 const winningMessageElement = document.getElementById("winningMessage")
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById("restartButton")
let circleTurn;

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handelClick)
        cell.addEventListener("click",handelClick,{once:true})
    });
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handelClick(e) {
    const cell = e.target;
    const currentTarget = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell,currentTarget);
    if(checkWin(currentTarget)) {
      endGame(false)
    } else if(isDraw()) {
        endGame(true)
    } else{
    swapTurns();
    setBoardHoverClass()
}
}

function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerHTML = "Draw!"

    } else {
        winningMessageTextElement.innerHTML = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add("show")
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS)
    })
}
function placeMark(cell,currentTarget) {
    cell.classList.add(currentTarget)
}

swapTurns=()=> {
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
board.classList.remove(X_CLASS)
board.classList.remove(CIRCLE_CLASS)
if(circleTurn) {
    board.classList.add(CIRCLE_CLASS)
} else {
    board.classList.add(X_CLASS)
}
}

function checkWin(currentTarget) {
   return WINNING_COMBINATIONS.some(combination => {
       return combination.every(index => {
           return cellElements[index].classList.contains(currentTarget)
       })
   })
}