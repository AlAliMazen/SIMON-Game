let game={
    score : 0,
    currentGame:[],
    playerMoves:[],
    choices:["button1","button2","button3","button4"]
}
function newGame(){
    game.score=0;
    game.playerMoves=[];
    game.currentGame=[];

    //call show score at the end of new game
    showScore();

    //call add turn function
    addTurn()
}

/**
 * addTurn function is used to clear playerMoves, 
 * choose random button and push it to the currentGame
 * 
 */
function addTurn(){
    //clear player moves
    game.playerMoves=[];
    //pushes a random button ID to the current game -> random between 0 and 3 
    game.currentGame.push(game.choices[(Math.floor(Math.random()*4))]);
    //call show turn 
    //showTurn();
}


function showScore(){
    document.getElementById("score").innerText=game.score;
}

module.exports={game,newGame,showScore,addTurn};