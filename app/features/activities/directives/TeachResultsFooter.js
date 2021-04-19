"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityTeachResultsFooterController = /** @class */ (function () {
    /*@ngInject*/
    function ActivityTeachResultsFooterController(CurrentSession) {
        this.CurrentSession = CurrentSession;
    }
    ActivityTeachResultsFooterController.prototype.updateAttendance = function () {
        if (this.isPlaying) {
            this.activity.attendedCount = this.CurrentSession.getAttendanceMgr().getAttendingCount();
        }
    };
    return ActivityTeachResultsFooterController;
}());
exports.ActivityTeachResultsFooterController = ActivityTeachResultsFooterController;
var template = "\n<nav class=\"activity-buttons-nav padded\">\n  <activity-reset-button class=\"primary\" should-end=\"$ctrl.isPlaying || $ctrl.disableSharing\" class=\"secondary\" pre-end-callback=\"$ctrl.updateAttendance()\"\n                         activity=\"$ctrl.activity\" type=\"{{$ctrl.type}}\"></activity-reset-button>\n  <activity-end-button class=\"primary\" ng-show=\"$ctrl.isPlaying || $ctrl.disableSharing\" type=\"{{$ctrl.type}}\" activity=\"$ctrl.activity\"\n    class=\"{{$ctrl.disableSharing ? 'primary' : 'secondary' }}\" pre-end-callback=\"$ctrl.updateAttendance()\"></activity-end-button>\n  <activity-share-button class=\"primary\" ng-show=\"!$ctrl.disableSharing\" type=\"{{$ctrl.type}}\" activity=\"$ctrl.activity\"\n    post-share-callback=\"$ctrl.postShareCallback()\" pre-share-callback=\"$ctrl.updateAttendance()\"></activity-share-button>\n</nav>\n";
var ActivityTeachResultsFooter = /** @class */ (function () {
    function ActivityTeachResultsFooter() {
        this.controller = ActivityTeachResultsFooterController;
        this.template = template;
        this.bindings = {
            type: '@',
            disableSharing: '<',
            activity: '<',
            isPlaying: '<',
            postShareCallback: '&',
        };
    }
    return ActivityTeachResultsFooter;
}());
exports.ActivityTeachResultsFooter = ActivityTeachResultsFooter;
//# sourceMappingURL=TeachResultsFooter.js.map