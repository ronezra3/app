"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CorrectQuestionIndicatorController = /** @class */ (function () {
    /*@ngInject*/
    function CorrectQuestionIndicatorController(Utilities) {
        this.Utilities = Utilities;
    }
    CorrectQuestionIndicatorController.prototype.isCorrect = function (question) {
        return this.Utilities.getFactoryByName(question.type + 'Question').isCorrect(question);
    };
    return CorrectQuestionIndicatorController;
}());
var template = "\n<div class=\"question-status ng-hide correct fade-animation\" ng-show=\"$ctrl.isFullyAnswered && $ctrl.isCorrect($ctrl.question)\">\n  <ng-include src=\"'images/v_icon2.svg'\"></ng-include>\n</div>\n<div class=\"question-status ng-hide incorrect fade-animation\" ng-show=\"$ctrl.isFullyAnswered && !$ctrl.isCorrect($ctrl.question)\">\n  <ng-include src=\"'images/x-icon.svg'\"></ng-include>\n</div>\n";
var CorrectQuestionIndicator = /** @class */ (function () {
    function CorrectQuestionIndicator() {
        this.controller = CorrectQuestionIndicatorController;
        this.template = template;
        this.bindings = {
            question: '<',
            isFullyAnswered: '<'
        };
    }
    return CorrectQuestionIndicator;
}());
exports.CorrectQuestionIndicator = CorrectQuestionIndicator;
//# sourceMappingURL=CorrectQuestionIndicatorDirective.js.map