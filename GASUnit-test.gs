/**
* To execute test, remove final underscore temporarily.
*/
function test_all_ () {
  test_test_()
  test_slack_()
  test_assert_()
  test_createSuccessMessage_()
  test_createFailmessage_()
  test_postToSlack_()
}

function test_test_ () {
  test('test() success', function () {
    var originallLogger = Logger
    try {
      var argumentsList = []
      Logger = {
        log: function () {
          argumentsList.push(arguments)
        }
      }

      var name = 'test_name'
      var count = 0
      test(name, function () {
        count++
      })

      assert(count === 1)
      assert(argumentsList.length === 1)
      var arguments = argumentsList[0]
      assert(arguments.length === 1)
      assert(arguments[0] === '✓ ' + name)
    } finally {
      Logger = originallLogger
    }
  })

  test('test() fail', function () {
    var originallLogger = Logger
    try {
      var argumentsList = []
      Logger = {
        log: function () {
          argumentsList.push(arguments)
        }
      }

      var name = 'test_name'
      var e = {
        message: 'test_error_message',
        stack: 'test_error_stack'
      }
      var count = 0
      test(name, function () {
        count++
        throw e
      })

      assert(count === 1)
      assert(argumentsList.length === 1)
      var arguments = argumentsList[0]
      assert(arguments.length === 1)
      assert(arguments[0] === '✗ ' + name + '\n\t' + e.message + '\n' + e.stack)
    } finally {
      Logger = originallLogger
    }
  })
}

function test_slack_ () {
  test('slack()', function () {
    var testFunction = slack('test_url')
    assert(typeof testFunction === 'function')
  })

  test('slack() success', function () {
    var originallPostToSlack = postToSlack_
    var originalCreateSuccessMessage = createSuccessMessage_
    try {
      var argumentsList = []
      postToSlack_ = function () {
        argumentsList.push(arguments)
      }
      createSuccessMessage_ = function (name) {
        return {
          name: name
        }
      }

      var url = 'test_url'
      var testFunction = slack(url)
      var name = 'test_name'
      var count = 0
      testFunction(name, function () {
        count++
      })

      assert(count === 1)
      assert(argumentsList.length === 1)
      var arguments = argumentsList[0]
      assert(arguments.length === 2)
      assert(arguments[0] === url)
      assert(arguments[1].name === name)
    } finally {
      postToSlack_ = originallPostToSlack
      createSuccessMessage_ = originalCreateSuccessMessage
    }
  })

  test('slack() fail', function () {
    var originallPostToSlack = postToSlack_
    var originallCreateFailmessage = createFailmessage_
    try {
      var argumentsList = []
      postToSlack_ = function () {
        argumentsList.push(arguments)
      }
      createFailmessage_ = function (name, e) {
        return {
          name: name,
          e: e
        }
      }

      var url = 'test_url'
      var testFunction = slack(url)
      var name = 'test_name'
      var e = {
        message: 'test_error_message',
        stack: 'test_error_stack'
      }
      var count = 0
      testFunction(name, function () {
        count++
        throw e
      })

      assert(count === 1)
      assert(argumentsList.length === 1)
      var arguments = argumentsList[0]
      assert(arguments.length === 2)
      assert(arguments[0] === url)
      assert(arguments[1].name === name)
      assert(arguments[1].e === e)
    } finally {
      postToSlack_ = originallPostToSlack
      createFailmessage_ = originallCreateFailmessage
    }
  })
}

function test_assert_ () {
  test('assert() success', function () {
    var assertSuccess = function (value) {
      try {
        assert(value)
      } catch (e) {
        throw new Error('Test failed')
      }
    }
    assertSuccess(true)
    assertSuccess(1)
    assertSuccess(' ')
    assertSuccess({})
    assertSuccess([])
  })

  test('assert() fail', function () {
    var assertFail = function (value) {
      try {
        assert(value)
      } catch (e) {
        assert(e.message === 'value is falsy.')
        return
      }
      throw new Error('Test failed')
    }
    assertFail(false)
    assertFail(0)
    assertFail(NaN)
    assertFail('')
    assertFail(null)
    assertFail(undefined)
  })
}

function test_createSuccessMessage_ () {
  test('createSuccessMessage_()', function () {
    var name = 'test_name'
    var message = createSuccessMessage_(name)

    assert(typeof message === 'string')
    var messageObj = JSON.parse(message)
    assert(messageObj instanceof Object)
    assert(hasKeys_(messageObj, ['attachments']))
    var attachments = messageObj.attachments
    assert(Array.isArray(attachments))
    assert(attachments.length === 1)
    var attachment = attachments[0]
    assert(hasKeys_(attachment, ['fallback', 'color', 'text']))
    assert(attachment.fallback === '✓ ' + name)
    assert(attachment.color === '#4CAF50')
    assert(attachment.text === '✓ ' + name)
  })
}

function test_createFailmessage_ () {
  test('createFailmessage_()', function () {
    var name = 'test_name'
    var e = {
      message: 'test_error_message',
      stack: 'test_error_stack'
    }
    var message = createFailmessage_(name, e)

    assert(typeof message === 'string')
    var messageObj = JSON.parse(message)
    assert(messageObj instanceof Object)
    assert(hasKeys_(messageObj, ['attachments']))
    var attachments = messageObj.attachments
    assert(Array.isArray(attachments))
    assert(attachments.length === 1)
    var attachment = attachments[0]
    assert(hasKeys_(attachment, ['fallback', 'color', 'text']))
    assert(attachment.fallback === '✗ ' + name + '\n\t' + e.message + '\n' + e.stack)
    assert(attachment.color === '#FF5722')
    assert(attachment.text === '✗ ' + name + '\n\t' + e.message + '\n' + e.stack)
  })
}

function test_postToSlack_ () {
  test('postToSlack_()', function () {
    var originallUrlFetchApp = UrlFetchApp
    try {
      var argumentsList = []
      UrlFetchApp = {
        fetch: function () {
          argumentsList.push(arguments)
        }
      }

      var url = 'test_url'
      var message = 'test_message'
      postToSlack_(url, message)

      assert(argumentsList.length === 1)
      var arguments = argumentsList[0]
      assert(arguments.length === 2)
      assert(arguments[0] === url)
      var params = arguments[1]
      assert(hasKeys_(params, ['method', 'payload', 'headers']))
      assert(params.method === 'POST')
      assert(params.payload === message)
      var headers = params.headers
      assert(hasKeys_(headers, ['Content-Type']))
      assert(headers['Content-Type'] === 'application/json')
    } finally {
      UrlFetchApp = originallUrlFetchApp
    }
  })
}

function hasKeys_ (obj, keys) {
  return keys.every(function (key) {
    return obj[key] !== undefined
  })
}