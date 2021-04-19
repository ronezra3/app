"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssessReportContentController = /** @class */ (function () {
    /*@ngInject*/
    function AssessReportContentController(StudentAssess, lodash) {
        this.StudentAssess = StudentAssess;
        this.lodash = lodash;
        this.allStudentAssessments = this.StudentAssess.query({ ids: [this.activity.id] });
    }
    AssessReportContentController.prototype.getQuestionGrade = function (question) {
        return this.activity.calculateQuestionGrade(this.allStudentAssessments, question);
    };
    AssessReportContentController.prototype.getStudentName = function (studentAssess) {
        if (this.members) {
            var memeber = this.lodash.find(this.members, { id: studentAssess.studentId });
            return memeber ? memeber.getFullName() : "משתמש אנונימי";
        }
    };
    AssessReportContentController.prototype.getAverageGrade = function () {
        if (this.allStudentAssessments.$resolved && this.activity.$resolved) {
            return this.activity.getAverageGrade(this.allStudentAssessments);
        }
    };
    return AssessReportContentController;
}());
var template = "\n<table>\n  <thead>\n    <tr>\n      <th>{{'name' | translate}}</th>\n      <th>{{'sum' | translate}}</th>\n      <th ng-repeat=\"question in $ctrl.activity.questions\">{{'q' | translate}}{{question.index}}</th>\n    </tr>\n    <tr>\n      <td>{{'class-grade' | translate}}</td>\n      <td>{{$ctrl.getAverageGrade() | percentage:1}}</td>\n      <td ng-repeat=\"question in $ctrl.activity.questions\">{{$ctrl.getQuestionGrade(question) | percentage:1}}</td>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat=\"studentAssess in $ctrl.allStudentAssessments\">\n      <td>{{$ctrl.getStudentName(studentAssess)}}</td>\n      <td>{{studentAssess.getAverage() | percentage:1}}</td>\n      <td ng-repeat=\"question in $ctrl.activity.questions\">\n        <is-correct is-correct=\"studentAssess.isCorrectAnswer(question)\"></is-correct>\n      </td>\n    </tr>\n  </tbody>\n</table>\n";
var AssessReportContent = /** @class */ (function () {
    function AssessReportContent() {
        this.controller = AssessReportContentController;
        this.template = template;
        this.bindings = {
            activity: '<',
            members: '<'
        };
    }
    return AssessReportContent;
}());
exports.AssessReportContent = AssessReportContent;
//# sourceMappingURL=ReportContent.js.map