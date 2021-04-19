"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParticipantPlayController = /** @class */ (function () {
    /*@ngInject*/
    function ParticipantPlayController($state, members, activity, classInfo) {
        this.$state = $state;
        this.members = members;
        this.activity = activity;
        this.classInfo = classInfo;
    }
    ParticipantPlayController.prototype.isTeacher = function () {
        return this.classInfo.isTeacher();
    };
    ParticipantPlayController.prototype.onDone = function () {
        var role = this.isTeacher() ? 'teach' : 'student';
        this.$state.go("participant-" + role + "-results", {
            classId: this.$state.params.classId,
            activityId: this.activity.id,
            isPlaying: true,
            disableSharing: true
        }, { replace: true });
    };
    return ParticipantPlayController;
}());
exports.ParticipantPlayController = ParticipantPlayController;
//# sourceMappingURL=ParticipantPlayController.js.map