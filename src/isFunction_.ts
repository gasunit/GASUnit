// NOTE: Below function will be private in Google Apps Script.
/**
* Return whether value is function.
*/
function isFunction_ (value: any): boolean {
  return typeof value === 'function'
}

// NOTE: Below statement will be removed by clasp.
export default isFunction_
