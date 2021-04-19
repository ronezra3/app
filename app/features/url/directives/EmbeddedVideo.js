"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmbeddedVideoController = /** @class */ (function () {
    /*@ngInject*/
    function EmbeddedVideoController(DeviceUtilities, $sce) {
        this.DeviceUtilities = DeviceUtilities;
        this.$sce = $sce;
    }
    EmbeddedVideoController.prototype.format = function (videoString) {
        // iframes in chromeapp don't support CORS request that's why we are replacing them with webviews
        if (this.DeviceUtilities.isChromeApp()) {
            videoString = videoString.replace('iframe', 'webview');
        }
        // iframes in winjs aren't supported
        // x-ms-webview is only supported in windows 8.1+
        // TODO: if (windows 8) { open video in new window }
        if (this.DeviceUtilities.isWindows()) {
            videoString = videoString.replace('iframe', 'x-ms-webview');
        }
        var videoHtml = angular.element(videoString);
        // in Cordova and chromeapps the src should start with http
        if (this.DeviceUtilities.isCordovaSupported() || this.DeviceUtilities.isChromeApp()) {
            var oldSrc = videoHtml.attr('src');
            videoHtml.attr('src', "http:" + oldSrc);
        }
        return videoHtml[0].outerHTML;
    };
    EmbeddedVideoController.prototype.$onInit = function () {
        var x = this.format(this.preview.html);
        var y = this.$sce.trustAsHtml(x);
        this.player = y;
    };
    return EmbeddedVideoController;
}());
var EmbeddedVideoComponent = /** @class */ (function () {
    function EmbeddedVideoComponent() {
        this.bindings = {
            preview: '<'
        };
        this.controller = EmbeddedVideoController;
        this.template = "<article ng-bind-html='$ctrl.player' destroy-win-webview></article>";
    }
    return EmbeddedVideoComponent;
}());
exports.EmbeddedVideoComponent = EmbeddedVideoComponent;
//# sourceMappingURL=EmbeddedVideo.js.map