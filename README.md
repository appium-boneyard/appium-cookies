## appium-cookies

[![npm Version](https://img.shields.io/npm/v/appium-cookies.svg)](https://www.npmjs.com/package/appium-cookies)
[![Downloads](http://img.shields.io/npm/dm/appium-cookies.svg)](https://npmjs.org/package/appium-cookies)
[![Dependency Status](https://david-dm.org/appium/appium-cookies/master.svg)](https://david-dm.org/appium/appium-cookies/)
[![devDependency Status](https://david-dm.org/appium/appium-cookies/dev-status.svg)](https://david-dm.org/appium/appium-cookies#info=devDependencies)

[![Build Status](https://api.travis-ci.org/appium/appium-cookies.png?branch=master)](https://travis-ci.org/appium/appium-cookies)
[![Coverage Status](https://img.shields.io/coveralls/appium/appium-cookies/master.svg)](https://coveralls.io/github/appium/appium-cookies?branch=master)

This is an ES6 module for simple handling of cookies, for use in communicating and translating between [JSON Wire Protocol cookie objects](https://code.google.com/p/selenium/wiki/JsonWireProtocol#Cookie_JSON_Object) and regular [JavaScript cookies](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie).

### Usage

Install from [npm](https://www.npmjs.com/package/appium-cookies):

```shell
npm install appium-cookies
```

Import/require:

```js
// ES6
import cookie from 'appium-cookies';

let c = cookie.createJSCookie('key', 'value', {expires: 'Thu, 01 Jan 2070 3:4:7 GMT', path: '/lib'});
// c => 'key=value; expires=Thu, 01 Jan 2070 3:4:7 GMT; path=/lib'
```

```js
// ES5
var cookie = require('appium-cookies');

var c = cookie.createJSCookie('key', 'value', {expires: 'Thu, 01 Jan 2070 3:4:7 GMT', path: '/lib'});
// c => 'key=value; expires=Thu, 01 Jan 2070 3:4:7 GMT; path=/lib'
```

### API

`createJSCookie (key, value, options)`

- returns a regular JS formatted cookie with the arguments given. `options` can include `expires`, `path`, `domain`, `secure`. No attempt is made to enforce the suitability of any of those options.

`createJWPCookie (key, cookieString, converter)`

- returns a JSON Wire Protocol formatted cookie. It will convert the values if a converter is provided. `converter` is any method that takes a string and returns something.

`getValue (key, cookieString, converter)`

- parses the `cookieString` for a key and returns the value. It will convert the value if a converter is provided.

`expireCookie(key, options)`

- returns an expired cookie which can be assigned to a cookie that you wish to delete. `options` are the same as those for `createJSCookie`.
