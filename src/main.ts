/**
* Execute test by Exports style.
*
*   exports({
*     'Array': {
*       '#indexOf()': {
*         'should return -1 when not present': function () {
*           assert([1, 2, 3].indexOf(4) === -1)
*         },
*         'should return the index when present': function () {
*           assert([1, 2, 3].indexOf(3) === 3)
*         }
*       }
*     }
*   })
*/
/* eslint-disable no-unused-vars */
// @ts-ignore: Duplicate identifier 'exports'.
function exports (suite: object) {
  var result = exportsEach_(suite)
  Logger.log(format_(result))
}
/* eslint-enable no-unused-vars */

/**
* Execute test by Exports style and return result.
*/
function exportsEach_ (suite: object) :object {
  for (var key in suite) {
    var value = suite[key]
    if (isPlainObject_(value)) {
      suite[key] = exportsEach_(value)
      continue
    }
    if (isFunction_(value)) {
      try {
        value()
      } catch (e) {
        suite[key] = {
          passing: false,
          message: e.message,
          stack: e.stack
        }
        continue
      }
      suite[key] = {
        passing: true
      }
    }
  }
  return suite
}

/**
* Create result string for Logger.
*/
function format_ (result: object) :string {
  var lines = formatEach_(result)
  return '\n' + lines.join('\n')
}

/**
* Create result lines for Logger.
*/
function formatEach_ (result: object, indentLevel = 0) :string[] {
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
      var innerLines = formatEach_(value, indentLevel + 1)
      lines = lines.concat(innerLines)
    }
  }
  return lines
}

/**
* Test whether value is truthy.
*/
/* eslint-disable-next-line no-unused-vars */
function assert (value: any) {
  if (!value) {
    throw new Error('value is falsy.')
  }
}
