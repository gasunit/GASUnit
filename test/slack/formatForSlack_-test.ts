/* eslint-env mocha */

import formatForSlack_ from '../../src/slack/formatForSlack_'
import assert = require('assert')

describe('#formatForSlack_()', () => {
  describe('when all test is passing', () => {
    const result = {
      '1': {
        'a': {
          passing: true
        },
        'b': {
          passing: true
        }
      }
    }

    it('should return success result string for Slack', () => {
      const resultString = formatForSlack_(result)
      const message = JSON.parse(resultString)

      const attachments = message.attachments
      assert.strictEqual(attachments.length, 1)
      const attachment = attachments[0]
      assert.strictEqual(attachment.color, '#4CAF50')
      const text = attachment.text
      assert.strictEqual(attachment.fallback, text)
      const lines = text.split('\n')
      assert.strictEqual(Object.keys(lines).length, 3)
      assert.strictEqual(lines[0], '1')
      assert.strictEqual(lines[1], '  ✓ a')
      assert.strictEqual(lines[2], '  ✓ b')
    })
  })

  describe('when some test is not passing', () => {
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

    it('should return fail result string for Slack', () => {
      const resultString = formatForSlack_(result)
      const message = JSON.parse(resultString)
      const attachments = message.attachments
      assert.strictEqual(attachments.length, 1)
      const attachment = attachments[0]
      assert.strictEqual(attachment.color, '#FF5722')
      const text = attachment.text
      assert.strictEqual(attachment.fallback, text)
      const lines = text.split('\n')
      assert.strictEqual(Object.keys(lines).length, 6)
      assert.strictEqual(lines[0], '1')
      assert.strictEqual(lines[1], '  ✓ a')
      assert.strictEqual(lines[2], '  ✗ b')
      assert.strictEqual(lines[3], '    Failed to test b')
      assert.strictEqual(lines[4], 'at foo:123')
      assert.strictEqual(lines[5], 'at bar:456')
    })
  })
})
