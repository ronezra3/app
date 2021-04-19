"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<assess-question-title question=\"$ctrl.question\"></assess-question-title>\n<ol>\n  <li ng-repeat=\"answer in $ctrl.question.answers\">\n    <correct-answer-picker question=\"$ctrl.question\" answer=\"answer\" is-disabled=\"true\"></correct-answer-picker>\n    <div class=\"answer-content\">{{answer.content}}</div>\n  </li>\n</ol>\n";
var StudentQuestionMock = /** @class */ (function () {
    function StudentQuestionMock() {
        this.template = template;
        this.bindings = {
            question: '<'
        };
    }
    return StudentQuestionMock;
}());
exports.StudentQuestionMock = StudentQuestionMock;
//# sourceMappingURL=StudentQuestionMock.js.map