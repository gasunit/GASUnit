import isNaN_ from './isNaN_'

// see https://developer.mozilla.org/en-US/docs/Glossary/Falsy
function isFalsy_ (value: any): boolean {
  return value === false ||
    value === null ||
    value === undefined ||
    value === 0 ||
    isNaN_(value) ||
    value === ''
}

export default isFalsy_
