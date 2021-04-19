"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivitySaveButtonController = /** @class */ (function () {
    /*@ngInject*/
    function ActivitySaveButtonController($state, Activities, ActivityEvents) {
        this.$state = $state;
        this.Activities = Activities;
        this.ActivityEvents = ActivityEvents;
    }
    ActivitySaveButtonController.prototype.validate = function () {
        return this.isValid ? null : 'invalid-form';
    };
    ActivitySaveButtonController.prototype.save = function () {
        var _this = this;
        var isContextual = !!this.$state.params['pageUrl'];
        return this.Activities.save(this.type, this.activity, this.$state.params.classId, isContextual).then(function () {
            _this.ActivityEvents.tagSave(_this.type, !_this.activity.id, isContextual, _this.getSpecificData());
            return _this.$state.back();
        });
    };
    return ActivitySaveButtonController;
}());
exports.ActivitySaveButtonController = ActivitySaveButtonController;
var template = "\n<click-once-button on-click=\"$ctrl.save()\" is-valid=\"$ctrl.validate()\">\n  <span>{{'save-and-close' | translate}}</span>\n  <loader></loader>\n</click-once-button>\n";
var ActivitySaveButton = /** @class */ (function () {
    function ActivitySaveButton() {
        this.controller = ActivitySaveButtonController;
        this.template = template;
        this.bindings = {
            activity: '<',
            type: '@',
            getSpecificData: '&',
            isValid: '<'
        };
    }
    return ActivitySaveButton;
}());
exports.ActivitySaveButton = ActivitySaveButton;
//# sourceMappingURL=SaveButton.js.map