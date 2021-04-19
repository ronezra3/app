"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AttendanceButton_1 = require("./AttendanceButton");
var AttendanceFactory_1 = require("./AttendanceFactory");
var AttendanceManager_1 = require("./AttendanceManager");
var AttendanceState_1 = require("./AttendanceState");
exports.default = angular.module('LearniApp.attendance', [])
    .component('attendanceButton', new AttendanceButton_1.AttendanceButton())
    .factory('AttendanceFactory', AttendanceFactory_1.AttendanceFactory)
    .factory('AttendanceManager', AttendanceManager_1.AttendanceManagerFactory)
    .config(function ($stateProvider) { return $stateProvider.state('attendance', new AttendanceState_1.AttendanceState()); }).name;
//# sourceMappingURL=index.js.map