"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssessQuestionStatsController = /** @class */ (function () {
    /*@ngInject*/
    function AssessQuestionStatsController(CurrentSession) {
        this.CurrentSession = CurrentSession;
    }
    AssessQuestionStatsController.prototype.getAttendingCount = function () {
        return this.CurrentSession.getAttendanceMgr().getAttendingCount();
    };
    return AssessQuestionStatsController;
}());
exports.AssessQuestionStatsController = AssessQuestionStatsController;
//# sourceMappingURL=AssessQuestionStatsController.js.map