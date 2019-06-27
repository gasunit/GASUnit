/* eslint-env mocha */

import exportsEach_ from '../src/exportsEach_'
import assert = require('assert')

describe('#exportsEach_()', () => {
  it('should execute test by Exports style and return result', () => {
    const errorMessage = 'error_message'
    const suite = {
      '1': {
        'a': function () {
          // Passed to test
        },
        'b': function () {
          // Failed to test
          throw new Error(errorMessage)
        }
      }
    }
    const result = exportsEach_(suite)

    assert.strictEqual(Object.keys(result).length, 1)
    const result1 = result['1']
    assert.strictEqual(Object.keys(result1).length, 2)
    const resultA = result1['a']
    assert.strictEqual(resultA.passing, true)
    assert.strictEqual(resultA.message, undefined)
    assert.strictEqual(resultA.stack, undefined)
    const resultB = result1['b']
    assert.strictEqual(resultB.passing, false)
    assert.strictEqual(resultB.message, errorMessage)
    assert.notStrictEqual(resultB.stack, undefined)
  })
})
