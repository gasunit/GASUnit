// NOTE: Below function will be private in Google Apps Script.
/**
* Create indent string.
*/
function indent_ (level: number): string {
  let indent = ''
  for (let i = 0; i < level; i++) {
    indent += '  '
  }
  return indent
}

// NOTE: Below statement will be removed by clasp.
export default indent_
