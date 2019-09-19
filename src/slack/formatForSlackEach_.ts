import indent_ from '../indent_'
import isBoolean_ from '../isBoolean_'
import isTruthy_ from '../isTruthy_'

// NOTE: Below function will be private in Google Apps Script.
/**
* Create result lines for Slack.
*/
function formatForSlackEach_ (result: object, indentLevel = 0): string[] {
  const lines: string[] = []
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isBoolean_(value.passing)) {
      const passing: boolean = value.passing
      if (passing) {
        lines.push(indent_(indentLevel) + '✓ ' + key)
      } else {
        lines.push(indent_(indentLevel) + '✗ ' + key)
        const message: string = value.message
        if (isTruthy_(message)) {
          lines.push(indent_(indentLevel + 1) + message)
        }
        const stack: string = value.stack
        if (isTruthy_(stack)) {
          const stackLines = stack.split('\n')
          stackLines.forEach(line => lines.push(line))
        }
      }
    } else {
      lines.push(indent_(indentLevel) + key)
      const innerLines = formatForSlackEach_(value, indentLevel + 1)
      innerLines.forEach(line => lines.push(line))
    }
  })
  return lines
}

// NOTE: Below statement will be removed by clasp.
export default formatForSlackEach_
