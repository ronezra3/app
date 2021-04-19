"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityButtonController = /** @class */ (function () {
    /*@ngInject*/
    function ActivityButtonController($state, CurrentBook, CurrentBookActivities, ActivitiesRouter) {
        this.$state = $state;
        this.CurrentBook = CurrentBook;
        this.CurrentBookActivities = CurrentBookActivities;
        this.ActivitiesRouter = ActivitiesRouter;
    }
    ActivityButtonController.prototype.click = function () {
        if (!this.isInReader()) {
            return this.ActivitiesRouter.open(this.type, this.mode);
        }
        return this.ActivitiesRouter.open(this.type, this.mode, this.CurrentBook.pageUrl);
    };
    ActivityButtonController.prototype.indicationVisible = function () {
        if (!this.isInReader()) {
            return false;
        }
        var bookActivity = this.CurrentBookActivities.findOneByTypeAndPage(this.type, this.CurrentBook.pageUrl);
        return bookActivity && !bookActivity.published;
    };
    ActivityButtonController.prototype.isInReader = function () {
        return this.$state.includes('*.reader.*');
    };
    return ActivityButtonController;
}());
var template = "\n<button class=\"panel-button\" id=\"{{$ctrl.type}}\" ng-click=\"$ctrl.click()\">\n  <span class=\"layer-indication\" ng-show=\"$ctrl.indicationVisible()\"></span>\n  <ng-include class=\"activity-icon\" src=\"'images/panel/icons/' + $ctrl.type + '.svg'\"></ng-include>\n  <span class=\"text\">{{$ctrl.type | translate}}</span>\n</button>\n";
var ActivityButton = /** @class */ (function () {
    function ActivityButton() {
        this.controller = ActivityButtonController;
        this.template = template;
        this.bindings = {
            type: '@',
            mode: '@'
        };
    }
    return ActivityButton;
}());
exports.ActivityButton = ActivityButton;
//# sourceMappingURL=ActivityButton.js.map