const { test, describe } = require('node:test')
const assert = require('node:assert')

const average = require('../utils/for_testing').average

// We surround our tests, average, with a describe block
// This groups our tests into logical collections
describe('average', () => {
  test('of one value is the value itself', () => {
    assert.strictEqual(average([1]), 1)
  })

  test('of many is calculated right', () => {
    assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5)
  })

  // This won't work correctly, as dividing by 0 results in NaN
  // (until we fix our average function)
  test('of empty array is zero', () => {
    assert.strictEqual(average([]), 0)
  })
})