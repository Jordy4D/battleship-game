import { testFn, Ship } from "../src/main.js"

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