/* eslint-env mocha */

import isFalsy_ from '../src/isFalsy_'
import assert = require('assert')

describe('#isFalsy_()', () => {
  describe('when argument is falsy', () => {
    it('should return true', () => {
      const assertTrue = value => assert.strictEqual(value, true)
      assertTrue(isFalsy_(false))
      assertTrue(isFalsy_(null))
      assertTrue(isFalsy_(undefined))
      assertTrue(isFalsy_(0))
      assertTrue(isFalsy_(NaN))
      assertTrue(isFalsy_(''))
    })
  })

  describe('when argument is not falsy', () => {
    it('should return false', () => {
      const assertFalse = value => assert.strictEqual(value, false)
      assertFalse(isFalsy_(true))
      assertFalse(isFalsy_({}))
      assertFalse(isFalsy_([]))
      assertFalse(isFalsy_(-1))
      assertFalse(isFalsy_('false'))
      assertFalse(isFalsy_('null'))
      assertFalse(isFalsy_('undefined'))
      assertFalse(isFalsy_('0'))
      assertFalse(isFalsy_('NaN'))
    })
  })
})
