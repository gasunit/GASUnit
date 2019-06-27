import exportsEach_ from '../exportsEach_'
import formatForSlack_ from './formatForSlack_'
import postToSlack_ from './postToSlack_'

// NOTE: Below function will be public in Google Apps Script.
/**
* Return object which has test functions for Slack.
*/
function slack (url: string): {exports: Function} {
  return {
    exports: (suite: object) => {
      const result = exportsEach_(suite)
      const message = formatForSlack_(result)
      postToSlack_(url, message)
    }
  }
}

// NOTE: Below statement will be removed by clasp.
export default slack
