/* eslint-env mocha */

import isPlainObject_ from '../src/isPlainObject_'
import assert = require('assert')

describe('#isPlainObject_()', () => {
  describe('when argument is plain object', () => {
    it('should return true', () => {
      const obj = {}
      const value = isPlainObject_(obj)
      assert.strictEqual(value, true)
    })
  })

  describe('when argument is not plain object', () => {
    describe('when argument is null', () => {
      it('should return false', () => {
        const value = isPlainObject_(null)
        assert.strictEqual(value, false)
      })
    })
    describe('when argument is undefined', () => {
      it('should return false', () => {
        const value = isPlainObject_(undefined)
        assert.strictEqual(value, false)
      })
    })
  })
})
