"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityShareButtonController = /** @class */ (function () {
    /*@ngInject*/
    function ActivityShareButtonController(Activities) {
        this.Activities = Activities;
    }
    ActivityShareButtonController.prototype.share = function () {
        this.preShareCallback();
        this.Activities.unSubscribe(this.type, 'submit');
        return this.Activities.share(this.type, this.activity).then(this.postShareCallback);
    };
    return ActivityShareButtonController;
}());
var template = "\n<click-once-button on-click=\"$ctrl.share()\">\n\n  <span>{{'share' | translate}}</span>\n  <loader></loader>\n</click-once-button>\n";
// <ng-include class="pressed" src="'images/share-pressed.svg'"></ng-include>
// <ng-include class="standby" src="'images/share.svg'"></ng-include>
var ActivityShareButton = /** @class */ (function () {
    function ActivityShareButton() {
        this.controller = ActivityShareButtonController;
        this.template = template;
        this.bindings = {
            activity: '<',
            type: '@',
            postShareCallback: '&',
            preShareCallback: '&'
        };
    }
    return ActivityShareButton;
}());
exports.ActivityShareButton = ActivityShareButton;
//# sourceMappingURL=ShareButton.js.map