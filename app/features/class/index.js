"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClassController_1 = require("./controllers/ClassController");
var ClassHeaderTitleDirective_1 = require("./directives/ClassHeaderTitleDirective");
var ClassMenuItemDirective_1 = require("./directives/ClassMenuItemDirective");
var MissingStudentsSectionDirective_1 = require("./directives/MissingStudentsSectionDirective");
var SessionReportsButtonDirective_1 = require("./directives/SessionReportsButtonDirective");
var ClassesProxy_1 = require("./services/ClassesProxy");
var ClassesStore_1 = require("./services/ClassesStore");
var SessionEventsFactory_1 = require("./services/SessionEventsFactory");
var SubjectsProxy_1 = require("./services/SubjectsProxy");
exports.default = angular.module('LearniApp.class', [])
    .controller('ClassController', ClassController_1.ClassController)
    .directive('classHeaderTitle', ClassHeaderTitleDirective_1.ClassHeaderTitle)
    .directive('classMenuItem', ClassMenuItemDirective_1.ClassMenuItem)
    .component('missingStudentsSection', new MissingStudentsSectionDirective_1.MissingStudentsSection())
    .directive('sessionReportsButton', SessionReportsButtonDirective_1.SessionReportsButton)
    .factory('ClassesProxy', ClassesProxy_1.ClassesProxy)
    .service('ClassesStore', ClassesStore_1.ClassesStore)
    .service('SessionEvents', SessionEventsFactory_1.SessionEvents)
    .factory('SubjectsProxy', SubjectsProxy_1.SubjectsProxy).name;
//# sourceMappingURL=index.js.map