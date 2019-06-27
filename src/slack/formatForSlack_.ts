import formatForSlackEach_ from './formatForSlackEach_'
import isAllPassing_ from '../isAllPassing_'

// NOTE: Below function will be private in Google Apps Script.
/**
* Create result string for Slack.
*/
function formatForSlack_ (result: object): string {
  var lines = formatForSlackEach_(result)
  var text = lines.join('\n')
  var allPassing = isAllPassing_(result)
  var color = allPassing ? '#4CAF50' : '#FF5722'
  var message = {
    attachments: [
      {
        fallback: text,
        color: color,
        text: text
      }
    ]
  }
  return JSON.stringify(message)
}

// NOTE: Below statement will be removed by clasp.
export default formatForSlack_
