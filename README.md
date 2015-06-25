## appium-cookies

Simple cookie handling

Used to communicate and translate between JSONWire Cookies and Regular JS Cookies. 

### How it is used: 

*  createJSCookie (key, value, options) returns a regular JS formatted cookie with the arguments given. 
*  createJWPCookie (key, cookieString, converter) returns a JSONWire Protocol formatted cookie. It will convert the values if a converter is provided.
*  getValue (key, cookieString, converter) parses the cookieString for a key and returns the value. It will convert the value if a converter is provided.
<<<<<<< HEAD
*  expireCookie(key, options) returns an expired cookie which can be assigned to a cookie that you wish to delete. 
=======
*  expireCookie(key, options) returns an expired cookie which can be assigned to a cookie that you wish to delete. 
>>>>>>> 8b4228c... fixed formatting
