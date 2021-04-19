
var RC4 = (function() {
  'use strict';


  function rc4(str, key) {
    var s = [], j = 0, x, res = [];
    for (var i = 0; i < 256; i++) {
      s[i] = i;
    }
    for (i = 0; i < 256; i++) {
      j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
      x = s[i];
      s[i] = s[j];
      s[j] = x;
    }
    i = 0;
    j = 0;
    for (var y = 0; y < str.length; y++) {
      i = (i + 1) % 256;
      j = (j + s[i]) % 256;
      x = s[i];
      s[i] = s[j];
      s[j] = x;
      res.push(String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]));
    }
    return res.join("");
  }


  function generateKeyStream(key) {
    var tmp, j = 0, s = [];

    for (var i = 0; i < 256; i++)
      s[i] = i;

    for (i = 0; i < 256; i++) {
      j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
      tmp = s[i];
      s[i] = s[j];
      s[j] = tmp;
    }

    return s;
  }

  var DecryptControl = function(str, key) {
    this._start = 0;
    this._i = 0;
    this._j = 0;
    this._cipher = str;
    this._s = generateKeyStream(key);
    this._cleartext = "";
  };

  DecryptControl.prototype.decryptNext = function() {
    var tmp, s = this._s, i = this._i, j = this._j, str = this._cipher, start = this._start;
    var end = str.length < (start + 100000) ? str.length : (start + 100000);
    var res = [this._cleartext];

    for (var y = start; y < end; y++) {
      i = (i + 1) % 256;
      j = (j + s[i]) % 256;
      tmp = s[i];
      s[i] = s[j];
      s[j] = tmp;
      res.push(String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]));
    }

    // save state
    this._start = y;
    this._i = i;
    this._j = j;
    this._cleartext = res.join("");

    return (y/str.length);
  };

  DecryptControl.prototype.result = function() { return this._cleartext;};
  DecryptControl.prototype.finished = function() { return this._start === this._cipher.length};


  return {
    encrypt : rc4,
    decrypt : rc4,
    progressiveDecrypt : function(data, key) { return new DecryptControl(data, key)}
  }

})();



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
if (typeof module != 'undefined' && module.exports) module.exports = RC4; // CommonJS export
//if (typeof define == 'function' && define.amd) define([''], function() { return RC4; }); // AMD
if (typeof angular !== 'undefined')   angular.module('RC4',[]).factory('lnCrypto', function() {return RC4;});
