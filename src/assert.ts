import isFalsy_ from './isFalsy_'

// NOTE: Below function will be public in Google Apps Script.
/**
* Test whether value is truthy.
*/
function assert (value: any): void {
  if (isFalsy_(value)) {
    throw new Error('value is falsy.')
  }
}

// NOTE: Below statement will be removed by clasp.
export default assert
