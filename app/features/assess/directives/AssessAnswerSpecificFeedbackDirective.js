"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssessAnswerSpecificFeedbackController = /** @class */ (function () {
    function AssessAnswerSpecificFeedbackController() {
    }
    AssessAnswerSpecificFeedbackController.prototype.show = function () {
        return this.answer.specificFeedback && (this.answer.selected || this.answer.status);
    };
    return AssessAnswerSpecificFeedbackController;
}());
var AssessAnswerSpecificFeedback = /** @class */ (function () {
    function AssessAnswerSpecificFeedback() {
        this.controller = AssessAnswerSpecificFeedbackController;
        this.template = "<div class=\"assess-solve-answer-feedback\" ng-show=\"$ctrl.show()\">{{$ctrl.answer.specificFeedback}}</div>";
        this.bindings = {
            answer: '<'
        };
    }
    return AssessAnswerSpecificFeedback;
}());
exports.AssessAnswerSpecificFeedback = AssessAnswerSpecificFeedback;
//# sourceMappingURL=AssessAnswerSpecificFeedbackDirective.js.map