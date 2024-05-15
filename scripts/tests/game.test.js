/**
 * @jest-environment jsdom
 */

const {game,newGame,showScore,addTurn,lightsOn}=require("../game");

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
    }) 
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
    test("should reset game score to zero",()=>{
        expect(game.score).toEqual(0)
    });
    /**
     * either check the length of the array or 
     * when it is empty
     */
    test("should clean player moves",()=>{
        expect(game.playerMoves).toEqual([])
    });
    /*
    test("should clean current choices",()=>{
        expect(game.currentGame.length).toBe(0);
    });*/
    
    test("Should be one move in the computer's game array",()=>{
        expect(game.currentGame.length).toBe(1);
    });    

    test("should display 0 for the element with id of score",()=>{
        expect(document.getElementById("score").innerText).toEqual(0);
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
})
