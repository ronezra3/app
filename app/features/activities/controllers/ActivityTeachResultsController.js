"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityTeachResultsController = /** @class */ (function () {
    /*@ngInject*/
    function ActivityTeachResultsController($stateParams, activity) {
        this.$stateParams = $stateParams;
        this.activity = activity;
        this.isPlaying = this.$stateParams.isPlaying || false;
        this.disableSharing = this.$stateParams.disableSharing || false;
        console.log(activity);
    }
    ActivityTeachResultsController.prototype.postShareCallback = function () {
        this.isPlaying = false;
        this.disableSharing = true;
    };
    return ActivityTeachResultsController;
}());
exports.ActivityTeachResultsController = ActivityTeachResultsController;
//# sourceMappingURL=ActivityTeachResultsController.js.map