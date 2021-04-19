/*@ngInject*/
export function LocalStorageFactory(DeviceUtilities, ChromeAppStorage, BrowserLocalStorage, ObfuscatedStorage) {
  // var storage = DeviceUtilities.isChromeApp() ? ChromeAppStorage : BrowserLocalStorage;
  var storage = BrowserLocalStorage;
  ObfuscatedStorage.setStorage(storage);
  return ObfuscatedStorage;
}
