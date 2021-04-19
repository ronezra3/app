"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionReportController_1 = require("./controllers/SessionReportController");
var AssessSessionReportDirective_1 = require("./directives/AssessSessionReportDirective");
var IdeasSessionReportDirective_1 = require("./directives/IdeasSessionReportDirective");
var PollSessionReportDirective_1 = require("./directives/PollSessionReportDirective");
var SessionReportBookLocationDirective_1 = require("./directives/SessionReportBookLocationDirective");
var SessionReportSectionDirective_1 = require("./directives/SessionReportSectionDirective");
var SnapshotSessionReportDirective_1 = require("./directives/SnapshotSessionReportDirective");
var StudentSessionButton_1 = require("./directives/StudentSessionButton");
var TeacherSessionButtonDirective_1 = require("./directives/TeacherSessionButtonDirective");
var CurrentSession_1 = require("./services/CurrentSession");
var SessionProxy_1 = require("./services/SessionProxy");
var StudentSessionMediator_1 = require("./services/StudentSessionMediator");
var TeacherSessionMediator_1 = require("./services/TeacherSessionMediator");
var StudentSessionService_1 = require("./services/StudentSessionService");
var dependencies = ['session-join-popup', 'join-button'].map(function (name) { return require("./" + name + "/index").default; });
exports.default = angular.module('LearniApp.session', dependencies)
    .value('SessionReportValues', {
    reportedActivitiesTypes: ['assess', 'ideas', 'poll', 'snapshot']
})
    .config(function ($stateProvider) { return $stateProvider.state('report', new SessionReportController_1.SessionReportState()); })
    .controller('SessionReportController', SessionReportController_1.SessionReportController)
    .directive('assessSessionReport', AssessSessionReportDirective_1.AssessSessionReport)
    .directive('ideasSessionReport', IdeasSessionReportDirective_1.IdeasSessionReport)
    .directive('pollSessionReport', PollSessionReportDirective_1.PollSessionReport)
    .component('sessionReportBookLocation', new SessionReportBookLocationDirective_1.SessionReportBookLocationComponent())
    .directive('sessionReportSection', SessionReportSectionDirective_1.SessionReportSection)
    .directive('snapshotSessionReport', SnapshotSessionReportDirective_1.SnapshotSessionReport)
    .component('studentSessionButton', new StudentSessionButton_1.StudentSessionButtonComponent())
    .component('teacherSessionButton', new TeacherSessionButtonDirective_1.TeacherSessionButton())
    .service('CurrentSession', CurrentSession_1.CurrentSession)
    .service('StudentSessionService', StudentSessionService_1.StudentSessionService)
    .service('SessionProxy', SessionProxy_1.SessionProxy)
    .service('StudentSessionMediator', StudentSessionMediator_1.StudentSessionMediator)
    .service('TeacherSessionMediator', TeacherSessionMediator_1.TeacherSessionMediator).name;
//# sourceMappingURL=index.js.map