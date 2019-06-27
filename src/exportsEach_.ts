import isFunction_ from './isFunction_'
import isPlainObject_ from './isPlainObject_'

// NOTE: Below function will be private in Google Apps Script.
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

// NOTE: Below statement will be removed by clasp.
export default exportsEach_
