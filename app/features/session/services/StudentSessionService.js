"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StudentSessionService = /** @class */ (function () {
    /*@ngInject*/
    function StudentSessionService(ngDialogRouter, DeviceUtilities, $q, AppOnTop, CurrentSession, StudentSessionMediator) {
        this.ngDialogRouter = ngDialogRouter;
        this.DeviceUtilities = DeviceUtilities;
        this.$q = $q;
        this.AppOnTop = AppOnTop;
        this.CurrentSession = CurrentSession;
        this.StudentSessionMediator = StudentSessionMediator;
    }
    StudentSessionService.prototype.leave = function () {
        return this.StudentSessionMediator.leave();
    };
    StudentSessionService.prototype.join = function (classId) {
        // if (this.DeviceUtilities.isAndroid() && this.DeviceUtilities.isVersionLargerThan(5.1)) {
        //   return this.syncSessionWithPermissions(classId);
        // }
        return this.syncSession(classId);
    };
    // private syncSessionWithPermissions(classId) {
    //   return this.AppOnTop.hasPermission()
    //     .then((hasPermission) => hasPermission ? this.syncSession(classId) : this.requestPermission(classId));
    // }
    StudentSessionService.prototype.syncSession = function (classId) {
        var _this = this;
        return this.CurrentSession.load(classId).then(function (currentSession) {
            _this.StudentSessionMediator.subscribe(currentSession);
            _this.StudentSessionMediator.sync(currentSession);
        }).catch(function () { return _this.ngDialogRouter.go('validationMassage', { errorMassage: 'no_session' }); });
    };
    StudentSessionService.prototype.requestPermission = function (classId) {
        var _this = this;
        var deferred = this.$q.defer();
        this.ngDialogRouter.go('are-you-sure', {
            yes: function () { return _this.AppOnTop.requestPermission()
                .then(function () { return _this.syncSession(classId).then(deferred.resolve); })
                .catch(function () { return _this.requestPermission(classId).then(deferred.resolve); }); },
            no: deferred.resolve,
            message: 'are_you_sure_approve_permission'
        });
        return deferred.promise;
    };
    return StudentSessionService;
}());
exports.StudentSessionService = StudentSessionService;
//# sourceMappingURL=StudentSessionService.js.map