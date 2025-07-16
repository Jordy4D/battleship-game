import { testFn, Ship, Gameboard } from "../src/classes.js"


test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

test('test function', () => {
    const t = testFn(1)
    expect(t).toBe(1);
})

test('checks Ship methods', () => {
    const newShip = new Ship("santaMaria", 3)

    expect(newShip.length).toBe(3)
    expect(newShip.name).toBe("santaMaria")
    expect(newShip.hits).toBe(0)
    expect(newShip.sunk).toBe(false)

    newShip.hit()
    expect(newShip.hits).toBe(1)
    newShip.hit()
    expect(newShip.hits).toBe(2)
    newShip.hit()
    expect(newShip.hits).toBe(3)
    
    newShip.isSunk()
    expect(newShip.sunk).toBe(true)
})

//test not completed
test('checks gameboard class methods', () => {
    const testBoard = new Gameboard()
    testBoard.createBoard(5, 3)

    expect(testBoard.board).toEqual(expect.arrayContaining([
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ]
                                ]));
    
    expect(testBoard.__validateHorPlacement(1, 2, 3)).toBe(true)
    expect(testBoard.__validateVertPlacement(1, 2, 3)).toBe(true)

    
    testBoard.placeShip(1, 2, "santaMaria", 3, "h")      
    
    expect(testBoard.shipAfloat).toBe(1)
    expect(testBoard.ships.length).toBe(1)
    expect(testBoard.ships[0].length).toBe(3)
    expect(testBoard.ships[0].name).toBe("santaMaria")
    expect(testBoard.ships[0].coords).toEqual([[1, 2], [1, 3], [1, 4]])
    expect(testBoard.ships[0]).toEqual(expect.objectContaining({
                                    name: "santaMaria",
                                    length: 3,
                                    coords: [[1, 2], [1, 3], [1, 4]],
                                    hits: 0,
                                    sunk: false
                                }))
    expect(testBoard.ships[0].sunk).toBe(false)

    expect(testBoard.board).toEqual(expect.arrayContaining([
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, ["santaMaria", 1], ["santaMaria", 1], ["santaMaria", 1], ],
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ]
                                ]));

    
})


