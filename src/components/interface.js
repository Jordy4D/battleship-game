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

// const gameboard = new Gameboard();
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
    
    playerTwo.gameboard.placeShip(5, 6, "Battleship", 4, "v");
    playerTwo.gameboard.placeShip(0, 3, "Carrier", 5, "h");
    playerTwo.gameboard.placeShip(1, 2, "Patrol Boat", 2, "h");
    playerTwo.gameboard.placeShip(3, 2, "Submarine", 3, "h");
    playerTwo.gameboard.placeShip(6, 1, "Cruiser", 3, "v");
    
    // gameboardUI.innerHTML = generateBoardHTML(gameboard.board.length, gameboard.board[0].length);
    generatePlayerOneBoardHTML(playerOne, playerOneGameboardUI);
    generatePlayerTwoBoardHTML(playerTwo, playerTwoGameboardUI);


    playerOneNameUI.textContent = namePlayerOne; // Set initial player name
    playerTwoNameUI.textContent = namePlayerTwo; // Set initial player name

    floatingShips(playerOne, 1);
    floatingShips(playerTwo, 2);

    updateScoreboard(playerOne.gameboard, playerOneShipsSunkUI, playerOneShipsRemainingUI);
    updateScoreboard(playerTwo.gameboard, playerTwoShipsSunkUI, playerTwoShipsRemainingUI);
}

function generatePlayerOneBoardHTML(player, playerUI) {

    for (let i = 0; i < player.gameboard.board.length; i++) {
        for (let j = 0; j < player.gameboard.board[i].length; j++) {
            // Create a new div for each square in the gameboard
            // Add classes and attributes as needed
            const squareDiv = document.createElement("div");
            squareDiv.classList.add("boardSquare-one");
            squareDiv.classList.add("empty-one");
            squareDiv.innerHTML = player.gameboard.board[i][j].status;
            squareDiv.dataset.coord = player.gameboard.board[i][j].coord; // Store coordinates for later use
            squareDiv.dataset.ship = `${player.gameboard.board[i][j].ship || 'empty-one'}`;

            addClickEventToSquares(squareDiv, player, 1);
            playerUI.appendChild(squareDiv);
        }
    }
}

function generatePlayerTwoBoardHTML(player, playerUI) {

    for (let i = 0; i < player.gameboard.board.length; i++) {
        for (let j = 0; j < player.gameboard.board[i].length; j++) {
            // Create a new div for each square in the gameboard
            // Add classes and attributes as needed
            const squareDiv = document.createElement("div");
            squareDiv.classList.add("boardSquare-two");
            squareDiv.classList.add("empty-two");
            squareDiv.innerHTML = player.gameboard.board[i][j].status;
            squareDiv.dataset.coord = player.gameboard.board[i][j].coord; // Store coordinates for later use
            squareDiv.dataset.ship = `${player.gameboard.board[i][j].ship || 'empty-two'}`;

            addClickEventToSquares(squareDiv, player, 2);
            playerUI.appendChild(squareDiv);
        }
    }
}



function updateScoreboard(playerBoard, playerShipsSunk, playerShipsRemaining) {
    playerShipsSunk.textContent = playerBoard.shipsSunk;
    playerShipsRemaining.textContent = playerBoard.shipsRemaining;
}

function addClickEventToSquares(div, player, playerNumber) {
    div.addEventListener("click", () => {
        const [x, y] = div.dataset.coord.split(",").map(Number);
        console.log(`Attacking coordinates: (${x}, ${y})`);

        player.receiveAttack(x, y);

        if (player.gameboard.board[x][y].status === 4) {
            div.classList.add("missed-one");
            div.classList.remove("empty-one");
            div.classList.remove("hit-one");
            div.classList.remove("sunk-one");
            div.classList.add("attacked");
            
        }
        else if (player.gameboard.board[x][y].status === 2) {
            div.classList.add("hit-one");
            div.classList.remove("empty-one");
            div.classList.remove("missed-one");
            div.classList.remove("sunk-one");
            div.classList.remove("ship");

            // Update the ship's coordinates in the UI
        }
        else if (player.gameboard.board[x][y].status === 5) {
            div.classList.add("near-ship");
            div.classList.remove("empty-one");
            div.classList.remove("missed-one");
            div.classList.remove("sunk-one");
            div.classList.remove("ship");
            

            // Update the ship's coordinates in the UI
        } else if (player.gameboard.board[x][y].status === 3 && playerNumber === 1) {
            div.classList.add("sunk-one");
            div.classList.remove("empty-one");
            div.classList.remove("missed-one");
            div.classList.remove("hit-one");
            div.classList.remove("ship");
            //needs to update all squares of the ship to sunk
            
                player.gameboard.ships.forEach(ship => {
                    if (ship.name === player.gameboard.board[x][y].ship) {
                        ship.coords.forEach(coord => {
                            const sunkSquare = document.querySelector(`.boardSquare-one[data-coord="${coord}"]`);
                            if (sunkSquare) {
                                sunkSquare.classList.add("sunk-one");
                                updateScoreboard(playerOne.gameboard, playerOneShipsSunkUI, playerOneShipsRemainingUI);
                                // updateScoreboard(playerTwo.gameboard, playerTwoShipsSunkUI, playerTwoShipsRemainingUI);
                            }
                        });
                    }
                });
        } else if (player.gameboard.board[x][y].status === 3 && playerNumber === 2) {
            div.classList.add("sunk-two");
            div.classList.remove("empty-two");
            div.classList.remove("missed-two");
            div.classList.remove("hit-two");
            div.classList.remove("ship");
            
            player.gameboard.ships.forEach(ship => {
                if (ship.name === player.gameboard.board[x][y].ship) {
                    ship.coords.forEach(coord => {
                        const sunkSquare = document.querySelector(`.boardSquare-two[data-coord="${coord}"]`);
                        if (sunkSquare) {
                            sunkSquare.classList.add("sunk-two");
                            updateScoreboard(playerTwo.gameboard, playerTwoShipsSunkUI, playerTwoShipsRemainingUI);
                            // updateScoreboard(playerOne.gameboard, playerOneShipsSunkUI, playerOneShipsRemainingUI);
                        }
                    });
                }
            });
        }
        
        
        // div.classList.add("attacked");
        // Finish updating the UI based on the attack result
        console.log(player.gameboard.board[x][y].status);
        console.log(player.gameboard.board);

    });
            disableSquareClicks();
};

function disableSquareClicks() {
    gameboardSquare.forEach(square => {
        square.removeEventListener("click", () => {});
        square.classList.add("disabled");
    }
    );
}


function floatingShips(player, playerNumber) {
    if (playerNumber === 1) {
        player.gameboard.ships.forEach(ship => {
            ship.coords.forEach(coord => {
                const shipSquare = document.querySelector(`.boardSquare-one[data-coord="${coord}"]`);
                if (shipSquare) {
                    shipSquare.classList.add("ship");
                }
            });
        });

    } else if (playerNumber === 2) {
        player.gameboard.ships.forEach(ship => {
            ship.coords.forEach(coord => {
                const shipSquare = document.querySelector(`.boardSquare-two[data-coord="${coord}"]`);
                if (shipSquare) {
                    shipSquare.classList.add("ship");
                }
            });
        });
    }
}

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