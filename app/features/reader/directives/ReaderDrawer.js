"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReaderDrawerController = /** @class */ (function () {
    /*@ngInject*/
    function ReaderDrawerController(CurrentBookActivities, Localytics) {
        this.CurrentBookActivities = CurrentBookActivities;
        this.Localytics = Localytics;
        this.bookActivities = this.CurrentBookActivities.get();
    }
    ReaderDrawerController.prototype.toggle = function () {
        if (!this.isShown) {
            this.Localytics.tagEvent('Drawer Opened', {
                mode: this.mode
            });
        }
        this.isShown = !this.isShown;
    };
    return ReaderDrawerController;
}());
exports.ReaderDrawerController = ReaderDrawerController;
var template = "\n<ul class=\"collapsed\" ng-class=\"{'collapsed': !$ctrl.isShown}\">\n  <li ng-if=\"$ctrl.bookActivities.length === 0\" class=\"empty-mode\">\n    <h2>{{ \"drawer_empty_mode_title\" | translate }}</h2>\n  </li>\n  <li ng-repeat=\"bookActivity in $ctrl.bookActivities | orderBy:'pageUrl':false:$ctrl.comparePages\">\n    <panel-drawer-item book-activity=\"bookActivity\" mode=\"{{$ctrl.mode}}\"></panel-drawer-item>\n    <div class=\"strip\"></div>\n  </li>\n</ul>\n\n<button ng-class=\"{'open': $ctrl.isShown}\" ng-click=\"$ctrl.toggle()\"\n        on-drag-left=\"$ctrl.isShown = true\"\n        on-drag-right=\"$ctrl.isShown = false\">\n  <ng-include src=\"'images/panel/drawer/panel_drawer_toggle_icon.svg'\"></ng-include>\n</button>\n";
var ReaderDrawer = /** @class */ (function () {
    function ReaderDrawer() {
        this.controller = ReaderDrawerController;
        this.template = template;
        this.bindings = {
            mode: '@',
            comparePages: '<'
        };
    }
    return ReaderDrawer;
}());
exports.ReaderDrawer = ReaderDrawer;
//# sourceMappingURL=ReaderDrawer.js.map