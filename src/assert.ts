// NOTE: Below function will be public in Google Apps Script.
/**
* Test whether value is truthy.
*/
function assert (value: any) {
  if (!value) {
    throw new Error('value is falsy.')
  }
}

// NOTE: Below statement will be removed by clasp.
export default assert
