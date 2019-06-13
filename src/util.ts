/**
* Return whether value is plain object.
*/
/* eslint-disable-next-line no-unused-vars */
function isPlainObject_ (value: any): boolean {
  return value !== null &&
    value !== undefined &&
      Object.prototype.toString.call(value) === '[object Object]'
}

/**
* Return whether value is boolean.
*/
function isBoolean_ (value: any): boolean {
  return typeof value === 'boolean'
}

/**
* Return whether value is function.
*/
/* eslint-disable-next-line no-unused-vars */
function isFunction_ (value: any): boolean {
  return typeof value === 'function'
}

/**
* Create indent string.
*/
/* eslint-disable-next-line no-unused-vars */
function indent_ (level: number): string {
  var indent = ''
  for (var i = 0; i < level; i++) {
    indent += '  '
  }
  return indent
}

/**
* Return whether all test is passing.
*/
/* eslint-disable-next-line no-unused-vars */
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
