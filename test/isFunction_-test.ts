/* eslint-env mocha */

import isFunction_ from '../src/isFunction_'
import assert = require('assert')

describe('#isFunction_()', () => {
  describe('when argument is function', () => {
    describe('by function declaration', () => {
      it('should return true', () => {
        function func () {
          // This is function
        }
        const value = isFunction_(func)
        assert.strictEqual(value, true)
      })
    })
    describe('by function expression', () => {
      it('should return true', () => {
        const func = function () {
          // This is function
        }
        const value = isFunction_(func)
        assert.strictEqual(value, true)
      })
    })
    describe('by arrow function', () => {
      it('should return true', () => {
        const func = () => {
          // This is function
        }
        const value = isFunction_(func)
        assert.strictEqual(value, true)
      })
    })
  })

  describe('when argument is not function', () => {
    it('should return false', () => {
      const string = 'function () { /* This is not function */}'
      const value = isFunction_(string)
      assert.strictEqual(value, false)
    })
  })
})
