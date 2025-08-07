import { Ship, Gameboard, Player } from "./classes.js";

const enterName = document.getElementById("enter-name");
const resetGame = document.getElementById("reset-game");
const playerOneNameUI = document.getElementById("player-one-name");
const playerTwoNameUI = document.getElementById("player-two-name");
const newCarrierShip = document.getElementById("new-carrier-ship");
const newBattleshipShip = document.getElementById("new-battleship-ship");
const newCruiserShip = document.getElementById("new-cruiser-ship");
const newDestroyerShip = document.getElementById("new-destroyer-ship");
const newSubmarineShip = document.getElementById("new-submarine-ship");
const newPatrolBoatShip = document.getElementById("new-patrol-boat");
const playerOneGameboardUI = document.getElementById("gameboard-one");
const playerTwoGameboardUI = document.getElementById("gameboard-two");
const playerOneShipsSunkUI = document.getElementById("player-one-ships-sunk-value");
const playerOneShipsRemainingUI = document.getElementById("player-one-ships-remaining-value");
const playerTwoShipsSunkUI = document.getElementById("player-two-ships-sunk-value");
const playerTwoShipsRemainingUI = document.getElementById("player-two-ships-remaining-value");
const gameboardSquare = document.querySelectorAll(".boardSquare");


const namePlayerOne = "One";
const namePlayerTwo = "Two";

const playerOne = new Player(namePlayerOne);
const playerTwo = new Player(namePlayerTwo);

const gameboard = new Gameboard();
// const testShip = new Ship("Destroyer", 4, [[0, 1], [0, 2], [0, 3], [0, 4]]);
// gameboard.placeShip(0, 1, "Destroyer", 4, "h");

function gameInit() {

    playerOne.gameboard.createBoard(10, 5)
    playerTwo.gameboard.createBoard(10, 5);


    playerOneShipsRemainingUI.textContent = playerOne.gameboard.shipsRemaining;
    playerOneShipsSunkUI.textContent = playerOne.gameboard.shipsSunk;
    playerTwoShipsRemainingUI.textContent = playerTwo.gameboard.shipsRemaining;
    playerTwoShipsSunkUI.textContent = playerTwo.gameboard.shipsSunk;
    playerOne.gameboard.placeShip(0, 0, "Carrier", 5, "h");
    playerOne.gameboard.placeShip(5, 5, "Battleship", 4, "v");
    playerOne.gameboard.placeShip(2, 2, "Patrol Boat", 2, "h");
    playerOne.gameboard.placeShip(2, 7, "Submarine", 3, "h");
    playerOne.gameboard.placeShip(7, 1, "Cruiser", 3, "v");

    generateBoardHTML(playerOne.gameboard.board, playerOneGameboardUI);
    generateBoardHTML(playerTwo.gameboard.board, playerTwoGameboardUI);
    // gameboardUI.innerHTML = generateBoardHTML(gameboard.board.length, gameboard.board[0].length);


    playerOneNameUI.textContent = namePlayerOne; // Set initial player name
    playerTwoNameUI.textContent = namePlayerTwo; // Set initial player name

    floatingShips(playerOne);
    floatingShips(playerTwo);

    updateScoreboard(playerOne.gameboard, playerOneShipsSunkUI, playerOneShipsRemainingUI);
    updateScoreboard(playerTwo.gameboard, playerTwoShipsSunkUI, playerTwoShipsRemainingUI);
}

function generateBoardHTML(playerBoard, playerUI) {

    for (let i = 0; i < playerBoard.length; i++) {
        for (let j = 0; j < playerBoard[i].length; j++) {
            // Create a new div for each square in the gameboard
            // Add classes and attributes as needed
            const squareDiv = document.createElement("div");
            squareDiv.classList.add("boardSquare");
            squareDiv.classList.add("empty");        
            squareDiv.innerHTML = playerBoard[i][j].status;
            squareDiv.dataset.coord = playerBoard[i][j].coord; // Store coordinates for later use
            squareDiv.dataset.ship = `empty`;

            addClickEventToSquares(squareDiv, playerBoard);
            playerUI.appendChild(squareDiv);
        }
    }
}



