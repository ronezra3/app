"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InAppBrowser_1 = require("./InAppBrowser");
var DeviceUtilitiesMock = /** @class */ (function () {
    function DeviceUtilitiesMock() {
    }
    DeviceUtilitiesMock.prototype.isChromeApp = function () {
    };
    DeviceUtilitiesMock.prototype.isWindows = function () {
    };
    DeviceUtilitiesMock.prototype.isCordovaSupported = function () {
    };
    return DeviceUtilitiesMock;
}());
var NgDialogRouterMock = /** @class */ (function () {
    function NgDialogRouterMock() {
    }
    NgDialogRouterMock.prototype.go = function (name, options) {
    };
    NgDialogRouterMock.prototype.close = function (name) {
    };
    return NgDialogRouterMock;
}());
var $cordovaInAppBrowserMock = /** @class */ (function () {
    function $cordovaInAppBrowserMock() {
    }
    $cordovaInAppBrowserMock.prototype.open = function (URL, target, options) {
        // spy this function..
    };
    return $cordovaInAppBrowserMock;
}());
describe('url: InAppBrowser', function () {
    angular.module('LearniApp.url', ['ngLodash'])
        .service('InAppBrowser', InAppBrowser_1.InAppBrowser);
    beforeEach(function () {
        angular.mock.module('LearniApp.url');
        angular.mock.module(function ($provide) {
            $provide.service('$cordovaInAppBrowser', $cordovaInAppBrowserMock);
            $provide.service('DeviceUtilities', DeviceUtilitiesMock);
            $provide.service('ngDialogRouter', NgDialogRouterMock);
        });
    });
    describe('cordova', function () {
        beforeEach(angular.mock.inject(function (DeviceUtilities) {
            spyOn(DeviceUtilities, 'isCordovaSupported').and.returnValue(true);
            spyOn(DeviceUtilities, 'isChromeApp').and.returnValue(false);
            spyOn(DeviceUtilities, 'isWindows').and.returnValue(false);
        }));
        it('should open browser', angular.mock.inject(function (InAppBrowser, $cordovaInAppBrowser) {
            spyOn($cordovaInAppBrowser, 'open');
            InAppBrowser.open('http://test.com');
            expect($cordovaInAppBrowser.open).toHaveBeenCalled();
        }));
    });
    describe('chrome', function () {
        beforeEach(angular.mock.inject(function (DeviceUtilities) {
            spyOn(DeviceUtilities, 'isCordovaSupported').and.returnValue(false);
            spyOn(DeviceUtilities, 'isChromeApp').and.returnValue(true);
        }));
        it('should open browser', angular.mock.inject(function (InAppBrowser, ngDialogRouter) {
            spyOn(ngDialogRouter, 'go');
            InAppBrowser.open('http://test.com');
            expect(ngDialogRouter.go).toHaveBeenCalledWith('chromeAppBrowser', {
                url: 'http://test.com',
                canClose: true
            }, true, {
                closeByDocument: true,
                closeByEscape: true
            });
        }));
        it('should open browser that can not be closed', angular.mock.inject(function (InAppBrowser, ngDialogRouter) {
            spyOn(ngDialogRouter, 'go');
            InAppBrowser.open('http://test.com', false);
            expect(ngDialogRouter.go).toHaveBeenCalledWith('chromeAppBrowser', {
                url: 'http://test.com',
                canClose: false
            }, false, {
                closeByDocument: false,
                closeByEscape: false
            });
        }));
    });
});
//# sourceMappingURL=InAppBrowser.spec.js.map