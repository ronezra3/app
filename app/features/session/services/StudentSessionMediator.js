"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionMediator_1 = require("./SessionMediator");
var StudentSessionMediator = /** @class */ (function (_super) {
    __extends(StudentSessionMediator, _super);
    /*@ngInject*/
    function StudentSessionMediator(SessionEvents, CurrentSession, ActivitiesRouter, TogetherEventsRouter, DeviceSleepDeprivation, CurrentUser, AttentionEventsRouter, AppStatus, Together, $rootScope, LogOut, $state) {
        var _this = _super.call(this, false, SessionEvents, CurrentSession, ActivitiesRouter, TogetherEventsRouter, DeviceSleepDeprivation, CurrentUser, LogOut) || this;
        _this.AttentionEventsRouter = AttentionEventsRouter;
        _this.AppStatus = AppStatus;
        _this.Together = Together;
        _this.$rootScope = $rootScope;
        _this.$state = $state;
        return _this;
    }
    StudentSessionMediator.prototype.sync = function (currentSession) {
        _super.prototype.sync.call(this, currentSession);
        this.AttentionEventsRouter.sync(currentSession.inAttention);
        this.AppStatus.activate(currentSession.id);
        this.AppStatus.reportCurrentStatus();
    };
    StudentSessionMediator.prototype.syncWith = function (currentSession, previousSession) {
        _super.prototype.syncWith.call(this, currentSession, previousSession);
        this.sync(currentSession);
    };
    StudentSessionMediator.prototype.subscribe = function (session) {
        _super.prototype.subscribe.call(this, session);
        this.ActivitiesRouter.subscribe(session);
        this.AttentionEventsRouter.subscribe();
        this.CurrentSession.onEnd(this.leaveInternal.bind(this));
    };
    StudentSessionMediator.prototype.leave = function () {
        this.AppStatus.reportStatus('offline', 'left_session');
        this.leaveInternal();
    };
    StudentSessionMediator.prototype.leaveInternal = function () {
        this.ActivitiesRouter.unsubscribe();
        this.AppStatus.deActivate();
        this.AttentionEventsRouter.unsubscribe();
        this.Together.cancelRequest();
        this.$rootScope.$broadcast('together-request-canceled');
        var stepsBack = 2;
        this.$state.back(false, stepsBack);
        // Due note that this method is disconnecting from the real-time service.
        // So if your logic depend on this connection [just like AppStatus.deActivate()],
        // please make sure that you put it before this calling.
        _super.prototype.leave.call(this);
    };
    return StudentSessionMediator;
}(SessionMediator_1.SessionMediator));
exports.StudentSessionMediator = StudentSessionMediator;
//# sourceMappingURL=StudentSessionMediator.js.map