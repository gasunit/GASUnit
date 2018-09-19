/**
* NOTE: To execute test, remove final underscore of function name temporarily.
*/

/* eslint-disable-next-line no-unused-vars, camelcase */
function test_slack_ () {
  exports({
    'slack(url)': {
      'should return object which has test functions for Slack': function () {
        var obj = slack('test_url')

        assert(typeof obj.exports === 'function')
      },
      'exports(obj)': {
        'should execute test by Exports style': function () {
          var originallPostToSlack = postToSlack_
          var originalExportsEach = exportsEach_
          var originalFormatForSlack = formatForSlack_
          try {
            var argsList = []
            postToSlack_ = function () {
              argsList.push(arguments)
            }
            exportsEach_ = function (suite) {
              return {
                suite: suite
              }
            }
            formatForSlack_ = function (result) {
              return {
                result: result
              }
            }

            var url = 'test_url'
            var exportsFunction = slack(url).exports
            var suite = {}
            exportsFunction(suite)

            assert(argsList.length === 1)
            var args = argsList[0]
            assert(args.length === 2)
            assert(args[0] === url)
            assert(args[1].result.suite === suite)
          } finally {
            postToSlack_ = originallPostToSlack
            exportsEach_ = originalExportsEach
            formatForSlack_ = originalFormatForSlack
          }
        }
      }
    }
  })
}

/* eslint-disable-next-line no-unused-vars, camelcase */
function test_formatForSlack_ () {
  exports({
    'formatForSlack_(result)': {
      'when all test is passing': {
        'should return success result string for Slack': function () {
          var result = {
            'Array': {
              '#indexOf()': {
                'should return -1 when not present': {
                  passing: true
                },
                'should return the index when present': {
                  passing: true
                }
              }
            }
          }
          var resultString = formatForSlack_(result)

          var message = JSON.parse(resultString)
          var attachments = message.attachments
          assert(attachments.length === 1)
          var attachment = attachments[0]
          assert(attachment.color === '#4CAF50')
          var text = attachment.text
          assert(attachment.fallback === text)
          var textLines = text.split('\n')
          assert(textLines.length === 4)
          assert(textLines[0] === 'Array')
          assert(textLines[1] === '  ' + '#indexOf()')
          assert(textLines[2] === '    ' + '✓ should return -1 when not present')
          assert(textLines[3] === '    ' + '✓ should return the index when present')
        }
      },
      'when not all test is passing': {
        'should return fail result string for Slack': function () {
          var result = {
            'Array': {
              '#indexOf()': {
                'should return -1 when not present': {
                  passing: true
                },
                'should return the index when present': {
                  passing: false,
                  message: 'value is falsy.',
                  stack: 'at main:123\nat main-test:456'
                }
              }
            }
          }
          var resultString = formatForSlack_(result)

          var message = JSON.parse(resultString)
          var attachments = message.attachments
          assert(attachments.length === 1)
          var attachment = attachments[0]
          assert(attachment.color === '#FF5722')
          var text = attachment.text
          assert(attachment.fallback === text)
          var textLines = text.split('\n')
          assert(textLines.length === 7)
          assert(textLines[0] === 'Array')
          assert(textLines[1] === '  ' + '#indexOf()')
          assert(textLines[2] === '    ' + '✓ should return -1 when not present')
          assert(textLines[3] === '    ' + '✗ should return the index when present')
          assert(textLines[4] === '      ' + 'value is falsy.')
          assert(textLines[5] === 'at main:123')
          assert(textLines[6] === 'at main-test:456')
        }
      }
    }
  })
}

/* eslint-disable-next-line no-unused-vars, camelcase */
function test_formatForSlackEach_ () {
  var result = {
    'Array': {
      '#indexOf()': {
        'should return -1 when not present': {
          passing: true
        },
        'should return the index when present': {
          passing: false,
          message: 'value is falsy.',
          stack: 'at main:123\nat main-test:456'
        }
      }
    }
  }

  exports({
    'formatEach_(obj, indentLevel)': {
      'when indent level is not specified': {
        'should return result line array for Logger, which is not indented': function () {
          var resultLines = formatForSlackEach_(result)

          assert(resultLines.length === 7)
          assert(resultLines[0] === 'Array')
          assert(resultLines[1] === '  ' + '#indexOf()')
          assert(resultLines[2] === '    ' + '✓ should return -1 when not present')
          assert(resultLines[3] === '    ' + '✗ should return the index when present')
          assert(resultLines[4] === '      ' + 'value is falsy.')
          assert(resultLines[5] === 'at main:123')
          assert(resultLines[6] === 'at main-test:456')
        }
      },
      'when indent level is specified': {
        'should return result line array for Logger, which is indented': function () {
          var indentLevel = 1
          var resultLines = formatForSlackEach_(result, indentLevel)

          assert(resultLines.length === 7)
          var indent = indent_(indentLevel)
          assert(resultLines[0] === indent + 'Array')
          assert(resultLines[1] === indent + '  ' + '#indexOf()')
          assert(resultLines[2] === indent + '    ' + '✓ should return -1 when not present')
          assert(resultLines[3] === indent + '    ' + '✗ should return the index when present')
          assert(resultLines[4] === indent + '      ' + 'value is falsy.')
          assert(resultLines[5] === 'at main:123')
          assert(resultLines[6] === 'at main-test:456')
        }
      }
    }
  })
}

/* eslint-disable-next-line no-unused-vars, camelcase */
function test_postToSlack_ () {
  exports({
    'postToSlack_(url, message)': {
      'should post message to Slack': function () {
        var originallUrlFetchApp = UrlFetchApp
        try {
          var argsList = []
          /* eslint-disable-next-line no-global-assign */
          UrlFetchApp = {
            fetch: function () {
              argsList.push(arguments)
            }
          }

          var url = 'test_url'
          var message = 'test_message'
          postToSlack_(url, message)

          assert(argsList.length === 1)
          var args = argsList[0]
          assert(args.length === 2)
          assert(args[0] === url)
          var params = args[1]
          assert(params.method === 'POST')
          assert(params.payload === message)
          var headers = params.headers
          assert(headers['Content-Type'] === 'application/json')
        } finally {
          /* eslint-disable-next-line no-global-assign */
          UrlFetchApp = originallUrlFetchApp
        }
      }
    }
  })
}
