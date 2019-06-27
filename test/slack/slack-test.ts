/* eslint-env mocha */

import slack from '../../src/slack/slack'
import assert = require('assert')

describe('#slack()', () => {
  it('should return object which has test functions for Slack', () => {
    const obj = slack('url')
    assert.strictEqual(typeof obj.exports, 'function')
  })
})
