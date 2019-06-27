// NOTE: Below function will be private in Google Apps Script.
/**
* Return whether value is plain object.
*/
function isPlainObject_ (value: any): boolean {
  return value !== null &&
    value !== undefined &&
      Object.prototype.toString.call(value) === '[object Object]'
}

// NOTE: Below statement will be removed by clasp.
export default isPlainObject_
