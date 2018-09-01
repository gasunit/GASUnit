[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# GASUnit
Testing library for Google Apps Script.
Result will be logged to Logger, or posted to Slack.

## Usage
### Add library
project key: `MSnMmw8hLWgjUG6uKSTQBEzVZgzu5bsVr`

### Use Logger
```js
var test = GASUnit.test
var assert = GASUnit.assert
  
function test_reverse () {
  // This test will success.
  test('Array#indexOf() should return -1 when not present', function () {
    assert([1, 2, 3].indexOf(4) === -1)
  })

  // This test will fail.
  test('Array#indexOf() should return the index when present', function () {
    assert([1, 2, 3].indexOf(3) === 3)
  })
}
```

#### Result
![logger.png](logger.png)

### Use Slack
```js
var test = GASUnit.slack('https://...')
var assert = GASUnit.assert

function test_reverse () {
  // This test will success.
  test('Array#indexOf() should return -1 when not present', function () {
    assert([1, 2, 3].indexOf(4) === -1)
  })

  // This test will fail.
  test('Array#indexOf() should return the index when present', function () {
    assert([1, 2, 3].indexOf(3) === 3)
  })
}
```

If you're publishing source code, should **not** write webhook url as a literal.
You can use properties as environment variables.

```js
var test = GASUnit.slack(PropertiesService.getScriptProperties().getProperty('WEBHOOK_URL'))
var assert = GASUnit.assert

function test_reverse () {
  // This test will success.
  test('Array#indexOf() should return -1 when not present', function () {
    assert([1, 2, 3].indexOf(4) === -1)
  })

  // This test will fail.
  test('Array#indexOf() should return the index when present', function () {
    assert([1, 2, 3].indexOf(3) === 3)
  })
}
```

#### Result
![slack.png](slack.png)
