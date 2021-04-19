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
var PollSubmitButtonController = /** @class */ (function (_super) {
    __extends(PollSubmitButtonController, _super);
    /*@ngInject*/
    function PollSubmitButtonController(Activities, $state) {
        var _this = _super.call(this, Activities, $state) || this;
        _this.isValid = true;
        _this.type = 'poll';
        return _this;
    }
    PollSubmitButtonController.prototype.submit = function () {
        var _this = this;
        setTimeout(function () {
            _super.prototype.submit.call(_this, { answerId: _this.answer.id });
        }, 1000);
    };
    return PollSubmitButtonController;
}(SubmitButton_1.ActivitySubmitButtonController));
exports.PollSubmitButtonController = PollSubmitButtonController;
var template = "\n<click-once-button on-click=\"$ctrl.submit()\">\n  <span>{{$ctrl.answer.title || ($ctrl.index + 1 | numberToLetter | translate)}}</span>\n  <loader></loader>\n</click-once-button>\n";
var PollSubmitButton = /** @class */ (function () {
    function PollSubmitButton() {
        this.controller = PollSubmitButtonController;
        this.template = template;
        this.bindings = {
            activity: '<',
            index: '<',
            answer: '<'
        };
    }
    return PollSubmitButton;
}());
exports.PollSubmitButton = PollSubmitButton;
//# sourceMappingURL=SubmitButton.js.map