"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BackButton_1 = require("../../../3rdparty/common/layout/directives/BackButton");
var template = "\n<button ng-click=\"$ctrl.back()\">\n  <ng-include src=\"'3rdparty/common/images/back_arrow.svg'\"></ng-include>\n</button>\n";
var ActivityBackButton = /** @class */ (function () {
    function ActivityBackButton() {
        this.template = template;
        this.controller = BackButton_1.BackButtonController;
    }
    return ActivityBackButton;
}());
exports.ActivityBackButton = ActivityBackButton;
//# sourceMappingURL=BackButton.js.map