function updateScoreboard(playerBoard, playerShipsSunk, playerShipsRemaining) {
    playerShipsSunk.textContent = playerBoard.shipsSunk;
    playerShipsRemaining.textContent = playerBoard.shipsRemaining;
}

function addClickEventToSquares(div, playerBoard) {
    div.addEventListener("click", () => {
        const [x, y] = div.dataset.coord.split(",").map(Number);
        console.log(`Attacking coordinates: (${x}, ${y})`);

        playerBoard.receiveAttack(x, y);

        if (playerBoard.board[x][y].status === 4) {
            div.classList.add("missed");
            div.classList.remove("empty");
            div.classList.remove("hit");
            div.classList.remove("sunk");
            div.classList.add("attacked");
            
        }
        else if (playerBoard.board[x][y].status === 2) {
            div.classList.add("hit");
            div.classList.remove("empty");
            div.classList.remove("missed");
            div.classList.remove("sunk");
            div.classList.remove("ship");

            // Update the ship's coordinates in the UI
        }
        else if (playerBoard.board[x][y].status === 5) {
            div.classList.add("near-ship");
            div.classList.remove("empty");
            div.classList.remove("missed");
            div.classList.remove("sunk");
            div.classList.remove("ship");
            

            // Update the ship's coordinates in the UI
        }
        else if (playerBoard.board[x][y].status === 3) {
            div.classList.add("sunk");
            div.classList.remove("empty");
            div.classList.remove("missed");
            div.classList.remove("hit");
            div.classList.remove("ship");
            //needs to update all squares of the ship to sunk
            playerBoard.ships.forEach(ship => {
                if (ship.name === playerBoard.board[x][y].ship) {
                    ship.coords.forEach(coord => {
                        const sunkSquare = document.querySelector(`.boardSquare[data-coord="${coord}"]`);
                        if (sunkSquare) {
                            sunkSquare.classList.add("sunk");
                            updateScoreboard(playerBoard, playerShipsSunkUI, playerShipsRemainingUI);
                        }
                    });
                }
            });
        }
        // div.classList.add("attacked");
        // Finish updating the UI based on the attack result
        console.log(playerBoard.board[x][y].status);
        console.log(playerBoard.board);

    });
            // disableSquareClicks();
};

function disableSquareClicks() {
    gameboardSquare.forEach(square => {
        square.removeEventListener("click", () => {});
        square.classList.add("disabled");
    }
    );
}


function floatingShips(player) {
    player.gameboard.ships.forEach(ship => {
        ship.coords.forEach(coord => {
            const shipSquare = document.querySelector(`.boardSquare[data-coord="${coord}"]`);
            if (shipSquare) {
                shipSquare.classList.add("ship");
            }
        });
    });
}
// floatingShips();    
                            

// enterName.addEventListener("click", () => {
//     const playerName = prompt("Enter your name:");
//     if (!playerName) {
//         prompt("Please enter a valid name.");
//         return;
//     } else {
//         document.getElementById("player-name").textContent = playerName;
//     }


    
// });

// resetGame.addEventListener("click", () => {
//     let userConfirmation = confirm("Are you sure you want to reset the game?");
//     if (userConfirmation) {
//         gameboardUI.innerHTML = ""; // Clear the game board UI
//         playerNameUI.textContent = namePlayerOne; // Reset player name
//         gameInit();
//     } else {
//         return;
//     }

// });

// newPatrolBoatShip.addEventListener("click", () => {
//     const row = parseInt(prompt("Enter the row (0-9) to place the Patrol Boat:"));
//     const col = parseInt(prompt("Enter the column (0-9) to place the Patrol Boat:"));
//     const orientation = prompt("Enter the orientation (h for horizontal, v for vertical):").toLowerCase();
//     if (isNaN(row) || isNaN(col) || (orientation !== 'h' && orientation !== 'v')) {
//         alert("Invalid input. Please try again.");
//         return;
//     }
//     gameboard.placeShip(row, col, "Patrol Boat", 2, orientation);
//     gameboardUI.innerHTML = ""; // Clear the game board UI
//     gameInit(); // Reinitialize the game board
//     floatingShips(); // Reapply floating ships
//     updateScoreboard(); // Update the scoreboard
// });

function test() {
    console.log('This is a test function in interface.js'); 
}




export { test, gameInit };