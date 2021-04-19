"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionMediator_1 = require("./SessionMediator");
var TeacherSessionMediator = /** @class */ (function (_super) {
    __extends(TeacherSessionMediator, _super);
    /*@ngInject*/
    function TeacherSessionMediator(SessionEvents, CurrentSession, ActivitiesRouter, TogetherEventsRouter, DeviceSleepDeprivation, CurrentUser, AttendanceManager, LogOut) {
        var _this = _super.call(this, true, SessionEvents, CurrentSession, ActivitiesRouter, TogetherEventsRouter, DeviceSleepDeprivation, CurrentUser, LogOut) || this;
        _this.AttendanceManager = AttendanceManager;
        return _this;
    }
    TeacherSessionMediator.prototype.subscribe = function (session) {
        _super.prototype.subscribe.call(this, session);
        this.CurrentSession.startAttendanceMgr(new this.AttendanceManager(session.attended));
    };
    TeacherSessionMediator.prototype.end = function () {
        var _this = this;
        // Due note that this method is disconnecting from the real-time service.
        // So if your logic depend on this connection [just like Session.end()],
        // please make sure that you put it before this calling.
        return this.CurrentSession.end().then(function () { return _super.prototype.leave.call(_this); });
    };
    return TeacherSessionMediator;
}(SessionMediator_1.SessionMediator));
exports.TeacherSessionMediator = TeacherSessionMediator;
//# sourceMappingURL=TeacherSessionMediator.js.map