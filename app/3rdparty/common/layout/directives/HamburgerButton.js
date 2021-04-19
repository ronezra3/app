"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HamburgerButtonController = /** @class */ (function () {
    /*@ngInject*/
    function HamburgerButtonController($rootScope) {
        this.$rootScope = $rootScope;
    }
    HamburgerButtonController.prototype.toggleSideBar = function () {
        this.$rootScope.$broadcast('toggleRightSidebar');
    };
    return HamburgerButtonController;
}());
var template = "\n<button ng-click=\"$ctrl.toggleSideBar()\">\n    <ng-include src=\"'images/menu_dark.svg'\"></ng-include>\n</button>\n";
/*@ngInject*/
var HamburgerButton = /** @class */ (function () {
    function HamburgerButton() {
        this.controller = HamburgerButtonController;
        this.template = template;
    }
    return HamburgerButton;
}());
exports.HamburgerButton = HamburgerButton;
//# sourceMappingURL=HamburgerButton.js.map