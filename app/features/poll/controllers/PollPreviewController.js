"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityTeachPreviewController_1 = require("../../activities/controllers/ActivityTeachPreviewController");
var PollPreviewController = /** @class */ (function (_super) {
    __extends(PollPreviewController, _super);
    function PollPreviewController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PollPreviewController.prototype.getSpecificData = function () {
        return { optionsCount: this.activity.answers.length };
    };
    return PollPreviewController;
}(ActivityTeachPreviewController_1.ActivityTeachPreviewController));
exports.PollPreviewController = PollPreviewController;
//# sourceMappingURL=PollPreviewController.js.map