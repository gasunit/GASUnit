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
* 
* @param {Object} test
*/
function exports (test) {
  var result = exportsEach_(test)
  Logger.log(format_(result))
}

/**
* Execute test by Exports style and return result.
* @param {Object} test
* @return {Object} result
*/
function exportsEach_ (test) {
  for (var key in test) {
    var value = test[key]
    if (isPlainObject_(value)) {
      test[key] = exportsEach_(value)
      continue
    }
    if (isFunction_(value)) {
      try {
        value()
      } catch (e) {
        test[key] = {
          passing: false,
          message: e.message,
          stack: e.stack
        }
        continue
      }
      test[key] = {
        passing: true
      }
    }
  }
  return test
}

/**
* Create result string for Logger.
* @param {Object} result
* @return {String} result string
*/
function format_ (result) {
  var lines = formatEach_(result)
  return '\n' + lines.join('\n')
}

/**
* Create result lines for Logger.
* @param {Object} result
* @param {Number} indentLevel
* @return {String[]} result lines
*/
function formatEach_ (result, indentLevel) {
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
      var innerLines = formatEach_(value, indentLevel + 1)
      lines = lines.concat(innerLines)
    }
  }
  return lines
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
