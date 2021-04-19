"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AttendanceController = /** @class */ (function () {
    /*@ngInject*/
    function AttendanceController(attendanceManager, classInfo, members, lodash) {
        this.attendanceManager = attendanceManager;
        this.classInfo = classInfo;
        this.members = members;
        this.lodash = lodash;
    }
    AttendanceController.prototype.isAttending = function (member) {
        return this.attendanceManager.isAttending(member.id);
    };
    AttendanceController.prototype.getAttendingCount = function () {
        return this.attendanceManager.getAttendingCount();
    };
    AttendanceController.prototype.removeMember = function (student) {
        this.lodash.remove(this.members, student);
    };
    return AttendanceController;
}());
var template = "\n<view class=\"gray-view flex-view attendance\">\n  <navigation-bar>\n    <left-buttons>\n      <back-button></back-button>\n    </left-buttons>\n\n    <nav-bar-title>\n      <span>{{'attending' | translate}} {{$ctrl.getAttendingCount()}}</span>\n\n      <div class=\"extended-title\">\n        <ng-include class=\"clock\" src=\"'images/manage/lock_icon.svg'\"></ng-include>\n        <span>{{ $ctrl.classInfo.code.toUpperCase()}}</span>\n      </div>\n    </nav-bar-title>\n  </navigation-bar>\n\n  <content scrollable=\"true\">\n    <div ng-if=\"$ctrl.members.length === 0\" class=\"empty-mode\">\n      <h2>{{ \"attendance_empty_mode_title\" | translate }}</h2>\n      <p>{{ \"attendance_empty_mode_desc\" | translate: {code: $ctrl.classInfo.code.toUpperCase()} }}</p>\n    </div>\n\n    <ul class=\"wrap-panel\">\n      <li ng-repeat=\"member in $ctrl.members\"\n          ng-show=\"$ctrl.isAttending(member)\">\n        <member-thumbnail member=\"member\" on-remove=\"$ctrl.removeMember(student)\"></member-thumbnail>\n      </li>\n    </ul>\n  </content>\n</view>\n";
var AttendanceState = /** @class */ (function () {
    function AttendanceState() {
        this.url = '/:classId/attendance/:sessionId';
        this.template = template;
        this.controller = AttendanceController;
        this.controllerAs = '$ctrl';
        this.resolve = {
            /*@ngInject*/
            members: function (UsersStore, $stateParams) { return UsersStore.query({ classId: $stateParams['classId'] }); },
            /*@ngInject*/
            attendanceManager: function (AttendanceFactory, CurrentSession, $stateParams) {
                return CurrentSession.isActive() ? CurrentSession.getAttendanceMgr() : AttendanceFactory($stateParams['sessionId']);
            },
            /*@ngInject*/
            classInfo: function (ClassesStore, $stateParams) { return ClassesStore.get($stateParams['classId']); }
        };
    }
    return AttendanceState;
}());
exports.AttendanceState = AttendanceState;
//# sourceMappingURL=AttendanceState.js.map