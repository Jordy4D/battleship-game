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

    expect(testBoard.board).toBe([
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ],
                                    [ 0, 0, 0, 0, 0, ]
                                ])
                            
    expect(testBoard.placeShip(1, 2, 3, "h")).toBe(true)

    // testBoard.hit()
    // expect(testBoard.).toBe(1)
    // testBoard.hit()
    // expect(testBoard.).toBe(2)
    // testBoard.hit()
    // expect(testBoard.).toBe(3)
    
    // testBoard.isSunk()
    // expect(testBoard.).toBe(true)
})