test('checks gameboard attacking function', () => {

    const testBoard = new Gameboard()
    testBoard.createBoard(5, 3)

    expect(testBoard.board).toEqual(expect.arrayContaining([
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ]
                                ]));
    
    expect(testBoard.__validateHorPlacement(1, 2, 3)).toBe(true)
    expect(testBoard.__validateVertPlacement(1, 2, 3)).toBe(true)

    
    testBoard.placeShip(1, 2, "santaMaria", 3, "h")      
    
    expect(testBoard.shipAfloat).toBe(1)
    expect(testBoard.ships.length).toBe(1)
    expect(testBoard.ships[0].length).toBe(3)
    expect(testBoard.ships[0].name).toBe("santaMaria")
    expect(testBoard.ships[0].coords).toEqual([[1, 2], [1, 3], [1, 4]])
    expect(testBoard.ships[0]).toEqual(expect.objectContaining({
                                    name: "santaMaria",
                                    length: 3,
                                    coords: [[1, 2], [1, 3], [1, 4]],
                                    hits: 0,
                                    sunk: false
                                }))
    expect(testBoard.ships[0].sunk).toBe(false)

    expect(testBoard.board).toEqual(expect.arrayContaining([
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, ["santaMaria", 1], ["santaMaria", 1], ["santaMaria", 1], ],
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ]
                                ]));

    testBoard.placeShip(0, 1, "destroyer", 4, "v")


    expect(testBoard.board).toEqual(expect.arrayContaining([
                                    [ 0, ["destroyer", 1], 0, 0, 0, ],
                                    [ 0, ["destroyer", 1], ["santaMaria", 1], ["santaMaria", 1], ["santaMaria", 1], ],
                                    [ 0, ["destroyer", 1], 0, 0, 0, ],
                                    [ 0, ["destroyer", 1], 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ]
                                ]));

    testBoard.placeShip(0, 2, "submarine", 3, "h")


    expect(testBoard.board).toEqual(expect.arrayContaining([
                                    [ 0, ["destroyer", 1], 0, 0, 0, ],
                                    [ 0, ["destroyer", 1], ["santaMaria", 1], ["santaMaria", 1], ["santaMaria", 1], ],
                                    [ 0, ["destroyer", 1], 0, 0, 0, ],
                                    [ 0, ["destroyer", 1], 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ]
                                ]));

    testBoard.placeShip(2, 0, "battleship", 3, "v")


    expect(testBoard.board).toEqual(expect.arrayContaining([
                                    [ 0, ["destroyer", 1], 0, 0, 0, ],
                                    [ 0, ["destroyer", 1], ["santaMaria", 1], ["santaMaria", 1], ["santaMaria", 1], ],
                                    [ 0, ["destroyer", 1], 0, 0, 0, ],
                                    [ 0, ["destroyer", 1], 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ]
                                ]));                           

    testBoard.receiveAttack(1, 2)
    testBoard.receiveAttack(2, 0)

    expect(testBoard.board[1][2]).toEqual(expect.arrayContaining(["santaMaria", 2])) // 2 = hit ship
    expect(testBoard.board[2][0]).toBe(4) // 2 = hit ship

    expect(testBoard.board).toEqual(expect.arrayContaining([
                                    [ 0, ["destroyer", 1], 0, 0, 0, ],
                                    [ 0, ["destroyer", 1], ["santaMaria", 2], ["santaMaria", 1], ["santaMaria", 1], ],
                                    [ 4, ["destroyer", 1], 0, 0, 0, ],
                                    [ 0, ["destroyer", 1], 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ]
                                ]));   

    
    testBoard.receiveAttack(0, 1) //destroyer hit
    testBoard.receiveAttack(1, 1) //destroyer hit

        expect(testBoard.board).toEqual(expect.arrayContaining([
                                    [ 0, ["destroyer", 2], 0, 0, 0, ],
                                    [ 0, ["destroyer", 2], ["santaMaria", 2], ["santaMaria", 1], ["santaMaria", 1], ],
                                    [ 4, ["destroyer", 1], 0, 0, 0, ],
                                    [ 0, ["destroyer", 1], 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ]
                                ])); 

    testBoard.receiveAttack(2, 1) //destroyer hit

    expect(testBoard.board).toEqual(expect.arrayContaining([
                                    [ 0, ["destroyer", 2], 0, 0, 0, ],
                                    [ 0, ["destroyer", 2], ["santaMaria", 2], ["santaMaria", 1], ["santaMaria", 1], ],
                                    [ 4, ["destroyer", 2], 0, 0, 0, ],
                                    [ 0, ["destroyer", 1], 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ]
                                ]));

    testBoard.receiveAttack(3, 1) //destroyer hit

    expect(testBoard.board).toEqual(expect.arrayContaining([
                                    [ 0, ["destroyer", 3], 0, 0, 0, ],
                                    [ 0, ["destroyer", 3], ["santaMaria", 2], ["santaMaria", 1], ["santaMaria", 1], ],
                                    [ 4, ["destroyer", 3], 0, 0, 0, ],
                                    [ 0, ["destroyer", 3], 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ]
                                ]));


    testBoard.receiveAttack(1, 3) //santaMaria hit
    testBoard.receiveAttack(1, 4) //santaMaria hit

    expect(testBoard.board).toEqual(expect.arrayContaining([
                                    [ 0, ["destroyer", 3], 0, 0, 0, ],
                                    [ 0, ["destroyer", 3], ["santaMaria", 3], ["santaMaria", 3], ["santaMaria", 3], ],
                                    [ 4, ["destroyer", 3], 0, 0, 0, ],
                                    [ 0, ["destroyer", 3], 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ]
                                ]));

    expect(testBoard.shipAfloat).toBe(0)
    expect(testBoard.shipSunk).toBe(2)

        

})
