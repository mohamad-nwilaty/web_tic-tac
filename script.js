const xClass = "x" ;
const oClass = "o" ;
let Xturn = true ;
let counter = 0 ;
const board = document.getElementById("board");
const cellElements = document.querySelectorAll('[data-cell]');
const restartScreen = document.getElementById("Game-over");
const restartButton = document.getElementById("restart");
const result = document.getElementById("result");
const WiningMoves = [
    [0,1,2] , [3,4,5] , [6,7,8],
    [0,3,6] , [1,4,7] , [2,5,8],
    [0,4,8] , [2,4,6]
]
restartButton.addEventListener('click' , (e)=>{
    restartScreen.style.display = "none";
    startGame();
})


startGame()

function startGame(){
    counter = 0

    cellElements.forEach(cell =>{
        cell.addEventListener('click' , handleClick , {once : true})
    });

    cellElements.forEach(cell  =>{
        cell.classList.remove(oClass);
        cell.classList.remove(xClass);
    })
    if(Xturn){
        boardPreview(oClass);
    }
    else{
        boardPreview(xClass);
    }
}


function handleClick(e){
    const cell = e.target;
    const currentTurn = Xturn ? xClass : oClass ;
    placeMark(cell , currentTurn);
    boardPreview(currentTurn) 
    swapTurns();
    counter ++ ;
    if(checkWining(currentTurn)){
        result.innerHTML = `${currentTurn} has won`;
        restartScreen.style.display = "flex" ;
    }
    else if(counter === 9){
        result.innerHTML = "Draw";
        restartScreen.style.display = "flex" ;
    }
    
    
}

function placeMark(cell , currentTurn){
    cell.classList.add(currentTurn);
}
function swapTurns(){
    Xturn = !Xturn ;
}

function boardPreview(turn){
    board.classList.remove(xClass);
    board.classList.remove(oClass);
    if(turn === xClass){
        board.classList.add(oClass);
    }
    else{
        board.classList.add(xClass);
    }
}
function checkWining(currentTurn){
    return WiningMoves.some(move =>{
        return move.every(index =>{
            return cellElements[index].classList.contains(currentTurn) ;
        })
    })
}