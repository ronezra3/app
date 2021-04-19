"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClassController = /** @class */ (function () {
    /*@ngInject*/
    function ClassController($state, classInfo, Localytics, TeacherSessionMediator, CurrentSession) {
        this.$state = $state;
        this.classInfo = classInfo;
        this.Localytics = Localytics;
        this.TeacherSessionMediator = TeacherSessionMediator;
        this.CurrentSession = CurrentSession;
    }
    ClassController.prototype.sessionStarted = function () {
        var _this = this;
        return this.CurrentSession.load(this.classInfo.id).then(function (session) {
            _this.TeacherSessionMediator.subscribe(session);
            _this.Localytics.tagEvent('Session Synced');
            return _this.$state.go('teach.books', { classId: _this.classInfo.id }).then(function () {
                return _this.TeacherSessionMediator.sync(session);
            });
        }).catch(function () {
            return _this.CurrentSession.start(_this.classInfo.id).then(function (session) {
                _this.Localytics.tagEvent('Session Started');
                _this.TeacherSessionMediator.subscribe(session);
                return _this.$state.go('sessionStarted', { classId: _this.classInfo.id });
            });
        });
    };
    return ClassController;
}());
exports.ClassController = ClassController;
//# sourceMappingURL=ClassController.js.map