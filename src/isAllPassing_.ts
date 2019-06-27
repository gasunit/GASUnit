import isBoolean_ from './isBoolean_'

// NOTE: Below function will be private in Google Apps Script.
/**
* Return whether all test is passing.
*/
function isAllPassing_ (result: object): boolean {
  for (var key in result) {
    var value = result[key]
    var passing = value.passing
    if (isBoolean_(passing)) {
      if (!passing) {
        return false
      }
    } else {
      if (!isAllPassing_(value)) {
        return false
      }
    }
  }
  return true
}

// NOTE: Below statement will be removed by clasp.
export default isAllPassing_
