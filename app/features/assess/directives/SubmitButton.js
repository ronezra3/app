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
var SubmitButton_2 = require("../../activities/directives/SubmitButton");
var AssessSubmitButtonController = /** @class */ (function (_super) {
    __extends(AssessSubmitButtonController, _super);
    /*@ngInject*/
    function AssessSubmitButtonController(ActivityResponses, lodash, ngDialogRouter, $state, $q) {
        var _this = _super.call(this, ActivityResponses, $state) || this;
        _this.lodash = lodash;
        _this.ngDialogRouter = ngDialogRouter;
        _this.$q = $q;
        _this.isValid = true;
        _this.type = 'assess';
        return _this;
    }
    AssessSubmitButtonController.prototype.submit = function () {
        var _this = this;
        var missingQuestionsStr = this.lodash.chain(this.studentAssess.questions)
            .where({ status: '' })
            .map(function (missingQuestion) {
            return 'Q' + missingQuestion.index.toString();
        })
            .join(', ').value();
        if (missingQuestionsStr.length === 0) {
            return this.submitForm();
        }
        var deferred = this.$q.defer();
        this.ngDialogRouter.go('are-you-sure', {
            message: 'confirm-submit-sure',
            secondMessage: 'confirm-submit-questions',
            yes: function () { return _this.submitForm().then(deferred.resolve); },
            no: deferred.reject,
            translationData: { questionCount: missingQuestionsStr }
        });
        return deferred.promise;
    };
    AssessSubmitButtonController.prototype.postSubmit = function () {
        return this.$state.go('responseSubmitted', { type: this.type }, { replace: true });
    };
    AssessSubmitButtonController.prototype.submitForm = function () {
        this.studentAssess.submitted = true;
        return _super.prototype.submit.call(this, this.studentAssess).then(this.postSubmit.bind(this));
    };
    return AssessSubmitButtonController;
}(SubmitButton_1.ActivitySubmitButtonController));
exports.AssessSubmitButtonController = AssessSubmitButtonController;
var AssessSubmitButton = /** @class */ (function (_super) {
    __extends(AssessSubmitButton, _super);
    function AssessSubmitButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.controller = AssessSubmitButtonController;
        _this.bindings = {
            studentAssess: '<'
        };
        return _this;
    }
    return AssessSubmitButton;
}(SubmitButton_2.ActivitySubmitButton));
exports.AssessSubmitButton = AssessSubmitButton;
//# sourceMappingURL=SubmitButton.js.map