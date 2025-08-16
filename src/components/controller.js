

document.getElementById('place-battleship-1').addEventListener('click', () => {
    console.log('Place Battleship button clicked for Player 1');
})

document.getElementById('place-cruiser-1').addEventListener('click', () => {
    console.log('Place Cruiser button clicked for Player 1');
})

document.getElementById('place-submarine-1').addEventListener('click', () => {
    console.log('Place Submarine button clicked for Player 1');
})

document.getElementById('place-patrol-boat-1').addEventListener('click', () => {
    console.log('Place Patrol Boat button clicked for Player 1');
})

document.getElementById('place-carrier-1').addEventListener('click', () => {
    console.log();
})



function controllerTest() {
    console.log('This is a test function in controller.js');
}

export { controllerTest };