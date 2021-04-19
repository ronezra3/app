"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssessPreviewContentController = /** @class */ (function () {
    /*@ngInject*/
    function AssessPreviewContentController(lodash) {
        this.lodash = lodash;
    }
    AssessPreviewContentController.prototype.addQuestion = function (type) {
        this.activity.questions.push({ type: type });
    };
    AssessPreviewContentController.prototype.removeQuestion = function (question) {
        this.lodash.pull(this.activity.questions, question);
    };
    AssessPreviewContentController.prototype.getQuestionIndex = function (question, index) {
        return question.index = index;
    };
    AssessPreviewContentController.prototype.immediateFeedbackChanged = function (immediateFeedback) {
        this.activity.immediateFeedback = immediateFeedback;
    };
    return AssessPreviewContentController;
}());
var AssessPreviewContent = /** @class */ (function () {
    function AssessPreviewContent() {
        this.controller = AssessPreviewContentController;
        this.template = require('./../templates/preview-content.html');
        this.bindings = {
            isRequired: '<',
            form: '<',
            activity: '<'
        };
    }
    return AssessPreviewContent;
}());
exports.AssessPreviewContent = AssessPreviewContent;
//# sourceMappingURL=PreviewContent.js.map