/* eslint-env mocha */

import isNaN_ from '../src/isNaN_'
import assert = require('assert')

type Consumer = (any) => void

describe('#isNaN_()', () => {
  describe('when argument is NaN', () => {
    it('should return true', () => {
      const assertTrue: Consumer = value => assert.strictEqual(value, true)
      assertTrue(isNaN_(NaN))
      assertTrue(isNaN_(0 / 0))
    })
  })

  describe('when argument is not NaN', () => {
    it('should return false', () => {
      const assertFalse: Consumer = value => assert.strictEqual(value, false)
      assertFalse(isNaN_(0))
      assertFalse(isNaN_(Infinity))
    })
  })
})
