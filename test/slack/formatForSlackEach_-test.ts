/* eslint-env mocha */

import formatForSlackEach_ from '../../src/slack/formatForSlackEach_'
import assert = require('assert')

describe('#formatForSlackEach_()', () => {
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

  describe('when indent level is not specified', () => {
    it('should return result lines for Logger, which is not indented', () => {
      const lines = formatForSlackEach_(result)
      assert.strictEqual(Object.keys(lines).length, 6)
      assert.strictEqual(lines[0], '1')
      assert.strictEqual(lines[1], '  ✓ a')
      assert.strictEqual(lines[2], '  ✗ b')
      assert.strictEqual(lines[3], '    Failed to test b')
      assert.strictEqual(lines[4], 'at foo:123')
      assert.strictEqual(lines[5], 'at bar:456')
    })
  })

  describe('when indent level is specified', () => {
    it('should return result lines for Logger, which is indented', () => {
      const lines = formatForSlackEach_(result, 1)
      assert.strictEqual(Object.keys(lines).length, 6)
      assert.strictEqual(lines[0], '  1')
      assert.strictEqual(lines[1], '    ✓ a')
      assert.strictEqual(lines[2], '    ✗ b')
      assert.strictEqual(lines[3], '      Failed to test b')
      assert.strictEqual(lines[4], 'at foo:123')
      assert.strictEqual(lines[5], 'at bar:456')
    })
  })
})
