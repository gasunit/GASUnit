import formatEach_ from './formatEach_'

// NOTE: Below function will be private in Google Apps Script.
/**
* Create result string for Logger.
*/
function format_ (result: object) :string {
  var lines = formatEach_(result)
  return '\n' + lines.join('\n')
}

// NOTE: Below statement will be removed by clasp.
export default format_
