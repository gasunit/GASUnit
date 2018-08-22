/**
* Execute test using Logger.
* @param {String} name
* @param {Function} tester
*/
function test (name, tester) {
  try {
    tester()
  } catch (e) {
    Logger.log('✗ ' + name + '\n\t' + e.message + '\n' + e.stack)
    return
  }
  Logger.log('✓ ' + name)
}

/**
* Return test function using Slack.
* @param {String} url - Webhook URL
* @return {Function} test function
*/
function slack (url) {
  return function (name, tester) {
    try {
      tester()
    } catch (e) {
      postToSlack_(url, createFailmessage_(name, e))
      return
    }
    postToSlack_(url, createSuccessMessage_(name))
  }
}

/**
* Test whether value is truthy.
* @param {Object} value
* @throws {Error} when value is falsy
*/
function assert (value) {
  if (!value) {
    throw new Error('value is falsy.')
  }
}

/**
* Create success message for Slack.
* @param {String} name
* @return {String} message
*/
function createSuccessMessage_ (name) {
  var text = '✓ ' + name
  var message = {
    attachments: [
      {
        fallback: text,
        color: '#4CAF50',
        text: text
      }
    ]
  }
  return JSON.stringify(message)
}

/**
* Create fail message for Slack.
* @param {String} name
* @param {Error} e
* @return {String} message
*/
function createFailmessage_ (name, e) {
  var text = '✗ ' + name + '\n\t' + e.message + '\n' + e.stack
  var message = {
    attachments: [
      {
        fallback: text,
        color: '#FF5722',
        text: text
      }
    ]
  }
  return JSON.stringify(message)
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