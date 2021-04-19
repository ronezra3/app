"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceWrapper_1 = require("../services/ResourceWrapper");
var SaveButton_1 = require("../../activities/directives/SaveButton");
var SaveButton_2 = require("../../activities/directives/SaveButton");
var AssessSaveButtonController = /** @class */ (function (_super) {
    __extends(AssessSaveButtonController, _super);
    /*@ngInject*/
    function AssessSaveButtonController(lodash, Utilities, ActivityEvents, Activities, $state) {
        var _this = _super.call(this, $state, Activities, ActivityEvents) || this;
        _this.lodash = lodash;
        _this.Utilities = Utilities;
        return _this;
    }
    AssessSaveButtonController.prototype.validate = function () {
        return _super.prototype.validate.call(this) || ResourceWrapper_1.AssessResourceWrapper.validate(this.activity, this.Utilities, this.lodash);
    };
    return AssessSaveButtonController;
}(SaveButton_2.ActivitySaveButtonController));
var AssessSaveButton = /** @class */ (function (_super) {
    __extends(AssessSaveButton, _super);
    function AssessSaveButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.controller = AssessSaveButtonController;
        return _this;
    }
    return AssessSaveButton;
}(SaveButton_1.ActivitySaveButton));
exports.AssessSaveButton = AssessSaveButton;
//# sourceMappingURL=SaveButton.js.map