/*
 * derived from jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 */

 // needed to communicate/translate between JSONWire cookies and regular JS cookies 

import _ from 'lodash';
import { getLogger } from 'appium-logger';

export default class CookieFunctions {

  constructor () {
    this.log = getLogger('Cookie');
  }
 
  // parses the value if needed and converts the value if a converter is provided
  convertCookie (value, converter) {
    let parsedValue;

    if (value.indexOf('"') === 0) {
      // this is a quoted cookied according to RFC2068 
      // remove enclosing quotes and internal quotes and backslashes
      value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }
    try {
      parsedValue = decodeURIComponent(value.replace(/\+/g, ' '));
    } catch (e) {
      this.log.warn(e);
    }
    
    return converter ? converter(parsedValue) : parsedValue;
  }

  // takes arguments given and creates a JS Cookie 
  createJSCookie (key, value, options = {}) { 

    let ret = [
      encodeURIComponent(key), '=', value, 
      options.expires ? `; expires=${options.expires}` : '',
      options.path    ? `; path=${options.path}`       : '',
      options.domain  ? `; domain=${options.domain}`   : '', 
      options.secure  ? `; secure` : ``
    ].join(``);

    return ret;
  }


  // takes the Javscript cookieString and translates it into a JSONWire formatted cookie
  createJWPCookie (key, cookieString, converter) { 
    let result = {};
    let cookies = cookieString ? cookieString.split('; ') : [];
    
    for (let cookie of cookies) {
      let parts = cookie.split('=');
      let val = parts[1];
      let name = decodeURIComponent(parts.shift());

      if (key && key === name) {
        result.name = key;
        result.value = this.convertCookie(val, converter);
      } else {
        result[name] = val;
      }
    }
    return result;
  }

  //takes a Javascript cookiestring and parses it for the value given the key 
  getValue(key, cookieString, converter) {
    let result;
    let cookies = cookieString ? cookieString.split('; ') : [];

    for (let cookie of cookies) {
      let parts = cookie.split('=');
      let val = parts[1];
      let name = decodeURIComponent(parts.shift());

      if (key && key === name) {
        result = this.convertCookie(val, converter);

        break;
      }

      if (!key && !_.isUndefined(this.convertCookie(cookie))) {
        result[name] = val;

      }
    }
    return result;
  }

  
  // returns a cookie that expires on 01 Jan 1970 
  // assign the returned cookie to an existing cookie to delete that cookie
  expireCookie (key, options) {
    return this.createJSCookie(key, '', _.extend({}, options, {
      expires: 'Thu, 01 Jan 1970 00:00:00 GMT'
    })); 
  }
}