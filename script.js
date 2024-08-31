const xClass = "x" ;
const oClass = "o" ;
let Xturn = true ;
let counter = 0 ;
const board = document.getElementById("board");



startGame()

function startGame(){
    counter = 0

    const cellElements = document.querySelectorAll('[data-cell]');
        cellElements.forEach(cell =>{
            cell.addEventListener('click' , handleClick , {once : true})
    });

    cellElements.forEach(cell  =>{
        cell.classList.remove(oClass);
        cell.classList.remove(xClass);
    })
    boardPreview(oClass);
}


function handleClick(e){
    const cell = e.target;
    const currentTurn = Xturn ? xClass : oClass ;
    placeMark(cell , currentTurn);

    boardPreview(currentTurn) 
    swapTurns();
    counter ++ ;
    
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