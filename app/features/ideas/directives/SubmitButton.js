"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SubmitButton_1 = require("../../activities/directives/SubmitButton");
var SubmitButton_2 = require("../../activities/directives/SubmitButton");
var IdeasSubmitButtonController = /** @class */ (function (_super) {
    __extends(IdeasSubmitButtonController, _super);
    function IdeasSubmitButtonController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'ideas';
        return _this;
    }
    IdeasSubmitButtonController.prototype.submit = function () {
        var currentUser = localStorage.getItem("currentUser");
        var userName = JSON.parse(currentUser).userName;
        return _super.prototype.submit.call(this, { association: this.association, userName: userName, file: this.file });
    };
    return IdeasSubmitButtonController;
}(SubmitButton_1.ActivitySubmitButtonController));
var IdeasSubmitButton = /** @class */ (function (_super) {
    __extends(IdeasSubmitButton, _super);
    function IdeasSubmitButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.controller = IdeasSubmitButtonController;
        _this.bindings = {
            activity: '<',
            association: '@',
            file: '@',
            isValid: '<'
        };
        return _this;
    }
    return IdeasSubmitButton;
}(SubmitButton_2.ActivitySubmitButton));
exports.IdeasSubmitButton = IdeasSubmitButton;
//# sourceMappingURL=SubmitButton.js.map