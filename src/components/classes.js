function testFn(num) {
    console.log(num)
    return num;
}

class Ship {
    constructor(name, length, dir) {
        this.name = name;
        this.length = length;
        this.coords = []
        this.hits = 0;
        this.sunk = false;
        this.dir = dir
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
        this.shipsRemaining = 0;
        this.shipsSunk = 0;
    }

    createBoard(size, shipCount) {
        this.board = Array(size).fill(null).map(() => Array(size).fill(null));

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                this.board[i][j] = {status: 0, coord: [i, j], ship: null, length: 0}; // 0 = empty space
            }
        }
        console.log(this.board)
        this.shipCount = shipCount
    }

    //creates new ship at coordinates based on direction (vertical/horizontal)
    //coordinate provided should be the "front" of the ship
    //Do we notate specific ships placed in the gameboard?
    placeShip(row, col, name, length, dir) {
        
        // const validV = this.__validateVertPlacement(row, col, length)
        // const validH = this.__validateHorPlacement(row, col, length)
        
        // if (validV === false || validH === false) {
        //     return 
        // // alert('cannot place ship')
        
        // }
        
        const ship = new Ship(name, length, dir)


        this.board[row][col] = {status: 1, coord: [row, col], ship: ship.name, length: ship.length} // consolidate this step into loop like validator methods



        //going to need to add edge limits for ship length, board edges,
        // and already placed ships
        if (dir === "h") {
            ship.coords.push([row, col])
            
            for (let x = col; x < col + length - 1; x++) {
                this.board[row][x + 1] = {status: 1, coord: [row, x + 1], ship: ship.name, length: ship.length}
                ship.coords.push([row, x + 1])
                // this.board[row + 1][x + 1] = {status: 5, coord: [row + 1, x + 1], ship: null, length: 0} // near ship
                // this.board[row - 1][x + 1] = {status: 5, coord: [row - 1, x + 1], ship: null, length: 0} // near ship
            }
            this.shipsRemaining += 1
            
        } else if (dir === "v") {
            ship.coords.push([row, col])
            
            for (let x = row; x < row + length - 1; x++) {
                this.board[x + 1][col] = {status: 1, coord: [x + 1, col], ship: ship.name, length: ship.length}
                ship.coords.push([x + 1, col])
            }
            this.shipsRemaining += 1
        }
        
        this.ships.push(ship) 
        this.__shipProximity(ship.name) // update status of squares around any ship on board to 5 so users can see if their attacks are close
    }

    __validateHorPlacement(row, col, length) {

        // add board edge validation


        for (let x = row; x < row + length; x++) {
            
            // make sure to return which coordinate is occupied in testing
            if (this.board[x][col].status !== 0) {
                return false
            }


            }
        
        return true
        
    

    }

    __validateVertPlacement(row, col, length) {


        // add board edge validation


        for (let x = col; x < col + length; x++) {
            
            
            if (this.board[row][x].status !== 0) {
                return false
            }


            }
        
        return true
        
    

    }

    __shipProximity(shipName) {
        // update status of squares around any ship on board to 5 so users can see if their attacks are close
        this.ships.forEach(ship => {
            
            // vertical ship
            if (ship.name === shipName && ship.dir === "v") {
                ship.coords.forEach(coord => {
                    const row = coord[0]
                    const col = coord[1]
                    // update surrounding squares

                    if (this.board[row][col]) {
                        this.board[row][col - 1] = {status: 5, coord: [row, col - 1], ship: null, length: 0};
                        this.board[row][col + 1] = {status: 5, coord: [row, col + 1], ship: null, length: 0};
                    }

                    if (row >= this.board.length - 1) { // skips placement where the board runs to the end
                        return
                    }
                    if (col > 0 ) { 
                        if (this.board[row - 1][col - 1] && this.board[row - 1][col - 1].status !== 1) { // left of ship
                            this.board[row - 1][col - 1] = {status: 5, coord: [row - 1, col - 1], ship: null, length: 0} 
                        }
                        if (this.board[row][col - 1] && this.board[row][col - 1].status !== 1) { // above ship
                            this.board[row][col - 1] = {status: 5, coord: [row, col - 1], ship: null, length: 0} 
                        }
                        if (this.board[row - 1][col + 1] && this.board[row - 1][col + 1].status !== 1) { // right of ship
                            this.board[row - 1][col + 1] = {status: 5, coord: [row - 1, col + 1], ship: null, length: 0} 
                        }
                        if (this.board[row][col + 1] && this.board[row][col + 1].status !== 1) {
                            this.board[row][col + 1] = {status: 5, coord: [row, col + 1], ship: null, length: 0} 
                        }
                    }
                    if (row > 0 && this.board[row - 1][col].status !== 1) { // above ship
                        this.board[row - 1][col] = {status: 5, coord: [row - 1, col], ship: null, length: 0} 
                    }
                    if (row < this.board.length - 1 && this.board[row + 1][col].status !== 1) { // end of ship
                        this.board[row + 1][col] = {status: 5, coord: [row + 1, col], ship: null, length: 0} 
                        this.board[row + 1][col - 1] = {status: 5, coord: [row + 1, col - 1], ship: null, length: 0} 

                    }
                    if (col < this.board.length - 1 ) { // right of ship
                        this.board[row - 1][col + 1] = {status: 5, coord: [row - 1, col + 1], ship: null, length: 0} 
                        this.board[row][col + 1] = {status: 5, coord: [row, col + 1], ship: null, length: 0} 
                        this.board[row + 1][col + 1] = {status: 5, coord: [row + 1, col + 1], ship: null, length: 0} 
                        this.board[row][col - 1] = {status: 5, coord: [row, col - 1], ship: null, length: 0} 

                    }
                    
                    })
                }

            // horizontal ship
            if (ship.name === shipName && ship.dir === "h") {
                ship.coords.forEach(coord => {
                    const row = coord[0]
                    const col = coord[1]
                    // update surrounding squares

                    if (col >= this.board[row].length - 1) { // skips placement where the board runs to the end
                        return
                    }
                    if (row > 0) {
                        if (this.board[row - 1][col - 1] && this.board[row - 1][col - 1].status !== 1) { // left of ship
                            this.board[row - 1][col - 1] = {status: 5, coord: [row - 1, col - 1], ship: null, length: 0} 
                        }
                        if (this.board[row - 1][col] && this.board[row - 1][col].status !== 1) {
                            this.board[row - 1][col] = {status: 5, coord: [row - 1, col], ship: null, length: 0} 
                        }
                        if (this.board[row - 1][col + 1] && this.board[row - 1][col + 1].status !== 1) {
                            this.board[row - 1][col + 1] = {status: 5, coord: [row - 1, col + 1], ship: null, length: 0} 
                        }
                    }
                    if (col > 0 && this.board[row][col - 1].status !== 1) {
                        this.board[row][col - 1] = {status: 5, coord: [row, col - 1], ship: null, length: 0} 
                    }
                    if (col < this.board[row].length - 1 && this.board[row][col + 1].status !== 1) {
                        this.board[row][col + 1] = {status: 5, coord: [row, col + 1], ship: null, length: 0} 
                    }
                    if (row < this.board.length - 1 && this.board[row + 1][col].status !== 1) { // end of ship
                        this.board[row + 1][col - 1] = {status: 5, coord: [row + 1, col - 1], ship: null, length: 0} 
                        this.board[row + 1][col] = {status: 5, coord: [row + 1, col], ship: null, length: 0} 
                        this.board[row + 1][col + 1] = {status: 5, coord: [row + 1, col + 1], ship: null, length: 0} 
                    } 

                    
                    })
                }
            })
        }




    // 0 = empty space; 1 = ship; 2 = hit ship; 3 = sunken ship; 4 = missed attack; 5 = missed attack, near ship
    receiveAttack(row, col) {
        const atk = this.board[row][col].status

        if (atk === 0) {
            this.board[row][col].status = 4

        }
        
        this.ships.forEach(ship => {
            if (ship.coords.some(coord => coord[0] === row && coord[1] === col && atk === 2)) {
                return console.log("Already hit this square!")
            }

           
            
            if (ship.coords.some(coord => coord[0] === row && coord[1] === col)) {
                ship.hit()
                this.board[row][col] = {status: 2, coord: [row, col], ship: ship.name, length: ship.length} // hit ship
                if (ship.hits === ship.length) {
                    ship.isSunk()
                    this.shipsSunk += 1
                    this.shipsRemaining -= 1
                    this.__sinkAllShipCoords(ship.name)  // sunk ship
                    
                }
            }
        })
        
        console.table(this.board.map(row => row.map(cell => cell.status))); // log the board status for debugging

    //     if (atk === 1) {
    //         this.board[row][col] = 2
    //     }
    }

    __sinkAllShipCoords(shipName) {
        this.ships.forEach(ship => {
            if (ship.name === shipName) {
                ship.coords.forEach(coord => {
                    const row = coord[0]
                    const col = coord[1]
                    // change all coords of ship to sunk
                    this.board[row][col] = {status: 3, coord: [row, col], ship: ship.name, length: ship.length} // sunk ship
                })
            }
            
            
        })
        if (this.shipsSunk === this.shipCount) {
            return alert("All ships sunk!")
        }
        
    }

}

class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard();
        this.currentTurn = false; // Indicates if it's this player's turn
        this.ships = []; // List of ships placed by this player
    }

    placeShip(row, col, name, length, dir) {
        this.gameboard.placeShip(row, col, name, length, dir);
    }

    receiveAttack(row, col) {
        this.gameboard.receiveAttack(row, col);
    }

    rename(newName) {
        this.name = newName;
    }

    __importShips() {
        this.ships = this.gameboard.ships;
    }
}

export { Player, Ship, Gameboard, testFn };
