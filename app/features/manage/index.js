"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ManageBooksController_1 = require("./books/controllers/ManageBooksController");
var ManageController_1 = require("./controllers/ManageController");
var ManageInfoController_1 = require("./info/controllers/ManageInfoController");
var ManageTabButton_1 = require("./directives/ManageTabButton");
var ManageNewPassword_1 = require("./students/controllers/ManageNewPassword");
var ManagePasswordReset_1 = require("./students/controllers/ManagePasswordReset");
var ManageRemoveStudent_1 = require("./students/controllers/ManageRemoveStudent");
var ManageStudentModal_1 = require("./students/controllers/ManageStudentModal");
var ManageStudents_1 = require("./students/controllers/ManageStudents");
var ClassStudentDirective_1 = require("./students/directives/ClassStudentDirective");
var ManageStudentAvatar_1 = require("./students/directives/ManageStudentAvatar");
exports.default = angular.module('LearniApp.manage', [])
    .config(function ($stateProvider, ngDialogRouterProvider) {
    $stateProvider
        .state('manage', new ManageController_1.ManageState())
        .state('manage.info', new ManageInfoController_1.ManageInfoState())
        .state('manage.books', new ManageBooksController_1.ManageBooksState())
        .state('manage.students', new ManageStudents_1.ManageStudentsState());
    ngDialogRouterProvider
        .state('manage.student', new ManageStudentModal_1.ManageStudentModalState())
        .state('manage.student.remove', new ManageRemoveStudent_1.ManageRemoveStudentState())
        .state('manage.password.reset', new ManagePasswordReset_1.ManagePasswordResetState())
        .state('manage.password.new', new ManageNewPassword_1.ManageNewPasswordState());
})
    .directive('manageTabButton', ManageTabButton_1.ManageTabButton)
    .component('classStudent', new ClassStudentDirective_1.ClassStudent())
    .directive('manageStudentAvatar', ManageStudentAvatar_1.ManageStudentAvatar).name;
//# sourceMappingURL=index.js.map