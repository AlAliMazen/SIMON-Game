let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    lastButton:"",
    turnInProgress:false,
    choices: ["button1", "button2", "button3", "button4"]
}

function newGame() {
    game.score = 0;
    game.playerMoves = [];
    game.currentGame = [];

    //add event listener
    for (let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                if (game.currentGame.length > 0 && !game.turnInProgress) {
                    let move = e.target.getAttribute("id");
                    game.lastButton=move;
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                }

            });
            circle.setAttribute("data-listener", "true");
        }
    }

    //call show score at the end of new game
    showScore();

    //call add turn function
    addTurn();
}

/**
 * addTurn function is used to clear playerMoves, 
 * choose random button and push it to the currentGame
 * 
 */
function addTurn() {
    //clear player moves
    game.playerMoves = [];
    //pushes a random button ID to the current game -> random between 0 and 3 
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    //call show turn 
    showTurns();
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");
    setTimeout(function () {
        document.getElementById(circ).classList.remove("light")
    }, 400);
}

function showTurns() {
    game.turnInProgress=true;
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress=false;
        }
    }, 800)
}


function playerTurn() {
    let index = game.playerMoves.length - 1;
    if (game.currentGame[index] === game.playerMoves[index]) {
        if (game.currentGame.length === game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        alert("Wrong move!");
        newGame();
    }
}
module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };