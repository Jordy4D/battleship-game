export function testFn(num) {
    return num
}

export class Ship {
    constructor(length) {
        this.length = length;
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

    receiveAttack(row, col) {
        
    }
}