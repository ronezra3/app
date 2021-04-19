"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BrowserLocalStorage_1 = require("./BrowserLocalStorage");
var ChromeAppStorage_1 = require("./ChromeAppStorage");
var LocalStorageFactory_1 = require("./LocalStorageFactory");
var ObfuscatedStorage_1 = require("./ObfuscatedStorage");
var LocallyStoredParameter_1 = require("./LocallyStoredParameter");
exports.default = angular.module('Common.Storage', ['LocalStorageModule'])
    .factory('BrowserLocalStorage', BrowserLocalStorage_1.BrowserLocalStorage)
    .factory('ChromeAppStorage', ChromeAppStorage_1.ChromeAppStorage)
    .factory('LocallyStoredParameter', LocallyStoredParameter_1.LocallyStoredParameterFactory)
    .factory('LocalStorageFactory', LocalStorageFactory_1.LocalStorageFactory)
    .factory('ObfuscatedStorage', ObfuscatedStorage_1.ObfuscatedStorage).name;
//# sourceMappingURL=index.js.map