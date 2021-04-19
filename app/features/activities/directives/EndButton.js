"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityEndButtonController = /** @class */ (function () {
    /*@ngInject*/
    function ActivityEndButtonController(Activities, $state) {
        this.Activities = Activities;
        this.$state = $state;
    }
    ActivityEndButtonController.prototype.end = function () {
        if (this.preEndCallback) {
            this.preEndCallback();
        }
        this.Activities.unSubscribe(this.type, 'submit');
        return this.Activities.finish(this.type, this.activity);
    };
    ActivityEndButtonController.prototype.endAndBack = function () {
        var _this = this;
        return this.end().then(function () {
            _this.$state.back();
        });
    };
    return ActivityEndButtonController;
}());
exports.ActivityEndButtonController = ActivityEndButtonController;
var template = "\n<click-once-button on-click=\"$ctrl.endAndBack()\" class=\"ease-in\">\n\n  <span>{{'end' | translate}}</span>\n  <loader></loader>\n</click-once-button>\n";
// <ng-include class="standby primary-icon" src="'images/end-activity-primary.svg'"></ng-include>
// <ng-include class="pressed primary-icon" src="'images/end-activity-pressed-primary.svg'"></ng-include>
// <ng-include class="standby secondary-icon" src="'images/end-activity-secondary.svg'"></ng-include>
// <ng-include class="pressed secondary-icon" src="'images/end-activity-pressed-secondary.svg'"></ng-include>
var ActivityEndButton = /** @class */ (function () {
    function ActivityEndButton() {
        this.controller = ActivityEndButtonController;
        this.template = template;
        this.bindings = {
            activity: '<',
            type: '@',
            preEndCallback: '&'
        };
    }
    return ActivityEndButton;
}());
exports.ActivityEndButton = ActivityEndButton;
//# sourceMappingURL=EndButton.js.map