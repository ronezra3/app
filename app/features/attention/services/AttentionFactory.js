"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Attention = /** @class */ (function () {
    /*@ngInject*/
    function Attention(SocketIO, CurrentSession, Localytics) {
        this.SocketIO = SocketIO;
        this.CurrentSession = CurrentSession;
        this.Localytics = Localytics;
    }
    Attention.prototype.onActivated = function (callback) {
        this.SocketIO.on(Attention.ATTENTION_ACTIVATED, callback);
    };
    Attention.prototype.onDeActivated = function (callback) {
        this.SocketIO.on(Attention.ATTENTION_DEACTIVATED, callback);
    };
    Attention.prototype.toggle = function () {
        var _this = this;
        var session = this.CurrentSession.getInfo();
        session.inAttention = !session.inAttention;
        return session.$save().then(function () {
            var event = _this.isInAttention() ? Attention.ATTENTION_ACTIVATED : Attention.ATTENTION_DEACTIVATED;
            _this.Localytics.tagEvent(event);
            _this.SocketIO.emit(session.id, event);
        });
    };
    Attention.prototype.unSubscribe = function () {
        this.SocketIO.removeAllListeners(Attention.ATTENTION_ACTIVATED);
        this.SocketIO.removeAllListeners(Attention.ATTENTION_DEACTIVATED);
    };
    Attention.prototype.isInAttention = function () {
        return this.CurrentSession.getInfo().inAttention;
    };
    Attention.ATTENTION_ACTIVATED = 'attentionActivated';
    Attention.ATTENTION_DEACTIVATED = 'attentionDeActivated';
    return Attention;
}());
exports.Attention = Attention;
//# sourceMappingURL=AttentionFactory.js.map