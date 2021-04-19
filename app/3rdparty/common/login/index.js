"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AvatarPicker_1 = require("./directives/AvatarPicker");
var BrowserAvatarPicker_1 = require("./directives/BrowserAvatarPicker");
var CordovaAvatarPicker_1 = require("./directives/CordovaAvatarPicker");
var Registrar_1 = require("./services/Registrar");
exports.default = angular.module('Common.login', [])
    .directive('cordovaAvatarPicker', CordovaAvatarPicker_1.CordovaAvatarPicker)
    .component('avatarPicker', new AvatarPicker_1.AvatarPicker())
    .component('browserAvatarPicker', new BrowserAvatarPicker_1.BrowserAvatarPicker())
    .service('Registrar', Registrar_1.Registrar).name;
//# sourceMappingURL=index.js.map