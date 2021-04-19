"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityTeachPreviewController_1 = require("../../activities/controllers/ActivityTeachPreviewController");
var ParticipantTeachPreviewController = /** @class */ (function (_super) {
    __extends(ParticipantTeachPreviewController, _super);
    /*@ngInject*/
    function ParticipantTeachPreviewController(lodash, CurrentSession, activity) {
        var _this = _super.call(this, activity) || this;
        _this.lodash = lodash;
        _this.CurrentSession = CurrentSession;
        return _this;
    }
    ParticipantTeachPreviewController.prototype.prePublish = function () {
        var attending = this.CurrentSession.getAttendanceMgr().getAttending();
        this.activity.studentsScriptIds = this.lodash(attending).chain().sample(4).value();
        return null;
    };
    return ParticipantTeachPreviewController;
}(ActivityTeachPreviewController_1.ActivityTeachPreviewController));
exports.ParticipantTeachPreviewController = ParticipantTeachPreviewController;
//# sourceMappingURL=ParticipantTeachPreviewController.js.map