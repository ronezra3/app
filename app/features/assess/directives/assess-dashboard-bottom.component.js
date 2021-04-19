"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssessDashboardBottomController = /** @class */ (function () {
    /*@ngInject*/
    function AssessDashboardBottomController(Localytics, ngDialogRouter, lodash) {
        this.Localytics = Localytics;
        this.ngDialogRouter = ngDialogRouter;
        this.lodash = lodash;
    }
    AssessDashboardBottomController.prototype.openStudentStats = function (student) {
        var questions;
        var studentAssess = this.lodash.find(this.results.get(), { 'studentId': student.id });
        if (studentAssess.questions) {
            questions = studentAssess.questions;
        }
        else {
            questions = this.lodash.map(this.questions, function (question) { return ({ index: question.index, status: '' }); });
        }
        this.ngDialogRouter.go('assess.student.stats', {
            selectedStudent: student,
            selectedStudentQuestions: questions
        });
    };
    AssessDashboardBottomController.prototype.openNeedHelpStudentStats = function (student) {
        this.Localytics.tagEvent('Need Help Student Opened');
        this.openStudentStats(student);
    };
    AssessDashboardBottomController.prototype.openQuestionStats = function (question) {
        this.ngDialogRouter.go('assess.questions.stats', {
            selectedQuestion: question
        });
    };
    return AssessDashboardBottomController;
}());
var template = "\n<div class=\"smart-data\">\n  <div class=\"assess-dashboard-need-help-sub-header\">{{'need-help' | translate}}</div>\n  <div class=\"assess-dashboard-need-help-box\">\n    <button ng-repeat=\"student in $ctrl.needHelpStudents\" class=\"assess-dashboard-need-help-item-button\"\n            ng-click=\"$ctrl.openNeedHelpStudentStats(student)\">\n      <div class=\"assess-dashboard-need-help-students-circle member-circle\">\n        <img class=\"member-image\" csp-src=\"{{student.getAvatarUrl()}}\"/>\n        <div class=\"assess-dashboard-need-help-pressed-cover\"></div>\n      </div>\n      <span class=\"assess-dashboard-need-help-students-name-label\">{{student.getFullName()}}</span>\n    </button>\n    <div ng-if=\"$ctrl.needHelpStudents.length === 0\" class=\"empty-mode\">\n      <h4>{{ \"assess_need_help_empty_mode_title\" | translate }}</h4>\n    </div>\n  </div>\n\n  <div class=\"assess-dashboard-challenging-sub-header\">{{'challenging-questions' | translate}}</div>\n  <div class=\"assess-dashboard-challenging-box\">\n    <button ng-repeat=\"question in $ctrl.challengingContent\" class=\"assess-dashboard-challenging-button\"\n            ng-click=\"$ctrl.openQuestionStats(question)\">\n      <div class=\"assess-dashboard-need-help-question\">Q{{question.index}}</div>\n    </button>\n    <div ng-if=\"$ctrl.challengingContent.length === 0\" class=\"empty-mode\">\n      <h4>{{ \"assess_challenging_empty_mode_title\" | translate }}</h4>\n    </div>\n  </div>\n</div>\n\n<assess-dashboard-students\n  students-data=\"$ctrl.studentsData\"\n  class=\"assess-dashboard-students-container\"\n  open-student-stats=\"$ctrl.openStudentStats(student)\"></assess-dashboard-students>\n";
var AssessDashboardBottom = /** @class */ (function () {
    function AssessDashboardBottom() {
        this.template = template;
        this.controller = AssessDashboardBottomController;
        this.bindings = {
            needHelpStudents: '<',
            challengingContent: '<',
            studentsData: '<',
            results: '<',
            questions: '<'
        };
    }
    return AssessDashboardBottom;
}());
exports.AssessDashboardBottom = AssessDashboardBottom;
//# sourceMappingURL=assess-dashboard-bottom.component.js.map