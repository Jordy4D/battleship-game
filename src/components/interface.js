import { Ship, Gameboard } from "./classes.js";

const enterName = document.getElementById("enter-name");
const resetGame = document.getElementById("reset-game");
const playerNameUI = document.getElementById("player-name");
const newCarrierShip = document.getElementById("new-carrier-ship");
const newBattleshipShip = document.getElementById("new-battleship-ship");
const newCruiserShip = document.getElementById("new-cruiser-ship");
const newDestroyerShip = document.getElementById("new-destroyer-ship");
const newSubmarineShip = document.getElementById("new-submarine-ship");
const newPatrolBoatShip = document.getElementById("new-patrol-boat");
const gameboardUI = document.getElementById("game-board");
const shipsSunkUI = document.getElementById("ships-sunk");
const shipsRemainingUI = document.getElementById("ships-remaining");

const namePlayerOne = "One";


function gameInit() {

    const gameboard = new Gameboard();
    gameboard.createBoard(10, 5);
    
    document.getElementById("ships-remaining-value").textContent = gameboard.shipsRemaining;
    document.getElementById("ships-sunk-value").textContent = gameboard.shipsSunk;
    
    
    // gameboardUI.innerHTML = generateBoardHTML(gameboard.board.length, gameboard.board[0].length);
    
    
    for (let i = 0; i < gameboard.board.length; i++) {
        for (let j = 0; j < gameboard.board[i].length; j++) {
            const squareDiv = document.createElement("div");
            squareDiv.classList.add("boardSquare");
            squareDiv.innerHTML = gameboard.board[i][j].status;
            squareDiv.dataset.coord = `${i},${j}`; // Store coordinates for later use
            squareDiv.addEventListener("click", () => {
                const [x, y] = squareDiv.dataset.coord.split(",").map(Number);
                console.log(`Attacking coordinates: (${x}, ${y})`);
                gameboard.receiveAttack(x, y);
                squareDiv.classList.add("attacked");
                // Finish updating the UI based on the attack result

            });
            gameboardUI.appendChild(squareDiv);
        }
        // console.log(row[i]);
        // const square = row[i];
    }



}



enterName.addEventListener("click", () => {
    const playerName = prompt("Enter your name:");
    if (!playerName) {
        prompt("Please enter a valid name.");
        return;
    } else {
        document.getElementById("player-name").textContent = playerName;
    }


    
});

resetGame.addEventListener("click", () => {
    let userConfirmation = confirm("Are you sure you want to reset the game?");
    if (userConfirmation) {
        gameboardUI.innerHTML = ""; // Clear the game board UI
        playerNameUI.textContent = namePlayerOne; // Reset player name
        gameInit();
    } else {
        return;
    }

});

function test() {
    console.log('This is a test function in interface.js'); 
}

gameInit();


export { test };