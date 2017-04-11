# GuardCat

GitHub notifications can be overwhelming. I watch a lot of repos and would like to get notifications only for repos that match a given pattern.
So let me introduce you to GuardCat – a simple helper utility to query the GitHub API recursively for particular patterns (and possibly more options later).

![A cat watching the Octocat](./logo.jpg "GuardCat logo")

*Side note: This utility is mainly used to build a CLI tool and web app with it.*

## Getting started

```
$ npm i --save guardcat
```

```javascript
const guardCat = require( 'guardcat' );

guardCat.run( {
  // your GitHub access token
  // -> https://github.com/settings/tokens
  token : '234567890',
  // patterns for notifications repos (uses minimatch)
  // -> everything that works there is possible here, too
  repoPatterns : [ 'stefanjudis/*', 'tc39/ecma262' ]
} ).then( notification => {
  // notifications only matching one of the patterns
  console.log( notification );
} );
```

### `guardCat.run( options )`

Get all GitHub notifications for repos matching the patterns.

**Parameters:**
- {string} `options.token` (required)
- {array} `options.repoPatterns` (required)

Returns: {Promise}