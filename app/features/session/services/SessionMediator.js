"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionMediator = /** @class */ (function () {
    function SessionMediator(isTeacher, SessionEvents, CurrentSession, ActivitiesRouter, TogetherEventsRouter, DeviceSleepDeprivation, CurrentUser, LogOut) {
        this.isTeacher = isTeacher;
        this.SessionEvents = SessionEvents;
        this.CurrentSession = CurrentSession;
        this.ActivitiesRouter = ActivitiesRouter;
        this.TogetherEventsRouter = TogetherEventsRouter;
        this.DeviceSleepDeprivation = DeviceSleepDeprivation;
        this.CurrentUser = CurrentUser;
        this.LogOut = LogOut;
    }
    SessionMediator.prototype.onReconnect = function (classId) {
        var _this = this;
        var previousSession = this.CurrentSession.getInfo();
        this.CurrentSession.load(classId).then(function (currentSession) {
            return _this.syncWith(currentSession, previousSession);
        }).catch(function () { return _this.leave(); });
    };
    SessionMediator.prototype.leave = function () {
        this.TogetherEventsRouter.unsubscribe();
        var session = this.CurrentSession.getInfo();
        this.CurrentSession.leave();
        this.SessionEvents.leave(session.id, this.CurrentUser.get().id);
        this.DeviceSleepDeprivation.stop();
        this.logOutUnSubscribe();
    };
    SessionMediator.prototype.sync = function (currentSession) {
        this.TogetherEventsRouter.sync(currentSession);
        this.ActivitiesRouter.sync(currentSession, this.isTeacher);
    };
    SessionMediator.prototype.subscribe = function (session) {
        var _this = this;
        this.DeviceSleepDeprivation.start();
        this.SessionEvents.join(session.id, this.CurrentUser.get().id, this.isTeacher, null, function () { return _this.onReconnect(session.classId); });
        this.TogetherEventsRouter.subscribe(this.isTeacher);
        this.logOutUnSubscribe = this.LogOut.onLoggingOut(function () { return _this.leave(); });
    };
    SessionMediator.prototype.syncWith = function (currentSession, previousSession) {
        this.TogetherEventsRouter.syncWith(currentSession, previousSession);
        this.ActivitiesRouter.syncWith(currentSession, previousSession, this.isTeacher);
    };
    return SessionMediator;
}());
exports.SessionMediator = SessionMediator;
//# sourceMappingURL=SessionMediator.js.map