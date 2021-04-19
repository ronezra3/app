"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InAppBrowser = /** @class */ (function () {
    /*@ngInject*/
    function InAppBrowser(DeviceUtilities, $cordovaInAppBrowser, ngDialogRouter) {
        this.DeviceUtilities = DeviceUtilities;
        this.$cordovaInAppBrowser = $cordovaInAppBrowser;
        this.ngDialogRouter = ngDialogRouter;
    }
    InAppBrowser.prototype.open = function (url, canClose) {
        if (canClose === void 0) { canClose = true; }
        // if (this.DeviceUtilities.isChromeApp()) {
        //   this.ngDialogRouter.go(ChromeAppBrowserPath, {
        //       url: url,
        //       canClose: canClose
        //     },
        //     canClose,
        //     {
        //       closeByDocument: canClose,
        //       closeByEscape: canClose
        //     });
        // } else {
        //   this.$cordovaInAppBrowser.open(url, '_blank', {
        //     location: canClose && this.DeviceUtilities.isWindows() ? 'yes' : 'no'
        //   });
        // }
    };
    InAppBrowser.prototype.close = function () {
        // if (this.DeviceUtilities.isChromeApp()) {
        //   this.ngDialogRouter.close(ChromeAppBrowserPath);
        // } else {
        //   this.$cordovaInAppBrowser.close();
        // }
    };
    return InAppBrowser;
}());
exports.InAppBrowser = InAppBrowser;
//# sourceMappingURL=InAppBrowser.js.map