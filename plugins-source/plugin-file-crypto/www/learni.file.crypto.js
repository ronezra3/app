var exec = require('cordova/exec');

var loader = {

  load: function(nativeURL, password, success, error) {

    if (!nativeURL || arguments.length === 0)
      throw new Error("Invalid Usage!");

    success = (success || function() {});
    error = onError.bind(null, error);

    exec(success, error, 'Safe', 'load', [nativeURL, password]);
  }
};


function onError(error, code) {
  if (typeof error === 'function') error(code);
  return code;
}

exports.fileCrypto = loader;
