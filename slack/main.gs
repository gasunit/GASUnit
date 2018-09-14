/**
* Return object which has test functions for Slack.
* @param {String} url - Webhook URL
* @return {Object} object which has test functions for Slack
*/
function slack (url) {
  return {
    exports: function (suite) {
      var result = exportsEach_(suite)
      postToSlack_(url, formatForSlack_(result))
    }
  }
}

/**
* Create result string for Slack.
* @param {Object} result
* @return {String} result string
*/
function formatForSlack_ (result) {
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
* @param {Object} result
* @param {Number} indentLevel
* @return {String[]} result lines
*/
function formatForSlackEach_ (result, indentLevel) {
  indentLevel = indentLevel || 0
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
* @param {String} url - Webhook URL
* @param {String} message
*/
function postToSlack_ (url, message) {
  var params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    payload: message
  }
  UrlFetchApp.fetch(url, params)
}
