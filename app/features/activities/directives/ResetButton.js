"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EndButton_1 = require("./EndButton");
var ActivityResetButtonController = /** @class */ (function (_super) {
    __extends(ActivityResetButtonController, _super);
    /*@ngInject*/
    function ActivityResetButtonController(Activities, $state, CurrentBook, CurrentSession, ngDialogRouter, $q) {
        var _this = _super.call(this, Activities, $state) || this;
        _this.CurrentBook = CurrentBook;
        _this.CurrentSession = CurrentSession;
        _this.ngDialogRouter = ngDialogRouter;
        _this.$q = $q;
        return _this;
    }
    ActivityResetButtonController.prototype.endAndReset = function () {
        var deferred = this.$q.defer();
        if (this.shouldEnd) {
            return this.end()
                .then(this.reset.bind(this)).then(deferred.resolve);
        }
        return this.reset().then(deferred.resolve);
    };
    ActivityResetButtonController.prototype.reset = function () {
        var _this = this;
        var nextScreen = this.type + "-" + (this.CurrentSession.isActive() ? 'teach' : 'enrich') + "-preview";
        return this.Activities.reset(this.activity)
            .then(function () {
            return _this.$state.go(nextScreen, {
                activityId: _this.activity.id,
                classId: _this.$state.params['classId'],
                pageUrl: _this.CurrentBook.pageUrl
            }, {
                replace: true
            });
        });
    };
    return ActivityResetButtonController;
}(EndButton_1.ActivityEndButtonController));
var template = "\n<click-once-button on-click=\"$ctrl.endAndReset()\">\n\n  <span>{{'reset-activity' | translate}}</span>\n  <loader></loader>\n</click-once-button>";
//   <ng-include class="pressed" src="'images/reset-pressed.svg'"></ng-include>
// <ng-include class="standby" src="'images/reset.svg'"></ng-include>
var ActivityResetButton = /** @class */ (function () {
    function ActivityResetButton() {
        this.controller = ActivityResetButtonController;
        this.template = template;
        this.bindings = {
            activity: '<',
            type: '@',
            shouldEnd: '<',
            preEndCallback: '&?'
        };
    }
    return ActivityResetButton;
}());
exports.ActivityResetButton = ActivityResetButton;
//# sourceMappingURL=ResetButton.js.map