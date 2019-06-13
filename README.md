[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# GASUnit
Testing library for Google Apps Script.
Result will be logged to Logger, or posted to Slack.
You can use **Exports** style to write tests (for now).

## Usage
### Add library
project key: `MSnMmw8hLWgjUG6uKSTQBEzVZgzu5bsVr`

### Write tests
#### Exports style
Exports style is inspired by [Mocha](https://mochajs.org/#exports).

Use Logger:

```js
var exports = GASUnit.exports
var assert = GASUnit.assert

function test_array () {
  exports({
    'Array': {
      '#indexOf()': {
        'should return -1 when not present': function () {
          assert([1, 2, 3].indexOf(4) === -1)
        },
        'should return the index when present': function () {
          assert([1, 2, 3].indexOf(3) === 3)
        }
      }
    }
  })
}
```

Use Slack:

```js
var WEBHOOK_URL = 'https://...'
var exports = GASUnit.slack(WEBHOOK_URL).exports
var assert = GASUnit.assert

function test_array () {
  exports({
    'Array': {
      '#indexOf()': {
        'should return -1 when not present': function () {
          assert([1, 2, 3].indexOf(4) === -1)
        },
        'should return the index when present': function () {
          assert([1, 2, 3].indexOf(3) === 3)
        }
      }
    }
  })
}
```

If you're publishing source code, should **not** write webhook url as a literal.
You can use properties as environment variables.

```js
var WEBHOOK_URL = PropertiesService.getScriptProperties().getProperty('WEBHOOK_URL')
var exports = GASUnit.slack(WEBHOOK_URL).exports
var assert = GASUnit.assert

function test_array () {
  exports({
    'Array': {
      '#indexOf()': {
        'should return -1 when not present': function () {
          assert([1, 2, 3].indexOf(4) === -1)
        },
        'should return the index when present': function () {
          assert([1, 2, 3].indexOf(3) === 3)
        }
      }
    }
  })
}
```

Or you can...

```js
var WEBHOOK_URL = PropertiesService.getScriptProperties().getProperty('WEBHOOK_URL')
var exports = WEBHOOK_URL ? GASUnit.slack(WEBHOOK_URL).exports : GASUnit.exports
var assert = GASUnit.assert

function test_array () {
  exports({
    'Array': {
      '#indexOf()': {
        'should return -1 when not present': function () {
          assert([1, 2, 3].indexOf(4) === -1)
        },
        'should return the index when present': function () {
          assert([1, 2, 3].indexOf(3) === 3)
        }
      }
    }
  })
}
```

## Assertion
GASUnit provides minimum assert function which verify whether value is truthy.
You can use any assertion library, such as [AssertGAS](https://github.com/gasunit/AssertGAS).

## Development
```sh
# install dependencies
$ npm install

# lint code by ESLint
$ npm run lint

# login to Google Drive
$ npm run login

# logout from Google Drive
$ npm run logout

# pull code from Google Drive
$ npm run pull

# push code to Google Drive
$ npm run push

# open project page on Google Drive
$ npm run open
```

## Example
see [gasunit/example](https://github.com/gasunit/example)

## Article
* [Google Apps Script用のテストライブラリ「GASUnit」の紹介 - Qiita](https://qiita.com/munieru_jp/items/101ee00c6906847df750)
