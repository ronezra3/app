"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PublishButton_1 = require("../../activities/directives/PublishButton");
var PublishButton_2 = require("../../activities/directives/PublishButton");
var ResourceWrapper_1 = require("../services/ResourceWrapper");
var AssessPublishButtonController = /** @class */ (function (_super) {
    __extends(AssessPublishButtonController, _super);
    /*@ngInject*/
    function AssessPublishButtonController(lodash, Utilities, ActivityEvents, Activities, $state, CurrentSession) {
        var _this = _super.call(this, $state, Activities, ActivityEvents, Utilities, CurrentSession) || this;
        _this.lodash = lodash;
        return _this;
    }
    AssessPublishButtonController.prototype.validate = function () {
        return _super.prototype.validate.call(this) || ResourceWrapper_1.AssessResourceWrapper.validate(this.activity, this.Utilities, this.lodash);
    };
    return AssessPublishButtonController;
}(PublishButton_2.ActivityPublishButtonController));
var AssessPublishButton = /** @class */ (function (_super) {
    __extends(AssessPublishButton, _super);
    function AssessPublishButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.controller = AssessPublishButtonController;
        return _this;
    }
    return AssessPublishButton;
}(PublishButton_1.ActivityPublishButton));
exports.AssessPublishButton = AssessPublishButton;
//# sourceMappingURL=PublishButton.js.map