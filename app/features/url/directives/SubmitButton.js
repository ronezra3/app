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
var UrlSubmitButtonController = /** @class */ (function (_super) {
    __extends(UrlSubmitButtonController, _super);
    function UrlSubmitButtonController(Activities, $state) {
        var _this = _super.call(this, Activities, $state) || this;
        _this.type = 'url';
        return _this;
    }
    UrlSubmitButtonController.prototype.submit = function () {
        var currentUser = localStorage.getItem("currentUser");
        var userName = JSON.parse(currentUser).userName;
        return _super.prototype.submit.call(this, { association: this.association, userName: userName, file: this.file });
    };
    return UrlSubmitButtonController;
}(SubmitButton_1.ActivitySubmitButtonController));
var UrlSubmitButton = /** @class */ (function (_super) {
    __extends(UrlSubmitButton, _super);
    function UrlSubmitButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.controller = UrlSubmitButtonController;
        _this.bindings = {
            activity: '<',
            index: '<',
            association: '@',
            answer: '<',
            file: '@',
            isValid: '<'
        };
        return _this;
    }
    return UrlSubmitButton;
}(SubmitButton_2.ActivitySubmitButton));
exports.UrlSubmitButton = UrlSubmitButton;
//# sourceMappingURL=SubmitButton.js.map