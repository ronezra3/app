"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AttendanceController = /** @class */ (function () {
    /*@ngInject*/
    function AttendanceController(CurrentSession, $stateParams) {
        this.$stateParams = $stateParams;
        this.classId = this.$stateParams['classId'];
        this.attendanceManager = CurrentSession.getAttendanceMgr();
        this.sessionId = CurrentSession.getInfo().id;
    }
    AttendanceController.prototype.$onInit = function () {
        var _this = this;
        this.attendanceManager.onAttendingMembersChanged(function () { return _this.updateAttendingCount(); });
        this.updateAttendingCount();
    };
    AttendanceController.prototype.updateAttendingCount = function () {
        this.attendingCount = this.attendanceManager.getAttendingCount() || 0;
    };
    AttendanceController.prototype.getAttendingCount = function () {
        return this.attendanceManager.getAttendingCount();
    };
    return AttendanceController;
}());
var template = "\n<button class=\"panel-button\"\n  ui-sref=\"attendance({classId: $ctrl.classId, sessionId: $ctrl.sessionId})\" ng-click=\"\">\n  <div class=\"number-icon\">{{$ctrl.getAttendingCount()}}</div>\n  <span class=\"text\">{{'attending' | translate}}</span>\n</button>\n";
var AttendanceButton = /** @class */ (function () {
    function AttendanceButton() {
        this.template = template;
        this.controller = AttendanceController;
    }
    return AttendanceButton;
}());
exports.AttendanceButton = AttendanceButton;
//# sourceMappingURL=AttendanceButton.js.map