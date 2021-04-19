"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
var MissingStudentsController = /** @class */ (function () {
    function MissingStudentsController(CurrentSession, classInfo) {
        this.CurrentSession = CurrentSession;
        this.classInfo = classInfo;
    }
    MissingStudentsController.prototype.getMissingCount = function () {
        return this.CurrentSession.getAttendanceMgr().getMissingCount();
    };
    return MissingStudentsController;
}());
exports.MissingStudentsController = MissingStudentsController;
//# sourceMappingURL=MissingStudentsController.js.map