"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityTeachResultsController_1 = require("../../activities/controllers/ActivityTeachResultsController");
var ParticipantTeachResultsController = /** @class */ (function (_super) {
    __extends(ParticipantTeachResultsController, _super);
    /*@ngInject*/
    function ParticipantTeachResultsController($stateParams, activity) {
        var _this = _super.call(this, $stateParams, activity) || this;
        _this.disableSharing = _this.isPlaying;
        return _this;
    }
    return ParticipantTeachResultsController;
}(ActivityTeachResultsController_1.ActivityTeachResultsController));
exports.ParticipantTeachResultsController = ParticipantTeachResultsController;
//# sourceMappingURL=ParticipantTeachResultsController.js.map