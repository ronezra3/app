"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChromeAppBrowserPath = 'chromeAppBrowser';
var ChromeAppBrowserController = /** @class */ (function () {
    /*@ngInject*/
    function ChromeAppBrowserController($sce, $scope, ngDialogRouter) {
        this.ngDialogRouter = ngDialogRouter;
        this.trustedUrl = $sce.trustAsResourceUrl($scope['url']);
        this.canClose = $scope['canClose'];
    }
    ChromeAppBrowserController.prototype.close = function () {
        this.ngDialogRouter.close(exports.ChromeAppBrowserPath);
    };
    return ChromeAppBrowserController;
}());
exports.ChromeAppBrowserController = ChromeAppBrowserController;
var template = "\n<button ng-if=\"$ctrl.canClose\" class=\"close\" ng-click=\"$ctrl.close()\">\n  <ng-include src=\"'images/x-icon.svg'\"></ng-include>\n</button>\n<webview ng-src=\"{{$ctrl.trustedUrl}}\"></webview>\n";
var ChromeAppBrowserState = /** @class */ (function () {
    function ChromeAppBrowserState() {
        this.appendClassName = 'chrome-browser';
        this.controllerAs = '$ctrl';
        this.controller = ChromeAppBrowserController;
        this.closeByDocument = true;
        this.closeByEscape = true;
        this.template = template;
    }
    return ChromeAppBrowserState;
}());
exports.ChromeAppBrowserState = ChromeAppBrowserState;
//# sourceMappingURL=ChromeAppBrowser.js.map