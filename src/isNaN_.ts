// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaNs
function isNaN_ (value: any): boolean {
  // eslint-disable-next-line no-self-compare
  return typeof value === 'number' && value !== value
}

export default isNaN_
