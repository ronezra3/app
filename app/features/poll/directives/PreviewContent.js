"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PollPreviewContentController = /** @class */ (function () {
    /*@ngInject*/
    function PollPreviewContentController(PollValues, Localytics) {
        this.PollValues = PollValues;
        this.Localytics = Localytics;
    }
    PollPreviewContentController.prototype.$onInit = function () {
        if (!this.activity.id) {
            this.activity.answers = [];
            for (var i = 0; i < this.PollValues.defaultAnswers; i++) {
                this.activity.answers.push({ title: '' });
            }
        }
    };
    PollPreviewContentController.prototype.canDelete = function () {
        return this.activity.answers.length > this.PollValues.minAnswers;
    };
    PollPreviewContentController.prototype.canAddAnswers = function () {
        return this.activity.answers.length < this.PollValues.maxAnswers;
    };
    PollPreviewContentController.prototype.addAnswer = function () {
        this.Localytics.tagEvent('Poll Answer Added');
        return this.activity.answers.push({ title: '', shouldFocus: true });
    };
    PollPreviewContentController.prototype.removeAnswerAt = function (answerIndex) {
        this.activity.answers.splice(answerIndex, 1);
    };
    return PollPreviewContentController;
}());
var PollPreviewContent = /** @class */ (function () {
    function PollPreviewContent() {
        this.controller = PollPreviewContentController;
        this.template = require('./../templates/preview-content.html');
        this.bindings = {
            isRequired: '<',
            form: '<',
            activity: '<'
        };
    }
    return PollPreviewContent;
}());
exports.PollPreviewContent = PollPreviewContent;
//# sourceMappingURL=PreviewContent.js.map