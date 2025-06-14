import { testFn } from "../src/main.js"

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

test('test function', () => {
    const t = testFn(1)
    expect(t).toBe(1);
})