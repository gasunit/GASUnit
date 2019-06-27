/* eslint-env mocha */

import format_ from '../src/format_'
import assert = require('assert')

describe('#format_()', () => {
  it('should return result string for Logger', () => {
    const result = {
      '1': {
        'a': {
          passing: true
        },
        'b': {
          passing: false,
          message: 'Failed to test b',
          stack: 'at foo:123\nat bar:456'
        }
      }
    }
    const lines = format_(result).split('\n')

    assert.strictEqual(Object.keys(lines).length, 7)
    assert.strictEqual(lines[0], '')
    assert.strictEqual(lines[1], '1')
    assert.strictEqual(lines[2], '  ✓ a')
    assert.strictEqual(lines[3], '  ✗ b')
    assert.strictEqual(lines[4], '    Failed to test b')
    assert.strictEqual(lines[5], 'at foo:123')
    assert.strictEqual(lines[6], 'at bar:456')
  })
})
