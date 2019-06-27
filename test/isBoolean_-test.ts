/* eslint-env mocha */

import isBoolean_ from '../src/isBoolean_'
import assert = require('assert')

describe('#isBoolean_()', () => {
  describe('when argument is boolean', () => {
    it('should return true', () => {
      const value = isBoolean_(true)
      assert.strictEqual(value, true)
    })
  })

  describe('when argument is not boolean', () => {
    it('should return false', () => {
      const value = isBoolean_('true')
      assert.strictEqual(value, false)
    })
  })
})
