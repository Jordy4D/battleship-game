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
        this.ships = 0
    }

    createBoard(size, ships) {
        this.board = Array(size).fill(null).map(() => Array(size).fill(0));

        this.ships = ships
    }

    //creates new ship at coordinates based on direction (vertical/horizontal)
    //coordinate provided should be the "front" of the ship
    //Do we notate specific ships placed in the gameboard?
    placeShip(length, row, col, dir) {
        const ship = new Ship(length)

        this.board[row][col] = 1
        
        //going to need to add edge limits for ship length, board edges, 
        // and already placed ships
        if (dir === v) {
            for (let x = 0; x < length; x++) {
                this.board[row + 1][col] = 1
            }
        } else if (dir === h) {
            for (let x = 0; x < length; x++) {
                this.board[row][col + 1] = 1
            }
        }
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