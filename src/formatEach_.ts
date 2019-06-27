import indent_ from './indent_'
import isBoolean_ from './isBoolean_'

// NOTE: Below function will be private in Google Apps Script.
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

// NOTE: Below statement will be removed by clasp.
export default formatEach_
