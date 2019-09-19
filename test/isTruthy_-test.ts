/* eslint-env mocha */

import isTruthy_ from '../src/isTruthy_'
import assert = require('assert')

type Consumer = (any) => void

describe('#isTruthy_()', () => {
  describe('when argument is truthy', () => {
    it('should return true', () => {
      const assertTrue: Consumer = value => assert.strictEqual(value, true)
      assertTrue(isTruthy_(true))
      assertTrue(isTruthy_({}))
      assertTrue(isTruthy_([]))
      assertTrue(isTruthy_(-1))
      assertTrue(isTruthy_('false'))
      assertTrue(isTruthy_('null'))
      assertTrue(isTruthy_('undefined'))
      assertTrue(isTruthy_('0'))
      assertTrue(isTruthy_('NaN'))
    })
  })

  describe('when argument is not truthy', () => {
    it('should return false', () => {
      const assertFalse: Consumer = value => assert.strictEqual(value, false)
      assertFalse(isTruthy_(false))
      assertFalse(isTruthy_(null))
      assertFalse(isTruthy_(undefined))
      assertFalse(isTruthy_(0))
      assertFalse(isTruthy_(NaN))
      assertFalse(isTruthy_(''))
    })
  })
})
