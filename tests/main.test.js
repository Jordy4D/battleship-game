import { testFn, Ship, Gameboard } from "../src/main.js"


test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

test('test function', () => {
    const t = testFn(1)
    expect(t).toBe(1);
})

test('checks Ship methods', () => {
    const newShip = new Ship(3)

    expect(newShip.length).toBe(3)
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

    
    testBoard.placeShip(1, 2, 3, "h")              
    
    expect(testBoard.board).toEqual(expect.arrayContaining([
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, 1, 1, 1, ],
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ]
                                ]));

    testBoard.placeShip(0, 1, 4, "v")              


    expect(testBoard.board).toEqual(expect.arrayContaining([
                                    [ 0, 1, 0, 0, 0, ],
                                    [ 0, 1, 1, 1, 1, ],
                                    [ 0, 1, 0, 0, 0, ],
                                    [ 0, 1, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ]
                                ]));

    testBoard.placeShip(0, 2, 3, "h")              


    expect(testBoard.board).toEqual(expect.arrayContaining([
                                    [ 0, 1, 0, 0, 0, ],
                                    [ 0, 1, 1, 1, 1, ],
                                    [ 0, 1, 0, 0, 0, ],
                                    [ 0, 1, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ]
                                ]));

    testBoard.placeShip(2, 0, 3, "v")              


    expect(testBoard.board).toEqual(expect.arrayContaining([
                                    [ 0, 1, 0, 0, 0, ],
                                    [ 0, 1, 1, 1, 1, ],
                                    [ 0, 1, 0, 0, 0, ],
                                    [ 0, 1, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ]
                                ]));                            

    testBoard.receiveAttack(1, 2)
    testBoard.receiveAttack(2, 0)

    expect(testBoard.board[1][2]).toBe(2) // 2 = hit ship
    expect(testBoard.board[2][0]).toBe(4) // 2 = hit ship

    // testBoard.hit()
    // expect(testBoard.).toBe(1)
    // testBoard.hit()
    // expect(testBoard.).toBe(2)
    // testBoard.hit()
    // expect(testBoard.).toBe(3)
    
    // testBoard.isSunk()
    // expect(testBoard.).toBe(true)
})


