function testFn(num) {
    console.log(num)
    return num;
}

class Ship {
    constructor(name, length) {
        this.name = name;
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

class Gameboard {
    constructor() {
        this.board = [];
        this.shipCount = 0
        this.ships = []
        this.shipAfloat = 0;
        this.shipSunk = 0;
    }

    createBoard(size, shipCount) {
        this.board = Array(size).fill(null).map(() => Array(size).fill(0));

        this.shipCount = shipCount
    }

    //creates new ship at coordinates based on direction (vertical/horizontal)
    //coordinate provided should be the "front" of the ship
    //Do we notate specific ships placed in the gameboard?
    placeShip(row, col, name, length, dir) {
        
        const validV = this.__validateVertPlacement(row, col, length)
        const validH = this.__validateHorPlacement(row, col, length)
        
        if (validV === false || validH === false) {
            return 
        // alert('cannot place ship')
        
        }
        
        const ship = new Ship(name, length)
        
        
        this.board[row][col] = [ship.name, 1] // consolidate this step into loop like validator methods
        
        
        
        //going to need to add edge limits for ship length, board edges, 
        // and already placed ships
        if (dir === "h") {
            ship.coords.push([row, col])
            
            for (let x = col; x < col + length - 1; x++) {
                this.board[row][x + 1] = [ship.name, 1]
                ship.coords.push([row, x + 1])
            }
            
            this.shipAfloat += 1

        } else if (dir === "v") {
            ship.coords.push([row, col])
            
            for (let x = row; x < row + length - 1; x++) {
                this.board[x + 1][col] = [ship.name, 1]
                ship.coords.push([x + 1, col])
            }
            this.shipAfloat += 1
        }

        this.ships.push(ship) 
    }

    __validateHorPlacement(row, col, length) {

        // add board edge validation


        for (let x = row; x < row + length; x++) {
            
            // make sure to return which coordinate is occupied in testing
            if (this.board[x][col] !== 0) {
                return false
            } 
            
            
            
            }
        
        return true
        
    

    }

    __validateVertPlacement(row, col, length) {


        // add board edge validation


        for (let x = col; x < col + length; x++) {
            
            
            if (this.board[row][x] !== 0) {
                return false
            }


            }
        
        return true
        
    

    }

    // 0 = empty space; 1 = ship; 2 = hit ship; 3 = sunken ship; 4 = missed attack
    receiveAttack(row, col) {
        const atk = this.board[row][col]

        if (atk === 0) {
            this.board[row][col] = 4

        }
        
        this.ships.forEach(ship => {
            if (ship.coords.some(coord => coord[0] === row && coord[1] === col)) {
                ship.hit()
                this.board[row][col] = [ship.name, 2] // hit ship
                if (ship.hits === ship.length) {
                    ship.isSunk()
                    this.shipSunk += 1
                    this.shipAfloat -= 1
                    this.__sinkAllShipCoords(ship.name)  // sunk ship
                    
                }
            }
        })
        

    //     if (atk === 1) {
    //         this.board[row][col] = 2
    //     }
    }

    __sinkAllShipCoords(shipName) {
        if (this.shipSunk === this.shipCount) {
            return "All ships sunk!"
        }
        this.ships.forEach(ship => {
            if (ship.name === shipName) {
                ship.coords.forEach(coord => {
                    const row = coord[0]
                    const col = coord[1]
                    // change all coords of ship to sunk
                    this.board[row][col] = [ship.name, 3] // sunk ship
                })
            }

            
        })
        
    }

}

class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard();
    }

    placeShip(row, col, name, length, dir) {
        this.gameboard.placeShip(row, col, name, length, dir);
    }

    receiveAttack(row, col) {
        this.gameboard.receiveAttack(row, col);
    }
}

export { Player, Ship, Gameboard, testFn };
