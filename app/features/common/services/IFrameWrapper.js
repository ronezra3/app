"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IFrameWrapper = /** @class */ (function () {
    function IFrameWrapper($document) {
        this.$document = $document;
        this.iframe = this.$document.find('iframe')[0];
    }
    IFrameWrapper.prototype.onBlur = function (callback) {
        var _this = this;
        if (this.iframe) {
            this.iframe.contentWindow.onblur = function () {
                if (_this.isActive()) {
                    callback();
                }
            };
        }
    };
    IFrameWrapper.prototype.onFocus = function (callback) {
        if (this.iframe) {
            this.iframe.contentWindow.onfocus = callback;
        }
    };
    IFrameWrapper.prototype.isActive = function () {
        return this.iframe === document.activeElement;
    };
    return IFrameWrapper;
}());
/*@ngInject*/
function IFrameWrapperFactory($document) {
    return function () { return new IFrameWrapper($document); };
}
exports.IFrameWrapperFactory = IFrameWrapperFactory;
//# sourceMappingURL=IFrameWrapper.js.map