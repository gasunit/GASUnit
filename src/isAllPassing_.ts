import isBoolean_ from './isBoolean_'

// NOTE: Below function will be private in Google Apps Script.
/**
* Return whether all test is passing.
*/
function isAllPassing_ (result: object): boolean {
  for (const key in result) {
    const value = result[key]
    if (isBoolean_(value.passing)) {
      const passing: boolean = value.passing
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
