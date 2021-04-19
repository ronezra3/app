"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SubmitButton_1 = require("../../activities/directives/SubmitButton");
var AssessAnswerButtonController = /** @class */ (function (_super) {
    __extends(AssessAnswerButtonController, _super);
    /*@ngInject*/
    function AssessAnswerButtonController(ActivityResponses, Utilities, lodash, $state) {
        var _this = _super.call(this, ActivityResponses, $state) || this;
        _this.Utilities = Utilities;
        _this.lodash = lodash;
        _this.isValid = true;
        _this.type = 'assess';
        return _this;
    }
    AssessAnswerButtonController.prototype.displayX = function () {
        return this.answer.selected && this.immediate && !this.answer.status && this.isFullyAnswered;
    };
    AssessAnswerButtonController.prototype.select = function () {
        var questionService = this.Utilities.getFactoryByName(this.question.type + 'Question');
        questionService.toggleAnswerSelected(this.question, this.answer);
        var updatedQuestion = this.lodash.find(this.studentAssess.questions, { index: this.question.index });
        updatedQuestion.status = questionService.isFullyAnswered(this.question) ?
            (questionService.isCorrect(this.question) ? 'correct' : 'incorrect') : '';
        updatedQuestion.answers = this.lodash.chain(this.question.answers).where({ selected: true }).map('_id').value();
        return _super.prototype.submit.call(this, this.studentAssess);
    };
    AssessAnswerButtonController.prototype.postSubmit = function () {
        // assess doesn't have a thank you screen
    };
    return AssessAnswerButtonController;
}(SubmitButton_1.ActivitySubmitButtonController));
var template = "\n<button ng-click=\"$ctrl.select()\" ng-disabled=\"$ctrl.isFullyAnswered && $ctrl.immediate\" class=\"assess-solve-answer-button\"\n        ng-class=\"{'round' : $ctrl.question.type !== 'multi',\n                    'selected': $ctrl.answer.selected, 'immediate': $ctrl.immediate,\n                    'correct' : $ctrl.answer.status && $ctrl.isFullyAnswered && $ctrl.immediate,\n                    'incorrect': !$ctrl.answer.status && $ctrl.isFullyAnswered && $ctrl.immediate}\">\n  <ng-include ng-if=\"!$ctrl.displayX()\" src=\"'images/v_icon2.svg'\"></ng-include>\n  <ng-include ng-if=\"$ctrl.displayX()\" src=\"'images/x-icon.svg'\"></ng-include>\n \n</button>\n";
var AssessAnswerButton = /** @class */ (function () {
    function AssessAnswerButton() {
        this.template = template;
        this.controller = AssessAnswerButtonController;
        this.bindings = {
            immediate: '<',
            isFullyAnswered: '<',
            question: '<',
            answer: '<',
            studentAssess: '<'
        };
    }
    return AssessAnswerButton;
}());
exports.AssessAnswerButton = AssessAnswerButton;
//# sourceMappingURL=AnswerButtonDirective.js.map