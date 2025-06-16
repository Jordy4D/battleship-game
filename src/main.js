export function testFn(num) {
    return num
}

export class Ship {
    constructor(length) {
        this.length = length;
        this.coords = []
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        if (this.sunk !== true) {
            return this.hits += 1
        } 
        
        if (this.hits === this.length) {
            return this.isSunk()
        }
    }

    isSunk() {
        return this.sunk = true;
    }

}

export class Gameboard {
    constructor() {
        this.board = [];
    }

    createBoard(size) {
        this.board = Array(size).fill(null).map(() => Array(size).fill(0));
    }

    //creates new ship at coordinates based on direction (vertical/horizontal)
    //coordinate provided should be the "front" of the ship
    placeShip(row, col, dir) {

    }

    // 0 = empty space; 1 = ship; 2 = hit ship; 3 = sunken ship; 4 = missed attack
    receiveAttack(row, col) {
        const atk = this.board[row][col]

        // missed attack
        if (atk === 0) {
            this.board[row][col] = 4
        }

        if (atk === 1) {

        }
    }
}