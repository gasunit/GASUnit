/**
* NOTE: To execute test, remove final underscore of function name temporarily.
*/

function test_exports_ () {
  exports({
    'exports(test)': {
      'should execute test by Exports style': function () {
        var originallLogger = Logger
        var originalExportsEach = exportsEach_
        var originalFormat = format_
        try {
          var argsList = []
          Logger = {
            log: function () {
              argsList.push(arguments)
            }
          }
          exportsEach_ = function (test) {
            return {
              test: test
            }
          }
          format_ = function (result) {
            return {
              result: result
            }
          }

          var test = {}
          exports(test)

          assert(argsList.length === 1)
          var args = argsList[0]
          assert(args.length === 1)
          assert(args[0].result.test === test)
        } finally {
          Logger = originallLogger
          exportsEach_ = originalExportsEach
          format_ = originalFormat
        }
      }
    }
  })
}

function test_exportsEach_ () {
  exports({
    'exportsEach_(test)': {
      'should execute test by Exports style and return result': function () {
        var test = {
          'Array': {
            '#indexOf()': {
              'should return -1 when not present': function () {
                assert([1, 2, 3].indexOf(4) === -1)
              },
              'should return the index when present': function () {
                assert([1, 2, 3].indexOf(3) === 3)
              }
            }
          }
        }
        var result = exportsEach_(test)

        assert(Object.keys(result).length === 1)
        var result2 = result['Array']
        assert(result2 !== undefined)
        assert(Object.keys(result2).length === 1)
        var result3 = result2['#indexOf()']
        assert(result3 !== undefined)
        assert(Object.keys(result3).length === 2)
        var result4a = result3['should return -1 when not present']
        assert(result4a !== undefined)
        assert(Object.keys(result4a).length === 1)
        assert(result4a.passing === true)
        assert(result4a.message === undefined)
        assert(result4a.stack === undefined)
        var result4b = result3['should return the index when present']
        assert(result4b !== undefined)
        assert(Object.keys(result4b).length === 3)
        assert(result4b.passing === false)
        assert(result4b.message !== undefined)
        assert(result4b.stack !== undefined)
      }
    }
  })
}

function test_format_ () {
  exports({
    'format_(result)': {
      'should return result string for Logger': function () {
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
        var resultString = format_(result)

        var resultLines = resultString.split('\n')
        assert(resultLines.length === 8)
        assert(resultLines[0] === '')
        assert(resultLines[1] === 'Array')
        assert(resultLines[2] === '  ' + '#indexOf()')
        assert(resultLines[3] === '    ' + '✓ should return -1 when not present')
        assert(resultLines[4] === '    ' + '✗ should return the index when present')
        assert(resultLines[5] === '      ' + 'value is falsy.')
        assert(resultLines[6] === 'at main:123')
        assert(resultLines[7] === 'at main-test:456')
      }
    }
  })
}

function test_formatEach_ () {
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
          var resultLines = formatEach_(result)

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
          var resultLines = formatEach_(result, indentLevel)

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

function test_assert_ () {
  exports({
    'assert(value)': {
      'when value is truthy': {
        'should not throw Error': function () {
          var assertNotThrow = function (value) {
            try {
              assert(value)
            } catch (e) {
              throw e
            }
          }

          assertNotThrow(true)
          assertNotThrow(1)
          assertNotThrow(' ')
          assertNotThrow({})
          assertNotThrow([])
        }
      },
      'when value is falsy': {
        'should throw Error': function () {
          var assertThrow = function (value) {
            try {
              assert(value)
            } catch (e) {
              assert(e.message === 'value is falsy.')
              return
            }
            throw new Error('Test failed')
          }

          assertThrow(false)
          assertThrow(0)
          assertThrow(NaN)
          assertThrow('')
          assertThrow(null)
          assertThrow(undefined)
        }
      }
    }
  })
}
