"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AttendanceStatsController = /** @class */ (function () {
    /*@ngInject*/
    function AttendanceStatsController(CurrentSession, UsersStore) {
        this.CurrentSession = CurrentSession;
        this.UsersStore = UsersStore;
        this.membersLength = null;
        this.attendanceMgr = this.CurrentSession.getAttendanceMgr();
    }
    AttendanceStatsController.prototype.getAttendingCount = function () {
        return this.attendanceMgr.getAttendingCount();
    };
    AttendanceStatsController.prototype.getMissingCount = function () {
        var attendingCount = this.attendanceMgr.getAttendingCount();
        return this.membersLength > attendingCount ? this.membersLength - attendingCount : 0;
    };
    AttendanceStatsController.prototype.$onInit = function () {
        var _this = this;
        this.UsersStore.query({ classId: this.classId }).then(function (members) { return _this.membersLength = members.length; });
    };
    return AttendanceStatsController;
}());
exports.AttendanceStatsController = AttendanceStatsController;
var template = "\n<loader class=\"attendance-stats-loader\" ng-show=\"$ctrl.membersLength === null\"></loader>\n<div class=\"attendance-stat attending\" ng-if=\"$ctrl.membersLength !== null\">\n  <div class=\"number\">{{$ctrl.getAttendingCount()}}</div>\n  <div class=\"person\">\n    <div class=\"head\"></div>\n    <div class=\"body\"></div>\n  </div>\n  <span>{{\"joined\" | translate}}</span>\n</div>\n\n";
// <div class="attendance-stat not-attending" ng-if="$ctrl.membersLength !== null">
//   <div class="number">{{$ctrl.getMissingCount()}}</div>
//   <div class="person">
//     <div class="head"></div>
//     <div class="body"></div>
//   </div>
//   <span>{{"not_yet" | translate}}</span>
// </div>
var AttendanceStats = /** @class */ (function () {
    function AttendanceStats() {
        this.template = template;
        this.controller = AttendanceStatsController;
        this.bindings = {
            classId: '<'
        };
    }
    return AttendanceStats;
}());
exports.AttendanceStats = AttendanceStats;
//# sourceMappingURL=AttendanceStats.js.map