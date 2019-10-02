[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)
[![tested by ts-mocha](https://img.shields.io/badge/tested%20by-ts--mocha-%238d6748)](https://github.com/piotrwitek/ts-mocha)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

**English** - [日本語](README.ja.md)

# GASUnit
![banner](.doc/banner.png)

Testing library for Google Apps Script.  
Result will be logged to Logger, or posted to Slack.

## Usage
### Add library
project key: `MSnMmw8hLWgjUG6uKSTQBEzVZgzu5bsVr`

### Write tests
You can use **Exports** style to write tests (for now).

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
You can use any assertion library (for Google Apps Script).  
GASUnit also provides [AssertGAS](https://github.com/gasunit/AssertGAS) as official assertion library.

## Badge
You can use the badge to show that your project is using GASUnit.

[![tested by GASUnit](https://img.shields.io/badge/tested%20by-GASUnit-%234285F1)](https://github.com/gasunit/GASUnit)

Markdown:

```md
[![tested by GASUnit](https://img.shields.io/badge/tested%20by-GASUnit-%234285F1)](https://github.com/gasunit/GASUnit)
```

HTML:

```html
<a href="https://github.com/gasunit/GASUnit"><img src="https://img.shields.io/badge/tested%20by-GASUnit-%234285F1" alt="tested by GASUnit"></a>
```

## Development
See [package.json](package.json)

## Example
See [gasunit/example](https://github.com/gasunit/example)

## Article
### Japanese
* [Google Apps Script用のテストライブラリ「GASUnit」の紹介 - Qiita](https://qiita.com/munieru_jp/items/101ee00c6906847df750)
