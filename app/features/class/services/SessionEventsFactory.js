"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionEvents = /** @class */ (function () {
    /*@ngInject*/
    function SessionEvents(SocketIO, ENV) {
        this.SocketIO = SocketIO;
        this.endpoint = ENV.realtimeEndpoint;
    }
    SessionEvents.prototype.join = function (sessionId, userId, isTeacher, onDisconnect, onReconnect) {
        var _this = this;
        this.SocketIO.connect(this.endpoint).then(function () {
            _this.SocketIO.on('reconnect', function () {
                _this.joinSession(sessionId, userId, isTeacher);
                onReconnect();
            });
            _this.SocketIO.on('disconnect', onDisconnect);
            _this.joinSession(sessionId, userId, isTeacher);
        });
    };
    SessionEvents.prototype.leave = function (sessionId, userId) {
        this.SocketIO.removeAllListeners('disconnect');
        this.SocketIO.removeAllListeners('reconnect');
        this.SocketIO.emit(sessionId, 'leaveSession', userId);
        this.SocketIO.disconnect();
    };
    SessionEvents.prototype.joinSession = function (sessionId, userId, isTeacher) {
        this.SocketIO.emit(sessionId, 'joinSession', {
            userId: userId,
            isTeacher: isTeacher
        });
    };
    return SessionEvents;
}());
exports.SessionEvents = SessionEvents;
//# sourceMappingURL=SessionEventsFactory.js.map