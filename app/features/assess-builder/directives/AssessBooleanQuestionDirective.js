"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssessBooleanQuestionController = /** @class */ (function () {
    /*@ngInject*/
    function AssessBooleanQuestionController(CurrentSession) {
        this.CurrentSession = CurrentSession;
    }
    AssessBooleanQuestionController.prototype.isInSession = function () {
        return this.CurrentSession.isActive();
    };
    return AssessBooleanQuestionController;
}());
var AssessBooleanQuestion = /** @class */ (function () {
    function AssessBooleanQuestion() {
        this.template = require('./../templates/assess-boolean-question.html');
        this.controller = AssessBooleanQuestionController;
        this.bindings = {
            question: '<',
            immediateFeedback: '<',
        };
    }
    return AssessBooleanQuestion;
}());
exports.AssessBooleanQuestion = AssessBooleanQuestion;
//# sourceMappingURL=AssessBooleanQuestionDirective.js.map