"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityPublishButtonController = /** @class */ (function () {
    /*@ngInject*/
    function ActivityPublishButtonController($state, Activities, ActivityEvents, Utilities, CurrentSession) {
        this.$state = $state;
        this.Activities = Activities;
        this.ActivityEvents = ActivityEvents;
        this.Utilities = Utilities;
        this.CurrentSession = CurrentSession;
    }
    ActivityPublishButtonController.prototype.validate = function () {
        if (this.isValid === undefined && this.type === 'url') {
            return 'wait-for-load';
        }
        if (!this.isValid) {
            return 'invalid-form';
        }
        // if (this.CurrentSession.getAttendanceMgr().getAttendingCount() <= 0) {
        //   return 'empty-session';
        // }
        return null;
    };
    ActivityPublishButtonController.prototype.publish = function () {
        var prePublishPromise = this.prePublish();
        if (this.Utilities.isqPromise(prePublishPromise)) {
            return prePublishPromise.then(this.verifiedPublish.bind(this));
        }
        return this.verifiedPublish();
    };
    ActivityPublishButtonController.prototype.verifiedPublish = function () {
        var _this = this;
        var isContextual = !!this.$state.params['pageUrl'];
        return this.Activities.publish(this.type, this.$state.params.classId, this.activity, isContextual).then(function () {
            _this.ActivityEvents.tagPublish(_this.type, !_this.activity.id, isContextual, _this.getSpecificData());
            _this.postPublish();
            return _this.$state.go(_this.type + "-" + (_this.nextScreen || 'teach-results'), {
                isPlaying: true,
                activityId: _this.activity.id,
                classId: _this.$state.params.classId
            }, { replace: true });
        });
    };
    return ActivityPublishButtonController;
}());
exports.ActivityPublishButtonController = ActivityPublishButtonController;
var template = "\n<click-once-button on-click=\"$ctrl.publish()\" is-valid=\"$ctrl.validate()\">\n\n  <span>{{('publish' + (($ctrl.activity.id || $ctrl.isDirty) ? '' : '-default')) | translate}}</span>\n  <loader></loader>\n</click-once-button>\n";
//   <ng-include class="pressed" src="'images/publish-pressed.svg'"></ng-include>
// <ng-include class="standby" src="'images/publish.svg'"></ng-include>
var ActivityPublishButton = /** @class */ (function () {
    function ActivityPublishButton() {
        this.controller = ActivityPublishButtonController;
        this.template = template;
        this.bindings = {
            activity: '<',
            type: '@',
            getSpecificData: '&',
            isValid: '<',
            isDirty: '<',
            prePublish: '&',
            postPublish: '&',
            nextScreen: '@?'
        };
    }
    return ActivityPublishButton;
}());
exports.ActivityPublishButton = ActivityPublishButton;
//# sourceMappingURL=PublishButton.js.map