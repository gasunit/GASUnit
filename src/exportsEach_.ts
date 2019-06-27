import isFunction_ from './isFunction_'
import isPlainObject_ from './isPlainObject_'

// NOTE: Below function will be private in Google Apps Script.
/**
* Execute test by Exports style and return result.
*/
function exportsEach_ (suite: object): object {
  Object.keys(suite).forEach(key => {
    if (isPlainObject_(suite[key])) {
      const innerSuite: object = suite[key]
      suite[key] = exportsEach_(innerSuite)
      return
    }
    if (isFunction_(suite[key])) {
      const func: Function = suite[key]
      try {
        func()
      } catch (e) {
        suite[key] = {
          passing: false,
          message: e.message,
          stack: e.stack
        }
        return
      }
      suite[key] = {
        passing: true
      }
    }
  })
  return suite
}

// NOTE: Below statement will be removed by clasp.
export default exportsEach_
