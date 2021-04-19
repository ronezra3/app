"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssessAnswerController = /** @class */ (function () {
    /*@ngInject*/
    function AssessAnswerController(CurrentSession, Utilities) {
        this.CurrentSession = CurrentSession;
        this.questionService = Utilities.getFactoryByName(this.question.type + "Question");
        this.questionService.initialize(this.question);
    }
    AssessAnswerController.prototype.closeFeedbackInput = function ($event) {
        var enterKeyCode = 13;
        if ($event.keyCode !== enterKeyCode) {
            return;
        }
        this.feedbackShown = false;
        $event.preventDefault();
    };
    AssessAnswerController.prototype.isInSession = function () {
        return this.CurrentSession.isActive();
    };
    return AssessAnswerController;
}());
var AssessAnswer = /** @class */ (function () {
    function AssessAnswer() {
        this.template = require('./../templates/assess-answer-option.html');
        this.controller = AssessAnswerController;
        this.bindings = {
            answer: '<',
            question: '<',
            answerNumber: '@',
            immediateFeedback: '<'
        };
    }
    return AssessAnswer;
}());
exports.AssessAnswer = AssessAnswer;
//# sourceMappingURL=AssessAnswerOptionDirective.js.map