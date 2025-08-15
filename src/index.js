import './style.css';
import { Player, Gameboard, Ship, testFn } from './components/classes.js';
import { gameInit } from './components/interface.js';
import { controllerTest } from './components/controller.js';


// test();
testFn(69);
gameInit();
controllerTest();

const x = new Player("bob")
x.gameboard.createBoard(10, 5)
x.gameboard.receiveAttack(0, 0)
console.log(x);
console.log("index.js Welcome to the Battleship Game!");