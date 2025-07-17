import { Ship, Gameboard } from "./classes.js";

const startGame = document.getElementById("start-game");
startGame.addEventListener("click", () => {
    const playerName = prompt("Enter your name:");
    if (!playerName) {
        prompt("Please enter a valid name.");
        return;
    } else {
        document.getElementById("player-name").textContent = playerName;
    }
});



function test() {
    console.log('This is a test function in interface.js'); 
}




export { test };