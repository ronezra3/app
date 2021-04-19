"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function BrowserLocalStorage(localStorageService, $q) {
    function set(key, value) {
        var deferred = $q.defer();
        var isSet = localStorageService.set(key, value);
        if (isSet) {
            deferred.resolve();
        }
        else {
            deferred.reject();
        }
        return deferred.promise;
    }
    function get(key) {
        var deferred = $q.defer();
        var result = localStorageService.get(key);
        if (result) {
            deferred.resolve(result);
        }
        else {
            deferred.reject();
        }
        return deferred.promise;
    }
    function remove(key) {
        var deferred = $q.defer();
        localStorageService.remove(key);
        deferred.resolve();
        return deferred.promise;
    }
    function clear() {
        var deferred = $q.defer();
        localStorageService.clearAll();
        deferred.resolve();
        return deferred.promise;
    }
    return {
        set: set,
        get: get,
        remove: remove,
        clear: clear
    };
}
exports.BrowserLocalStorage = BrowserLocalStorage;
//# sourceMappingURL=BrowserLocalStorage.js.map