import formatForSlackEach_ from './formatForSlackEach_'
import isAllPassing_ from '../isAllPassing_'

// NOTE: Below function will be private in Google Apps Script.
/**
* Create result string for Slack.
*/
function formatForSlack_ (result: object): string {
  const lines = formatForSlackEach_(result)
  const text = lines.join('\n')
  const color = isAllPassing_(result) ? '#4CAF50' : '#FF5722'
  const message = {
    attachments: [
      {
        fallback: text,
        color,
        text
      }
    ]
  }
  return JSON.stringify(message)
}

// NOTE: Below statement will be removed by clasp.
export default formatForSlack_
