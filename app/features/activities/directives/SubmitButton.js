"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivitySubmitButtonController = /** @class */ (function () {
    /*@ngInject*/
    function ActivitySubmitButtonController(Activities, $state) {
        this.Activities = Activities;
        this.$state = $state;
    }
    ActivitySubmitButtonController.prototype.validate = function () {
        if (this.type == 'url' && !this.isValid) {
            return 'empty-form';
        }
        return this.isValid ? null : 'invalid-form';
    };
    ActivitySubmitButtonController.prototype.submit = function (response) {
        return this.Activities.submit(this.type, this.activity, response)
            .then(this.postSubmit.bind(this));
    };
    ActivitySubmitButtonController.prototype.postSubmit = function () {
        return this.$state.go('responseSubmitted', { type: this.type }, { replace: true });
    };
    return ActivitySubmitButtonController;
}());
exports.ActivitySubmitButtonController = ActivitySubmitButtonController;
var template = "\n<click-once-button on-click=\"$ctrl.submit()\" is-valid=\"$ctrl.validate()\" class=\"activity-submit-button\">\n  <span>{{'submit' | translate}}</span>\n  <loader></loader>\n</click-once-button>\n";
var ActivitySubmitButton = /** @class */ (function () {
    function ActivitySubmitButton() {
        this.controller = ActivitySubmitButtonController;
        this.template = template;
        this.bindings = {
            activity: '<',
            type: '@',
            isValid: '<'
        };
    }
    return ActivitySubmitButton;
}());
exports.ActivitySubmitButton = ActivitySubmitButton;
//# sourceMappingURL=SubmitButton.js.map