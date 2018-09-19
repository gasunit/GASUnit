/**
* NOTE: To execute test, remove final underscore of function name temporarily.
*/

/* eslint-disable-next-line no-unused-vars, camelcase */
function test_isPlainObject_ () {
  exports({
    'isPlainObject_(value)': {
      'when value is plain object': {
        'should return true': function () {
          assert(isPlainObject_({}) === true)
          assert(isPlainObject_({ foo: 'Foo' }) === true)
        }
      },
      'when value is not plain object': {
        'should return false': function () {
          assert(isPlainObject_(null) === false)
          assert(isPlainObject_(undefined) === false)
          assert(isPlainObject_([]) === false)
          assert(isPlainObject_(JSON) === false)
          assert(isPlainObject_(JSON.stringify) === false)
        }
      }
    }
  })
}

/* eslint-disable-next-line no-unused-vars, camelcase */
function test_isBoolean_ () {
  exports({
    'isBoolean_(value)': {
      'when value is boolean': {
        'should return true': function () {
          assert(isBoolean_(true) === true)
          assert(isBoolean_(false) === true)
        }
      },
      'when value is not boolean': {
        'should return false': function () {
          assert(isBoolean_(null) === false)
          assert(isBoolean_(undefined) === false)
        }
      }
    }
  })
}

/* eslint-disable-next-line no-unused-vars, camelcase */
function test_isFunction_ () {
  exports({
    'isFunction_(value)': {
      'when value is function': {
        'should return true': function () {
          assert(isFunction_(JSON.stringify) === true)
          var func = function () {
            Logger.log('this is function')
          }
          assert(isFunction_(func) === true)
        }
      },
      'when value is not function': {
        'should return false': function () {
          assert(isFunction_(JSON) === false)
        }
      }
    }
  })
}

/* eslint-disable-next-line no-unused-vars, camelcase */
function test_indent_ () {
  exports({
    'indent_(level)': {
      'should return indent string': function () {
        assert(indent_(0) === '')
        assert(indent_(1) === '  ')
        assert(indent_(2) === '    ')
      }
    }
  })
}

/* eslint-disable-next-line no-unused-vars, camelcase */
function test_isAllPassing_ () {
  exports({
    'isAllPassing_(result)': {
      'when all test is passing': {
        'should return true': function () {
          var result = {
            'Array': {
              '#indexOf()': {
                'should return -1 when not present': {
                  passing: true
                },
                'should return the index when present': {
                  passing: true
                }
              }
            }
          }

          assert(isAllPassing_(result) === true)
        }
      },
      'when not all test is passing': {
        'should return false': function () {
          var result = {
            'Array': {
              '#indexOf()': {
                'should return -1 when not present': {
                  passing: true
                },
                'should return the index when present': {
                  passing: false,
                  message: 'value is falsy.',
                  stack: 'at main:123\nat main-test:456'
                }
              }
            }
          }

          assert(isAllPassing_(result) === false)
        }
      }
    }
  })
}
