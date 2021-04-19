declare var chrome : any;

/*@ngInject*/
export function ChromeAppStorage($q) {

  function set(key, value) {
    var deferred = $q.defer();
    var args = {};

    args[key] = value;
    chrome.storage.local.set(args, deferred.resolve);

    return deferred.promise;
  }

  function get(key) {
    var deferred = $q.defer();

    chrome.storage.local.get(key, function (result) {
      if (result[key]) {
        deferred.resolve(result[key]);
      } else {
        deferred.reject();
      }
    });

    return deferred.promise;
  }

  function remove(key) {
    var deferred = $q.defer();
    chrome.storage.local.remove(key, deferred.resolve);

    return deferred.promise;
  }

  function clear() {
    var deferred = $q.defer();
    chrome.storage.local.clear(deferred.resolve);

    return deferred.promise;
  }

  return {
    set: set,
    get: get,
    remove: remove,
    clear: clear
  };
}
