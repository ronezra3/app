"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DeviceSleepDeprivation = /** @class */ (function () {
    /*@ngInject*/
    function DeviceSleepDeprivation($window) {
        this.$window = $window;
    }
    DeviceSleepDeprivation.prototype.start = function () {
        if (this.$window.powerManagement) {
            //this function actually acquires partial lock
            this.$window.powerManagement.dim();
            this.$window.powerManagement.setReleaseOnPause(false);
        }
        if (this.$window.plugins && this.$window.plugins.WifiAdmin) {
            var wifiAdmin = this.$window.plugins.WifiAdmin;
            wifiAdmin.enableWifiLock(true);
        }
    };
    DeviceSleepDeprivation.prototype.stop = function () {
        if (this.$window.powerManagement) {
            this.$window.powerManagement.release();
        }
        if (this.$window.plugins && this.$window.plugins.WifiAdmin) {
            var wifiAdmin = this.$window.plugins.WifiAdmin;
            wifiAdmin.enableWifiLock(false);
        }
    };
    return DeviceSleepDeprivation;
}());
exports.DeviceSleepDeprivation = DeviceSleepDeprivation;
//# sourceMappingURL=DeviceSleepDeprivation.js.map