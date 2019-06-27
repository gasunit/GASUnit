/* eslint-env mocha */

import isAllPassing_ from '../src/isAllPassing_'
import assert = require('assert')

describe('#isAllPassing_()', () => {
  describe('when result object does not contain fail', () => {
    it('should return true', () => {
      const result = {
        'test 1': {
          passing: true
        }
      }
      const value = isAllPassing_(result)
      assert.strictEqual(value, true)
    })
  })

  describe('when result object contains fail', () => {
    it('should return false', () => {
      const result = {
        'test 1': {
          passing: true
        },
        'test 2': {
          'test 2-1': {
            passing: true
          },
          'test 2-2': {
            passing: false
          }
        }
      }
      const value = isAllPassing_(result)
      assert.strictEqual(value, false)
    })
  })
})
