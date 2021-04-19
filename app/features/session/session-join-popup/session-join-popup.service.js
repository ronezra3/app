"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionJoinPopupService = /** @class */ (function () {
    /*@ngInject*/
    function SessionJoinPopupService(ClassesStore, ngDialogRouter, SessionProxy) {
        this.ClassesStore = ClassesStore;
        this.ngDialogRouter = ngDialogRouter;
        this.SessionProxy = SessionProxy;
    }
    SessionJoinPopupService.prototype.open = function (session) {
        this.ClassesStore.get(session.classId).then(function (classInfo) {
            return classInfo.getTeacher().then(
            // teacher => this.ngDialogRouter.go('session.join-popup', {session: session, classInfo, teacher: teacher})
            );
        });
    };
    SessionJoinPopupService.prototype.openActive = function () {
        this.SessionProxy.getActive().then(function (activeSession) {
            if (activeSession) {
                // this.open(activeSession);
            }
        });
    };
    return SessionJoinPopupService;
}());
exports.SessionJoinPopupService = SessionJoinPopupService;
//# sourceMappingURL=session-join-popup.service.js.map