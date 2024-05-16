/**
 * @jest-environment jsdom
 */

const {game,newGame,showScore,addTurn,lightsOn, showTurns, playerTurn}=require("../game");


//we can let Jest check if there is an alert was issued by using the spy 
jest.spyOn(window,"alert").mockImplementation(()=>{});

beforeAll(()=>{
    let fs=require("fs");
    let fileContents=fs.readFileSync("../../index.html","utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game object contains correct keys",()=>{
    test("score key exist",()=>{
        expect("score" in game).toBe(true);
    });
    
    test("currentGame key exist",()=>{
        expect("currentGame" in game).toBe(true);
    });
    
    test("playerMoves key exist",()=>{
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exist",()=>{
        expect("choices" in game).toBe(true);
    });
    test("choices contain correct ids",()=>{
        expect(game.choices).toEqual(["button1","button2","button3","button4"]);
    });
    // we need to add the new turn key here to check it 
    test("turnNumber key exists",()=>{
        expect("turnNumber" in game).toBe(true);
    });
    test("lastButton key exist",()=>{
        expect("lastButton" in game).toBe(true);
    });
    test("turnInProgress key exists",()=>{
        expect("turnInProgress" in game).toBe(true);
    });
    test("turnInProgress key value is false",()=>{
        expect("turnInProgress" in game).toBe(true);
    });
});

/**
 * checking the newGame function 
 */

describe("newGame works correctly",()=>{
    beforeAll(()=>{
        /**
         * beforeAll is used to see that when calling newGame 
         * function all data of the current game will be wiped out
         * 
         */
        game.score=42;
        game.currentGame=["button1","button2"];
        game.playerMoves=["button3","button4"];

        //function showScore 
        document.getElementById("score").innerText="42";
        newGame();
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    /**
     * either check the length of the array or 
     * when it is empty
     */
    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    /*
    test("should clean current choices",()=>{
        expect(game.currentGame.length).toBe(0);
    });*/
    
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("should add one move to the computer's game array", () => {
        expect(game.currentGame.length).toBe(1);
    });

    //listener handling for touch events
    test("expect data-listener to be true", ()=>{
        const elements=document.getElementsByClassName("circle");
        for(let element of elements){
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    })


});

describe("Gameplay works correctly",()=>{
    //runs before each game round
    beforeEach(()=>{
        game.score=0;
        game.playerMoves=[];
        game.currentGame=[];
        addTurn();
    });
    //after each game round
    afterEach(()=>{
        game.score=0;
        game.playerMoves=[];
        game.currentGame=[];
    });
    test("addTurn add a new turn to the game",()=>{
        addTurn();
        expect(game.currentGame.length).toEqual(2);
    });
    /**
     * check if the light class is called on the circles to light up
     */
    test("Should add correct class to light up the buttons",()=>{
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });

    test("ShowTurn should update game.turnNumber",()=>{
        game.turnNumber=42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });

    test("Should increment the score if the turn is correct",()=>{
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });

    test("should call an alert if the move is wrong",()=>{
        game.playerMoves.push("Wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong move!");
    });
    test("Should toggle turnInProgress to true",()=>{
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test("clicking during computer sequence should fail",()=>{
        showTurns();
        game.lastButton="";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    })
})
