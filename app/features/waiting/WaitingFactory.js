"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Waiting = /** @class */ (function () {
    /*@ngInject*/
    function Waiting(SocketIO, CurrentSession) {
        this.SocketIO = SocketIO;
        this.CurrentSession = CurrentSession;
    }
    Waiting.prototype.onActivated = function (callback) {
        this.SocketIO.on(Waiting.WAITING_ACTIVATED, callback);
    };
    Waiting.prototype.onDeActivated = function (callback) {
        this.SocketIO.on(Waiting.WAITING_DEACTIVATED, callback);
    };
    Waiting.prototype.open = function () {
        var session = this.CurrentSession.getInfo();
        this.SocketIO.emit(session.id, Waiting.WAITING_ACTIVATED);
    };
    Waiting.prototype.close = function () {
        var session = this.CurrentSession.getInfo();
        this.SocketIO.emit(session.id, Waiting.WAITING_DEACTIVATED);
    };
    // toggle() {
    //     let session = this.CurrentSession.getInfo();
    //     session.inAttention = !session.inAttention;
    //     return session.$save().then(() => {
    //         let event = this.isInAttention() ? Waiting.WAITING_ACTIVATED : Waiting.WAITING_DEACTIVATED;
    //         this.SocketIO.emit(session.id, event);
    //     });
    // }
    Waiting.prototype.unSubscribe = function () {
        this.SocketIO.removeAllListeners(Waiting.WAITING_ACTIVATED);
        this.SocketIO.removeAllListeners(Waiting.WAITING_DEACTIVATED);
    };
    Waiting.WAITING_ACTIVATED = 'waitingActivated';
    Waiting.WAITING_DEACTIVATED = 'waitingDeActivated';
    return Waiting;
}());
exports.Waiting = Waiting;
//# sourceMappingURL=WaitingFactory.js.map