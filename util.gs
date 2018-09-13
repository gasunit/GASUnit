/**
* Return whether value is plain object.
* @param {Object} value
* @return {Boolean} whether value is plain object
*/
function isPlainObject_ (value) {
  return value !== null &&
    value !== undefined &&
      Object.prototype.toString.call(value) === '[object Object]'
}

/**
* Return whether value is boolean.
* @param {Object} value
* @return {Boolean} whether value is boolean
*/
function isBoolean_ (value) {
  return typeof value === 'boolean'
}

/**
* Return whether value is function.
* @param {Object} value
* @return {Boolean} whether value is function
*/
function isFunction_ (value) {
  return typeof value === 'function'
}

/**
* Create indent string.
* @param {Number} level - indent level
* @return {String} indent string
*/
function indent_ (level) {
  var indent = ''
  for (var i = 0; i < level; i++) {
    indent += '  '
  }
  return indent
}

/**
* Return whether all test is passing.
* @param {Object} result
* @return {Boolean} whether all test is passing
*/
function isAllPassing_ (result) {
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
