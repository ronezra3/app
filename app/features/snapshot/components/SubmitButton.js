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
var SnapshotSubmitButtonController = /** @class */ (function (_super) {
    __extends(SnapshotSubmitButtonController, _super);
    /*@ngInject*/
    function SnapshotSubmitButtonController(Activities, $state) {
        var _this = _super.call(this, Activities, $state) || this;
        _this.isValid = true;
        _this.type = 'snapshot';
        return _this;
    }
    SnapshotSubmitButtonController.prototype.submit = function () {
        var _this = this;
        setTimeout(function () {
            return _super.prototype.submit.call(_this, { vote: _this.voteType });
        }, 1000);
    };
    SnapshotSubmitButtonController.prototype.voteTypeFn = function () {
        return this.voteType == 'yes' ? 'V' : 'X';
    };
    return SnapshotSubmitButtonController;
}(SubmitButton_1.ActivitySubmitButtonController));
var template = "\n<click-once-button on-click=\"$ctrl.submit()\" class=\"container {{$ctrl.voteType}}\">\n  <ng-include src=\"'images/new/' + $ctrl.voteTypeFn() + '.svg'\"></ng-include>\n  <circular-progress-bar class=\"white\"></circular-progress-bar>\n</click-once-button>\n";
var SnapshotSubmitButton = /** @class */ (function () {
    function SnapshotSubmitButton() {
        this.controller = SnapshotSubmitButtonController;
        this.template = template;
        this.bindings = {
            activity: '<',
            voteType: '@type'
        };
    }
    return SnapshotSubmitButton;
}());
exports.SnapshotSubmitButton = SnapshotSubmitButton;
//# sourceMappingURL=SubmitButton.js.map