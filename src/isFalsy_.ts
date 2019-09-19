// see https://developer.mozilla.org/en-US/docs/Glossary/Falsy
function isFalsy_ (value: any): boolean {
  return value === false ||
    value === null ||
    value === undefined ||
    value === 0 ||
    Number.isNaN(value) ||
    value === ''
}

export default isFalsy_
