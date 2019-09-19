/* eslint-env mocha */

import gasunitAssert from '../src/assert'
import nodeAssert = require('assert')

type Consumer = (any) => void

describe('#assert()', () => {
  describe('when value is truthy', () => {
    it('should not throw error', () => {
      const assertDoesNotThrow: Consumer = (value: any) => {
        nodeAssert.doesNotThrow(() => {
          gasunitAssert(value)
        })
      }

      assertDoesNotThrow(true)
      assertDoesNotThrow(1)
      assertDoesNotThrow(' ')
      assertDoesNotThrow({})
      assertDoesNotThrow([])
    })
  })

  describe('when value is falsy', () => {
    it('should throw error', () => {
      const assertThrows: Consumer = (value: any) => {
        nodeAssert.throws(() => {
          gasunitAssert(value)
        },
        {
          name: 'Error',
          message: 'value is falsy.'
        })
      }

      assertThrows(false)
      assertThrows(NaN)
      assertThrows('')
      assertThrows(null)
      assertThrows(undefined)
    })
  })
})
