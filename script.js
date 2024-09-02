const xClass = "x" ;
const oClass = "o" ;
let Xturn = false ;
let counter = 0 ;
let modeSingleplayer = false ;
const board = document.getElementById("board");
const cellElements = document.querySelectorAll('[data-cell]');
const restartScreen = document.getElementById("Game-over");
const restartButton = document.getElementById("restart");
const  aiButton = document.getElementById("single-player");
const result = document.getElementById("result");
const WiningMoves = [
    [0,1,2] , [3,4,5] , [6,7,8],
    [0,3,6] , [1,4,7] , [2,5,8],
    [0,4,8] , [2,4,6]
] ;
let availibleMoves = [0,1,2,3,4,5,6,7,8] ;
let value = { x: 1, o: -1, tie: 0 };
restartButton.addEventListener('click' , (e)=>{
    restartScreen.style.display = "none";
    modeSingleplayer = false ;
    twoPlayer();
})
aiButton.addEventListener('click' , (e)=>{
    restartScreen.style.display = "none";
    modeSingleplayer = true ;
    singlePlayer()
})


function twoPlayer(){
    Xturn = false ;
    counter = 0
    let availibleMoves = [0,1,2,3,4,5,6,7,8] ;
    cellElements.forEach(cell =>{
        cell.addEventListener('click' , handleClick , {once : true})
    });

    cellElements.forEach(cell  =>{
        cell.classList.remove(oClass);
        cell.classList.remove(xClass);
    })

    boardPreview(xClass);
}

function singlePlayer() { 
    Xturn = false;  
    counter = 0;
    availibleMoves = [0,1,2,3,4,5,6,7,8];
    boardPreview(xClass);
    
    // Reset the board and add event listeners
    cellElements.forEach(cell => {
        cell.classList.remove(oClass);
        cell.classList.remove(xClass);
        cell.addEventListener('click', handleClick, { once: true });
    });

    // If it's AI's turn, make the first move
    if (Xturn) { // if you want the ai to play first set xturn to true
        setTimeout(bestMove, 400); 
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
    else if(modeSingleplayer && Xturn){ 
        setTimeout(bestMove , 400) ; //set a delay to make it more relastic
    }
}

function placeMark(cell , currentTurn){
    cell.classList.add(currentTurn);
    const cellIndex = Number(cell.id);
    availibleMoves = availibleMoves.filter(index => index !== Number( cell.id) );

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


function bestMove() {
    let bestScore = -Infinity; // AI wants to maximize score
    let move;

    availibleMoves.forEach(index => {
        // Simulate the AI's move
        cellElements[index].classList.add(xClass);

        // Make a copy of available moves and remove the current move
        let newAvailableMoves = availibleMoves.filter(i => i !== index);

        // Recursively calculate the score for this move
        let score = minimax(0, false, newAvailableMoves);

        // Undo the move
        cellElements[index].classList.remove(xClass);

        // Determine the best move
        if (score > bestScore) {
            bestScore = score;
            move = index;
        }
    });

    if (move !== undefined) {
        cellElements[move].click(); // Execute the best move
    }
}
// this algorithim made me cry
function minimax(depth, isMaximizing, availableMoves) {
    let result = state(); // Check for a terminal state
    if (result !== null) {
        return result; // Return the score for terminal states
    }

    if (availableMoves.length === 0) { // Ensure no moves are available
        return 0; // Tie or no moves to make, return a neutral score
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        availableMoves.forEach(index => {
            // Simulate AI's move
            cellElements[index].classList.add(xClass);

            // Create a new copy of the available moves without the current move
            let newAvailableMoves = availableMoves.filter(i => i !== index);

            // Recursively evaluate the state
            let score = minimax(depth + 1, false, newAvailableMoves);

            // Undo the move
            cellElements[index].classList.remove(xClass);

            bestScore = Math.max(score, bestScore); // Maximize the score
        });
        return bestScore;

    } else {
        let bestScore = Infinity;
        availableMoves.forEach(index => {
            // Simulate player's move
            cellElements[index].classList.add(oClass);

            // Create a new copy of the available moves without the current move
            let newAvailableMoves = availableMoves.filter(i => i !== index);

            // Recursively evaluate the state
            let score = minimax(depth + 1, true, newAvailableMoves);

            // Undo the move
            cellElements[index].classList.remove(oClass);

            bestScore = Math.min(score, bestScore); // Minimize the score
        });
        return bestScore;
    }
}

function state() {
    if (checkWining(xClass)) {
        return 1;
    } else if (checkWining(oClass)) {
        return -1;
    } else if (availibleMoves.length === 0) {
        return 0;
    }
    return null;
}
