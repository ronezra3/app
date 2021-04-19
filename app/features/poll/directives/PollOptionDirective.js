"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PollOptionController = /** @class */ (function () {
    function PollOptionController() {
    }
    PollOptionController.prototype.$onInit = function () {
        var _this = this;
        this.answer = this.answers[this.index];
        this.otherAnswers = this.answers.filter(function (answer) {
            return answer !== _this.answer;
        });
    };
    return PollOptionController;
}());
var template = "\n<input class=\"activity-input\" type=\"text\" ng-model=\"$ctrl.answer.title\"\n       ng-required=\"$ctrl.isRequired\"\n       duplicated-answer-validator\n       duplicated-answer-validator-answers=\"$ctrl.otherAnswers\"\n       name=\"option-{{$ctrl.index + 1}}\"\n       focus-on=\"{{$ctrl.answer.shouldFocus}}\"\n       placeholder=\"{{($ctrl.isRequired ? 'poll-option-placeholder' : ($ctrl.index + 1 | numberToLetter)) | translate}}\"/>\n<button class=\"poll-option-delete\" ng-click=\"$ctrl.onDelete({title: $ctrl.answer.title})\"\n        ng-disabled=\"$ctrl.canDelete()\">\n  <ng-include class=\"delete-icon\" src=\"'images/x-icon.svg'\"></ng-include>\n</button>\n";
var PollOption = /** @class */ (function () {
    function PollOption() {
        this.controller = PollOptionController;
        this.template = template;
        this.bindings = {
            isRequired: '<',
            answers: '<',
            index: '<',
            onDelete: '&',
            canDelete: '&'
        };
    }
    return PollOption;
}());
exports.PollOption = PollOption;
//# sourceMappingURL=PollOptionDirective.js.map