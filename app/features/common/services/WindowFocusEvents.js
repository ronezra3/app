"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WindowFocusEvents = /** @class */ (function () {
    /*@ngInject*/
    function WindowFocusEvents(IFrameWrapper, $window) {
        this.IFrameWrapper = IFrameWrapper;
        this.$window = $window;
    }
    WindowFocusEvents.prototype.onBlur = function (callback) {
        this.onBlurCallback = callback;
        this.innerOnBlurBound = this.innerOnBlur.bind(this);
        this.$window.addEventListener('blur', this.innerOnBlurBound);
    };
    WindowFocusEvents.prototype.onFocus = function (callback) {
        this.onFocusCallback = callback;
        this.innerOnFocusBound = this.innerOnFocus.bind(this);
        this.$window.addEventListener('focus', this.innerOnFocusBound);
    };
    WindowFocusEvents.prototype.detach = function () {
        this.$window.removeEventListener('blur', this.innerOnBlurBound);
        this.$window.removeEventListener('focus', this.innerOnFocusBound);
    };
    WindowFocusEvents.prototype.innerOnBlur = function () {
        var iframe = this.IFrameWrapper();
        if (!iframe.isActive()) {
            this.onBlurCallback();
        }
        else {
            iframe.onBlur(this.onBlurCallback);
        }
    };
    WindowFocusEvents.prototype.innerOnFocus = function () {
        var iframe = this.IFrameWrapper();
        iframe.onFocus(this.onFocusCallback);
        this.onFocusCallback();
    };
    return WindowFocusEvents;
}());
exports.WindowFocusEvents = WindowFocusEvents;
//# sourceMappingURL=WindowFocusEvents.js.map