// NOTE: Below function will be private in Google Apps Script.
/**
* Post message to Slack.
*/
function postToSlack_ (url: string, message: string) {
  var params = {
    method: 'post' as 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    payload: message
  }
  UrlFetchApp.fetch(url, params)
}

// NOTE: Below statement will be removed by clasp.
export default postToSlack_
