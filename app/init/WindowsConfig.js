"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function WindowsConfig($httpProvider, DeviceUtilitiesProvider) {
    document.addEventListener('deviceready', function () {
        if (DeviceUtilitiesProvider.isWindows()) {
            WinJS.Application.addEventListener('error', function (err) {
                console.log(err);
            });
        }
        /**
         * Windows webview cache GET request automatically.
         */
        if (DeviceUtilitiesProvider.isWindows()) {
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }
            $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
        }
    }, false);
}
exports.WindowsConfig = WindowsConfig;
//# sourceMappingURL=WindowsConfig.js.map