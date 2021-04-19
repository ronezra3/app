"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function AttendanceFactory(AttendanceManager, SessionProxy) {
    return function (sessionId) { return SessionProxy.get(sessionId).$promise.then(function (session) { return new AttendanceManager(session.attended); }); };
}
exports.AttendanceFactory = AttendanceFactory;
//# sourceMappingURL=AttendanceFactory.js.map