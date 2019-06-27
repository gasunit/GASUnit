// NOTE: Below function will be private in Google Apps Script.
/**
* Return whether value is boolean.
*/
function isBoolean_ (value: any): boolean {
  return typeof value === 'boolean'
}

// NOTE: Below statement will be removed by clasp.
export default isBoolean_
