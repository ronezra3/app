"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityTeachPreviewController_1 = require("../../activities/controllers/ActivityTeachPreviewController");
var AssessPreviewController = /** @class */ (function (_super) {
    __extends(AssessPreviewController, _super);
    /*@ngInject*/
    function AssessPreviewController(activity) {
        var _this = _super.call(this, activity) || this;
        if (!_this.activity.questions) {
            _this.activity.questions = [];
        }
        return _this;
    }
    AssessPreviewController.prototype.getSpecificData = function () {
        return {
            questionsCount: this.activity.questions.length,
            immediateFeedbackEnabled: !!this.activity.immediateFeedback,
            timeLimit: this.activity.time
        };
    };
    return AssessPreviewController;
}(ActivityTeachPreviewController_1.ActivityTeachPreviewController));
exports.AssessPreviewController = AssessPreviewController;
//# sourceMappingURL=AssessPreviewController.js.map