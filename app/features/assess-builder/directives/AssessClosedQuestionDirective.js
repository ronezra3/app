"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssessClosedQuestionController = /** @class */ (function () {
    /*@ngInject*/
    function AssessClosedQuestionController(CurrentSession, Utilities) {
        this.CurrentSession = CurrentSession;
        this.questionService = Utilities.getFactoryByName(this.question.type + "Question");
        this.questionService.initialize(this.question);
    }
    AssessClosedQuestionController.prototype.addAnswer = function () {
        this.questionService.addAnswer(this.question, { content: '', isNew: true });
    };
    AssessClosedQuestionController.prototype.isInSession = function () {
        return this.CurrentSession.isActive();
    };
    return AssessClosedQuestionController;
}());
var AssessClosedQuestion = /** @class */ (function () {
    function AssessClosedQuestion() {
        this.template = require('./../templates/assess-closed-question.html');
        this.controller = AssessClosedQuestionController;
        this.bindings = {
            question: '<',
            immediateFeedback: '<'
        };
    }
    return AssessClosedQuestion;
}());
exports.AssessClosedQuestion = AssessClosedQuestion;
//# sourceMappingURL=AssessClosedQuestionDirective.js.map