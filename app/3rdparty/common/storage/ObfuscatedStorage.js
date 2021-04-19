"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function ObfuscatedStorage($crypto) {
    var _storage = null;
    var generateRandomKey = function () {
        return Math.random().toString(36).substring(2).substring(0, 6);
    };
    var obfuscate = function (clearText) {
        var key = generateRandomKey();
        return (key + $crypto.encrypt(JSON.stringify(clearText), key));
    };
    var unObfuscate = function (encrypted) {
        var key = encrypted.substring(0, 6);
        return fromJSON($crypto.decrypt(encrypted.substring(6), key));
    };
    var fromJSON = function (json) {
        try {
            return JSON.parse(json);
        }
        catch (e) {
        } // this is fine, because it means that we probably changed the obfuscation
    };
    function set(key, value) {
        return _storage.set(key, obfuscate(value));
    }
    function get(key) {
        return _storage.get(key).then(unObfuscate);
    }
    function remove(key) {
        return _storage.remove(key);
    }
    function clear() {
        return _storage.clear();
    }
    function setStorage(storage) {
        _storage = storage;
    }
    return {
        setStorage: setStorage,
        set: set,
        get: get,
        remove: remove,
        clear: clear
    };
}
exports.ObfuscatedStorage = ObfuscatedStorage;
//# sourceMappingURL=ObfuscatedStorage.js.map