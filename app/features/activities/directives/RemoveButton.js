"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityRemoveButtonController = /** @class */ (function () {
    /*@ngInject*/
    function ActivityRemoveButtonController(Activities, $state, ngDialogRouter) {
        this.Activities = Activities;
        this.$state = $state;
        this.ngDialogRouter = ngDialogRouter;
    }
    ActivityRemoveButtonController.prototype.remove = function () {
        var _this = this;
        this.ngDialogRouter.go('are-you-sure', {
            message: 'activity-remove-confirmation',
            yes: function () {
                return _this.Activities.remove(_this.activity)
                    .then(function () { return _this.$state.back(); });
            }
        }, false, { appendClassName: this.type });
    };
    return ActivityRemoveButtonController;
}());
var template = "\n<click-once-button on-click=\"$ctrl.remove()\">\n  <span>{{'delete-activity' | translate}}</span>\n  <loader></loader>\n</click-once-button>";
var ActivityRemoveButton = /** @class */ (function () {
    function ActivityRemoveButton() {
        this.controller = ActivityRemoveButtonController;
        this.template = template;
        this.bindings = {
            activity: '<',
            type: '@'
        };
    }
    return ActivityRemoveButton;
}());
exports.ActivityRemoveButton = ActivityRemoveButton;
//# sourceMappingURL=RemoveButton.js.map