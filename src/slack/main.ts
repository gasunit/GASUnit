import exportsEach_ from '../exportsEach_'
import indent_ from '../indent_'
import isAllPassing_ from '../isAllPassing_'
import isBoolean_ from '../isBoolean_'

/**
* Return object which has test functions for Slack.
*/
/* eslint-disable-next-line no-unused-vars */
function slack (url: string): object {
  return {
    exports: function (suite: object) {
      var result = exportsEach_(suite)
      postToSlack_(url, formatForSlack_(result))
    }
  }
}

/**
* Create result string for Slack.
*/
function formatForSlack_ (result: object): string {
  var lines = formatForSlackEach_(result)
  var text = lines.join('\n')
  var allPassing = isAllPassing_(result)
  var color = allPassing ? '#4CAF50' : '#FF5722'
  var message = {
    attachments: [
      {
        fallback: text,
        color: color,
        text: text
      }
    ]
  }
  return JSON.stringify(message)
}

/**
* Create result lines for Slack.
*/
function formatForSlackEach_ (result: object, indentLevel = 0): string[] {
  var lines = []
  for (var key in result) {
    var value = result[key]
    var passing = value.passing
    if (isBoolean_(passing)) {
      if (passing) {
        lines.push(indent_(indentLevel) + '✓ ' + key)
      } else {
        lines.push(indent_(indentLevel) + '✗ ' + key)
        var message = value.message
        if (message) {
          lines.push(indent_(indentLevel + 1) + message)
        }
        var stack = value.stack
        if (stack) {
          var stackLines = stack.split('\n')
          lines = lines.concat(stackLines)
        }
      }
    } else {
      lines.push(indent_(indentLevel) + key)
      var innerLines = formatForSlackEach_(value, indentLevel + 1)
      lines = lines.concat(innerLines)
    }
  }
  return lines
}

/**
* Post message to Slack.
*/
function postToSlack_ (url: string, message: string) {
  var params = {
    method: 'post' as 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    payload: message
  }
  UrlFetchApp.fetch(url, params)
}
