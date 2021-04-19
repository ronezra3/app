"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DeviceUtilities = /** @class */ (function () {
    function DeviceUtilities($cordovaDevice) {
        this.$cordovaDevice = $cordovaDevice;
    }
    DeviceUtilities.prototype.isChromeApp = function () {
        return false;
        // return (typeof(chrome) !== 'undefined' && typeof(chrome.app.runtime) !== 'undefined') && !this.isCordovaSupported();
    };
    DeviceUtilities.prototype.isCordovaSupported = function () {
        return typeof (cordova) !== 'undefined';
    };
    DeviceUtilities.prototype.isAndroid = function () {
        return this.isPlatform('Android');
    };
    DeviceUtilities.prototype.isIOS = function () {
        return this.isPlatform('iOS');
    };
    DeviceUtilities.prototype.isWindows = function () {
        return this.isPlatform('windows');
    };
    DeviceUtilities.prototype.isVersionLargerThan = function (version) {
        return this.isCordovaSupported() && parseFloat(this.$cordovaDevice.getVersion()) > version;
    };
    DeviceUtilities.prototype.isPlatform = function (platform) {
        return this.isCordovaSupported() && this.$cordovaDevice.getPlatform() === platform;
    };
    return DeviceUtilities;
}());
var DeviceUtilitiesService = /** @class */ (function (_super) {
    __extends(DeviceUtilitiesService, _super);
    function DeviceUtilitiesService($document, $cordovaDevice) {
        var _this = _super.call(this, $cordovaDevice) || this;
        _this.$document = $document;
        return _this;
    }
    DeviceUtilitiesService.prototype.hideKeyboard = function () {
        this.$document[0].activeElement.blur();
        var inputs = this.$document[0].querySelectorAll('input');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].blur();
        }
    };
    DeviceUtilitiesService.prototype.disableBackSpace = function () {
        var backSpaceKeyNumber = 8;
        document.addEventListener('keydown', function (event) {
            if ((event.target['localName'] !== 'input'
                && event.target['localName'] !== 'textarea')
                && event.which === backSpaceKeyNumber) {
                event.preventDefault();
            }
        });
    };
    return DeviceUtilitiesService;
}(DeviceUtilities));
var DeviceUtilitiesProvider = /** @class */ (function (_super) {
    __extends(DeviceUtilitiesProvider, _super);
    /*@ngInject*/
    function DeviceUtilitiesProvider($cordovaDeviceProvider) {
        return _super.call(this, $cordovaDeviceProvider.$get()) || this;
    }
    /*@ngInject*/
    DeviceUtilitiesProvider.prototype.$get = function ($document, $cordovaDevice) {
        return new DeviceUtilitiesService($document, $cordovaDevice);
    };
    return DeviceUtilitiesProvider;
}(DeviceUtilities));
exports.DeviceUtilitiesProvider = DeviceUtilitiesProvider;
//# sourceMappingURL=DeviceUtilities.js.map