import { playerOne, playerTwo, currentPlayer, gameRerender } from './interface.js';

document.getElementById('place-battleship-1').addEventListener('click', () => {
    const row = parseInt(prompt("Enter the row (0-9) to place the Battleship:"));
    const col = parseInt(prompt("Enter the column (0-9) to place the Battleship:"));
    const orientation = prompt("Enter the orientation (h for horizontal, v for vertical):").toLowerCase();
    if (isNaN(row) || isNaN(col) || (orientation !== 'h' && orientation !== 'v')) {
        alert("Invalid input. Please try again.");
        return;
    }
    playerOne.gameboard.placeShip(row, col, "Battleship", 4, orientation);
    gameRerender();
    console.log('Place Battleship button clicked for Player 1');
})

document.getElementById('place-cruiser-1').addEventListener('click', () => {
    const row = parseInt(prompt("Enter the row (0-9) to place the Cruiser:"));
    const col = parseInt(prompt("Enter the column (0-9) to place the Cruiser:"));
    const orientation = prompt("Enter the orientation (h for horizontal, v for vertical):").toLowerCase();
    if (isNaN(row) || isNaN(col) || (orientation !== 'h' && orientation !== 'v')) {
        alert("Invalid input. Please try again.");
        return;
    }
    playerOne.gameboard.placeShip(row, col, "Cruiser", 3, orientation);
    gameRerender();
    console.log('Place Cruiser button clicked for Player 1');
})

document.getElementById('place-submarine-1').addEventListener('click', () => {
    const row = parseInt(prompt("Enter the row (0-9) to place the Submarine:"));
    const col = parseInt(prompt("Enter the column (0-9) to place the Submarine:"));
    const orientation = prompt("Enter the orientation (h for horizontal, v for vertical):").toLowerCase();
    if (isNaN(row) || isNaN(col) || (orientation !== 'h' && orientation !== 'v')) {
        alert("Invalid input. Please try again.");
        return;
    }
    playerOne.gameboard.placeShip(row, col, "Submarine", 3, orientation);
    gameRerender();
    console.log('Place Submarine button clicked for Player 1');
})

document.getElementById('place-patrol-boat-1').addEventListener('click', () => {
    const row = parseInt(prompt("Enter the row (0-9) to place the Patrol Boat:"));
    const col = parseInt(prompt("Enter the column (0-9) to place the Patrol Boat:"));
    const orientation = prompt("Enter the orientation (h for horizontal, v for vertical):").toLowerCase();
    if (isNaN(row) || isNaN(col) || (orientation !== 'h' && orientation !== 'v')) {
        alert("Invalid input. Please try again.");
        return;
    }
    playerOne.gameboard.placeShip(row, col, "Patrol Boat", 2, orientation);
    gameRerender();
    console.log('Place Patrol Boat button clicked for Player 1');
})

document.getElementById('place-carrier-1').addEventListener('click', () => {
    const row = parseInt(prompt("Enter the row (0-9) to place the Carrier:"));
    const col = parseInt(prompt("Enter the column (0-9) to place the Carrier:"));
    const orientation = prompt("Enter the orientation (h for horizontal, v for vertical):").toLowerCase();
    if (isNaN(row) || isNaN(col) || (orientation !== 'h' && orientation !== 'v')) {
        alert("Invalid input. Please try again.");
        return;
    }
    playerOne.gameboard.placeShip(row, col, "Carrier", 5, orientation);
    gameRerender();
    console.log('Place Carrier button clicked for Player 1');
})




function controllerTest() {
    console.log('This is a test function in controller.js');
}

export { controllerTest };