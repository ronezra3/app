"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssessMultiQuestionExplanationController = /** @class */ (function () {
    /*@ngInject*/
    function AssessMultiQuestionExplanationController(Utilities) {
        this.correctCount = Utilities.getFactoryByName('MultiQuestion').correctCount(this.question);
    }
    return AssessMultiQuestionExplanationController;
}());
var template = "\n<div class=\"assess-solve-student-question-correct-count\">\n  {{'choose_answers' | translate: {answerCount: $ctrl.correctCount} }}\n</div>\n";
var AssessMultiQuestionExplanation = /** @class */ (function () {
    function AssessMultiQuestionExplanation() {
        this.controller = AssessMultiQuestionExplanationController;
        this.template = template;
        this.bindings = {
            question: '<'
        };
    }
    return AssessMultiQuestionExplanation;
}());
exports.AssessMultiQuestionExplanation = AssessMultiQuestionExplanation;
//# sourceMappingURL=AssessMultiQuestionExplanationDirective.js.map