import exportsEach_ from './exportsEach_'
import format_ from './format_'

// NOTE: Below function will be public in Google Apps Script.
/**
* Execute test bys Exports style.
*
*   exports({
*     'Array': {
*       '#indexOf()': {
*         'should return -1 when not present': function () {
*           assert([1, 2, 3].indexOf(4) === -1)
*         },
*         'should return the index when present': function () {
*           assert([1, 2, 3].indexOf(3) === 3)
*         }
*       }
*     }
*   })
*/
// @ts-ignore: Duplicate identifier 'exports'.
function exports (suite: object): void {
  const result = exportsEach_(suite)
  const message = format_(result)
  Logger.log(message)
}

// NOTE: Below statement will be removed by clasp.
export default exports
