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
        this.shipCount = 0
        this.ships = []
    }

    createBoard(size, shipCount) {
        this.board = Array(size).fill(null).map(() => Array(size).fill(0));

        this.shipCount = shipCount
    }

    //creates new ship at coordinates based on direction (vertical/horizontal)
    //coordinate provided should be the "front" of the ship
    //Do we notate specific ships placed in the gameboard?
    placeShip(row, col, length, dir) {
        
        const validV = this.__validateVertPlacement(row, col, length)
        const validH = this.__validateHorPlacement(row, col, length)
        
        if (validV === false || validH === false) {
            return alert('cannot place ship')
        }
        
        const ship = new Ship(length)
        
        
        this.board[row][col] = 1 // consolidate this step into loop like validator methods
        


        ship.coords.push([row, col])

        //going to need to add edge limits for ship length, board edges, 
        // and already placed ships
        if (dir === v) {
            for (let x = 0; x < length; x++) {
                this.board[row][col + 1] = 1
            }
        } else if (dir === h) {
            for (let x = 0; x < length; x++) {
                this.board[row + 1][col] = 1
            }
        }
    }

    __validateHorPlacement(row, col, length) {

        // add board edge validation


        for (let x = row; x <= row + length; x++) {
            
            // make sure to return which coordinate is occupied in testing
            if (this.board[x][col] !== 0) {
                return false
            } 
            
            
            
            }
        
        return true
        
    

    }

    __validateVertPlacement(row, col, length) {


        // add board edge validation


        for (let x = col; x <= col + length; x++) {
            
            
            if (this.board[row][x] !== 0) {
                return false
            } 
            
            
            
            }
        
        return true
        
    

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