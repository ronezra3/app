"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StudentQuestionController = /** @class */ (function () {
    /*@ngInject*/
    function StudentQuestionController(Utilities, $scope) {
        this.Utilities = Utilities;
        this.$scope = $scope;
    }
    StudentQuestionController.prototype.isFullyAnswered = function (question) {
        return this.Utilities.getFactoryByName(question.type + 'Question').isFullyAnswered(question);
    };
    StudentQuestionController.prototype.isShowFeedback = function (question, answer) {
        if (!this.isFullyAnswered(question)) {
            return false;
        }
        return Boolean(answer.selected);
    };
    return StudentQuestionController;
}());
var template = "\n<header>\n  <correct-question-indicator question=\"$ctrl.question\" is-fully-answered=\"$ctrl.isFullyAnswered($ctrl.question)\" \n    ng-show=\"$ctrl.immediateFeedback\"></correct-question-indicator>\n  <assess-question-title question=\"$ctrl.question\"></assess-question-title>\n</header>\n<assess-multi-question-explanation question=\"$ctrl.question\" ng-if=\"$ctrl.question.type === 'multi'\"></assess-multi-question-explanation>\n<ol>\n  <li ng-repeat=\"answer in $ctrl.question.answers\">\n    <assess-answer-button is-fully-answered=\"$ctrl.isFullyAnswered($ctrl.question)\" answer=\"answer\" question=\"$ctrl.question\"\n                          student-assess=\"$ctrl.studentAssess\" immediate=\"$ctrl.immediateFeedback\"></assess-answer-button>\n    <div class=\"answer-content\">{{answer.content}}</div>\n    <assess-answer-specific-feedback answer=\"answer\" ng-show=\"$ctrl.isShowFeedback($ctrl.question, answer)\" \n      ng-if=\"$ctrl.immediateFeedback\"></assess-answer-specific-feedback>\n  </li>\n</ol>\n";
var StudentQuestion = /** @class */ (function () {
    function StudentQuestion() {
        this.controller = StudentQuestionController;
        this.template = template;
        this.bindings = {
            question: '<',
            immediateFeedback: '<',
            studentAssess: '<'
        };
    }
    return StudentQuestion;
}());
exports.StudentQuestion = StudentQuestion;
//# sourceMappingURL=StudentQuestion.js.map