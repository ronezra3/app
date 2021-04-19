"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AttentionEventsRouter = /** @class */ (function () {
    /*@ngInject*/
    function AttentionEventsRouter(Attention, ngDialogRouter, $cordovaVibration, DeviceUtilities) {
        this.Attention = Attention;
        this.ngDialogRouter = ngDialogRouter;
        this.$cordovaVibration = $cordovaVibration;
        this.DeviceUtilities = DeviceUtilities;
    }
    AttentionEventsRouter.prototype.activate = function () {
        if (this.DeviceUtilities.isCordovaSupported())
            this.$cordovaVibration.vibrate(2000);
        this.ngDialogRouter.go('attention', {}, false);
    };
    AttentionEventsRouter.prototype.deActivate = function () {
        this.ngDialogRouter.close('attention');
    };
    AttentionEventsRouter.prototype.sync = function (inAttention) {
        var attentionChanged = (this.ngDialogRouter.is('attention') !== inAttention);
        if (attentionChanged) {
            return inAttention ? this.activate() : this.deActivate();
        }
    };
    AttentionEventsRouter.prototype.subscribe = function () {
        var _this = this;
        this.Attention.onActivated(function () { return _this.activate(); });
        this.Attention.onDeActivated(function () { return _this.deActivate(); });
    };
    AttentionEventsRouter.prototype.unsubscribe = function () {
        this.Attention.unSubscribe();
    };
    return AttentionEventsRouter;
}());
exports.AttentionEventsRouter = AttentionEventsRouter;
//# sourceMappingURL=AttentionEventsRouter.js.map