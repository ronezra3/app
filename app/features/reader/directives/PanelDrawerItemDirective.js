"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PanelDrawerItemController = /** @class */ (function () {
    /*@ngInject*/
    function PanelDrawerItemController(ActivitiesRouter) {
        this.ActivitiesRouter = ActivitiesRouter;
    }
    PanelDrawerItemController.prototype.open = function () {
        return this.ActivitiesRouter.open(this.bookActivity.activityType, this.mode, this.bookActivity.pageUrl);
    };
    return PanelDrawerItemController;
}());
var template = "\n<button ng-class=\"$ctrl.bookActivity.activityType\" ng-click=\"$ctrl.open()\">\n  <span>\n    <span class=\"published\" ng-show=\"$ctrl.bookActivity.published\">\n      <ng-include src=\"'images/v_icon2.svg'\"></ng-include>\n    </span>\n    <ng-include class=\"icon\" src=\"'images/panel/icons/' + $ctrl.bookActivity.activityType + '.svg'\"></ng-include>\n    <span class=\"title\" ng-if=\"$ctrl.bookActivity\">{{'page' | translate}} {{$ctrl.bookActivity.pageUrl}}</span>\n  </span>\n</button>\n";
var PanelDrawerItem = /** @class */ (function () {
    function PanelDrawerItem() {
        this.controller = PanelDrawerItemController;
        this.template = template;
        this.bindings = {
            bookActivity: '<',
            mode: '@'
        };
    }
    return PanelDrawerItem;
}());
exports.PanelDrawerItem = PanelDrawerItem;
//# sourceMappingURL=PanelDrawerItemDirective.js.map