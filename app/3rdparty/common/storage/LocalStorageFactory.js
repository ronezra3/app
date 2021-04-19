"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function LocalStorageFactory(DeviceUtilities, ChromeAppStorage, BrowserLocalStorage, ObfuscatedStorage) {
    // var storage = DeviceUtilities.isChromeApp() ? ChromeAppStorage : BrowserLocalStorage;
    var storage = BrowserLocalStorage;
    ObfuscatedStorage.setStorage(storage);
    return ObfuscatedStorage;
}
exports.LocalStorageFactory = LocalStorageFactory;
//# sourceMappingURL=LocalStorageFactory.js.map