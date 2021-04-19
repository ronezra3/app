import {BrowserLocalStorage} from './BrowserLocalStorage';
import {ChromeAppStorage} from './ChromeAppStorage';
import {LocalStorageFactory} from './LocalStorageFactory';
import {ObfuscatedStorage} from './ObfuscatedStorage';
import {LocallyStoredParameterFactory} from './LocallyStoredParameter';

export default angular.module('Common.Storage', ['LocalStorageModule'])
  .factory('BrowserLocalStorage', BrowserLocalStorage)
  .factory('ChromeAppStorage', ChromeAppStorage)
  .factory('LocallyStoredParameter', LocallyStoredParameterFactory)
  .factory('LocalStorageFactory', LocalStorageFactory)
  .factory('ObfuscatedStorage', ObfuscatedStorage).name;
