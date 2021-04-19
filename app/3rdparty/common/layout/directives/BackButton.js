"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BackButtonController = /** @class */ (function () {
    /*@ngInject*/
    function BackButtonController($state) {
        this.$state = $state;
    }
    BackButtonController.prototype.back = function () {
        this.$state.back().then(this.onBack);
    };
    return BackButtonController;
}());
exports.BackButtonController = BackButtonController;
var template = "\n<button ng-click=\"$ctrl.back()\">\n  <ng-include src=\"'3rdparty/common/images/back_arrow.svg'\"></ng-include>\n</button>\n";
var BackButton = /** @class */ (function () {
    function BackButton() {
        this.template = template;
        this.controller = BackButtonController;
        this.bindings = {
            onBack: '&'
        };
    }
    return BackButton;
}());
exports.BackButton = BackButton;
//# sourceMappingURL=BackButton.js.map