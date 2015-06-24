// transpile:mocha

import Cookie from '../lib/cookie.js';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mochawait';


chai.should();
chai.use(chaiAsPromised);
chai.expect();
let expect = chai.expect;

describe ('cookies.js', () => { 
  it ('should properly read a cookie and return the value given the key', () => {
    let cookieMan = new Cookie('k=v');
    cookieMan.readCookie('k').should.equal('v');
  });


  it ('should return undefined for an undefined key value', () => {
    let cookieMan = new Cookie('k=v');
    expect(cookieMan.readCookie('someKey')).to.be.undefined;
  });


  it ('should properly decode an encoded key value pair',  () => {
    let cookieMan = new Cookie(encodeURIComponent(' c') + '=' + encodeURIComponent(' v'));
    cookieMan.readCookie(' c').should.equal(' v');
  });


  it ('should decode pluses in the cookie to spaces', () => {
    let cookieMan = new Cookie('c=foo+bar');
    cookieMan.readCookie('c').should.equal('foo bar');
  });


  it ('should return undefined and not throw an exception on an invalid URL encoding', () => { 
    let cookieMan = new Cookie('bad=foo%');
    expect(cookieMan.readCookie('bad')).to.be.undefined;
  });

  it ('should return empty object when it is called to read all and there are no cookies', () => {
    let cookieMan = new Cookie();
    cookieMan.readCookie().should.deep.equal({});
  });

  it ('should return written cookie string when writeCookie is called', () => {
    let cookieMan = new Cookie();
    cookieMan.writeCookie('c', 'v').should.equal('c=v');
  });

  it ('should convert read value when a converter is supplied to readCookie', () => {
    let cookieMan = new Cookie('c='+ 1);
    cookieMan.readCookie('c', Number).should.equal(1);
  });

  it ('should not alter options object when removing a cookie', () => {
    let options = { path: '/' };
    let cookieMan = new Cookie();
    cookieMan.writeCookie('c', 'v', options);
    cookieMan.removeCookie('c', options);
    options.should.deep.equal({path: '/'});
  });

  it ('should return a cookie that expires on 01 Jan 1970 when removeCookie is called', () => {
    new Cookie().removeCookie('c').should.include('expires=Thu, 01 Jan 1970 00:00:00 GMT');
  });

  it ('should return proper options when writeCookie is supplied with options', () => {
    new Cookie()
      .writeCookie('key', 'val', {expires: 'Thu, 01 Jan 2070 3:4:7 GMT', path: '/lib'})
      .should.equal('key=val; expires=Thu, 01 Jan 2070 3:4:7 GMT; path=/lib');
  });
});
