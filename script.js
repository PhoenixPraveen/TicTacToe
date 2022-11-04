const huPlayer = 'O';
const aiPlayer = 'X';
let count = 0;
let currPlayer = aiPlayer;
let origBoard;
let xPlayed = "X"
let oPlayed = "O"
const winCombos = [
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [6,4,2]
]
document.getElementById("restart").addEventListener('click',startGame)

const cells = document.querySelectorAll(".child")
startGame();

function startGame(){
    origBoard = Array.from(Array(9).keys())
    count = 0 
    for(let i=0;i<cells.length;i++){
        cells[i].innerHTML = ''
        cells[i].addEventListener('click', turnClick)
        cells[i].style = "none"
    }
}

function turnClick(cell){
    count++
    turn(cell.target.id, currPlayer);
}

function turn(cellId, player){
    console.log(player);
    (player == huPlayer) ? oPlayed.concat(cellId) : xPlayed.concat(cellId);
    cells[cellId].removeEventListener('click', turnClick);
    origBoard[cellId] = player;
    document.getElementById(cellId).innerHTML = player;
    let gameWon = checkWin(origBoard, player);
    if (gameWon) gameOver(gameWon);
}

function checkWin(origBoard, player){
    let plays = origBoard.reduce((a, e, i)=>(e === player) ? a.concat(i) : a,[]); 
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if(win.every(elem => plays.indexOf(elem) > -1)){
            gameWon = {index : index, player : player}
            break
        }
    };
    (currPlayer == aiPlayer) ? currPlayer = huPlayer : currPlayer = aiPlayer;
    document.getElementById("turn").innerHTML = `${currPlayer}'s Turn`;
    return gameWon
}

function gameOver(gameWon){
    let indices = winCombos[gameWon.index]
    indices.forEach(element => {
        document.getElementById(element.toString()).style.backgroundColor = "red"
    });
    cells.forEach(element => {
        element.removeEventListener('click', turnClick)
    });
}