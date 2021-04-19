"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<div class=\"poll-answer-status-wrapper\">\n  <progress class=\"poll-answer-status-progress\" ng-value=\"$ctrl.answer.voters.length\" max=\"{{$ctrl.total}}\"></progress>\n  <span class=\"poll-answer-status-title\">{{$ctrl.answer.title  || ($ctrl.index + 1 | numberToLetter | translate)}}</span>\n  <span class=\"poll-answer-status-number\">\n    {{$ctrl.answer.voters.length}}\n    <ng-include class=\"poll-answer-voters-icon\" src=\"'images/poll/voters.svg'\"></ng-include>\n  </span>\n</div>\n";
var PollAnswerStatus = /** @class */ (function () {
    function PollAnswerStatus() {
        this.template = template;
        this.bindings = {
            answer: '<',
            index: '<',
            total: '<'
        };
    }
    return PollAnswerStatus;
}());
exports.PollAnswerStatus = PollAnswerStatus;
//# sourceMappingURL=PollAnswerStatusDirective.js.map