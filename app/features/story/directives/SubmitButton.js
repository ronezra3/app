"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SubmitButton_1 = require("../../activities/directives/SubmitButton");
var SubmitButton_2 = require("../../activities/directives/SubmitButton");
var StorySubmitButtonController = /** @class */ (function (_super) {
    __extends(StorySubmitButtonController, _super);
    function StorySubmitButtonController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'story';
        return _this;
    }
    StorySubmitButtonController.prototype.submit = function () {
        return _super.prototype.submit.call(this, { association: this.association });
    };
    return StorySubmitButtonController;
}(SubmitButton_1.ActivitySubmitButtonController));
var StorySubmitButton = /** @class */ (function (_super) {
    __extends(StorySubmitButton, _super);
    function StorySubmitButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.controller = StorySubmitButtonController;
        _this.bindings = {
            activity: '<',
            association: '@',
            isValid: '<'
        };
        return _this;
    }
    return StorySubmitButton;
}(SubmitButton_2.ActivitySubmitButton));
exports.StorySubmitButton = StorySubmitButton;
//# sourceMappingURL=SubmitButton.js.map