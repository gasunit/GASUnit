/* eslint-env mocha */

import indent_ from '../src/indent_'
import assert = require('assert')

describe('#indent_()', () => {
  describe('when level is 0', () => {
    it('should return empty string', () => {
      const value = indent_(0)
      assert.strictEqual(value, '')
    })
  })

  describe('when level is greater than 0', () => {
    it('should return indent string (by two spaces)', () => {
      const value = indent_(1)
      assert.strictEqual(value, '  ')
    })
  })
})
