"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionReportsController_1 = require("./controllers/SessionReportsController");
var SessionReportItemDirective_1 = require("./directives/SessionReportItemDirective");
var SessionReportsScrollDirective_1 = require("./directives/SessionReportsScrollDirective");
var TimePickerContainerDirective_1 = require("./directives/TimePickerContainerDirective");
exports.default = angular.module('LearniApp.session-reports', [])
    .value('SessionReportsValues', {
    reportsBulkSize: 10
})
    .controller('SessionReportsController', SessionReportsController_1.SessionReportsController)
    .directive('sessionReportItem', SessionReportItemDirective_1.SessionReportItem)
    .directive('sessionReportsScroll', SessionReportsScrollDirective_1.SessionReportsScroll)
    .directive('timePickerContainer', TimePickerContainerDirective_1.TimePickerContainer).name;
//# sourceMappingURL=index.js.map