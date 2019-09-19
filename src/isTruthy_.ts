import isFalsy_ from './isFalsy_'

// see https://developer.mozilla.org/en-US/docs/Glossary/Truthy
function isTruthy_ (value: any): boolean {
  return !isFalsy_(value)
}

export default isTruthy_
