"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StudentTogetherController = /** @class */ (function () {
    /*@ngInject*/
    function StudentTogetherController(Together, CurrentUser, Popup, CurrentSession, TogetherEventsRouter, Localytics) {
        this.Together = Together;
        this.CurrentUser = CurrentUser;
        this.CurrentSession = CurrentSession;
        this.TogetherEventsRouter = TogetherEventsRouter;
        this.Localytics = Localytics;
        this.inControl = this.Together.inControl;
        this.togetherEnabled = this.Together.isInTogether;
        this.popup = new Popup({ template: require('./../../together/templates/requested-popup.html') });
    }
    StudentTogetherController.prototype.$onInit = function () {
        this.TogetherEventsRouter.onRequestCanceled(this.popup.close.bind(this.popup));
        this.TogetherEventsRouter.onGranted(this.popup.close.bind(this.popup));
        this.CurrentSession.onEnding(this.popup.close.bind(this.popup));
    };
    StudentTogetherController.prototype.$onDestroy = function () {
        this.popup.close();
    };
    StudentTogetherController.prototype.getController = function () {
        if (!this.Together.isInTogether()) {
            return;
        }
        if (this.Together.inControl()) {
            return 'me';
        }
        var classMembers = this.members.concat([this.teacher]);
        var controller = this.Together.getController(classMembers);
        if (controller) {
            return controller.getFullName();
        }
    };
    StudentTogetherController.prototype.togetherRequested = function () {
        var session = this.CurrentSession.getInfo();
        return session.together.requestingUserId === this.CurrentUser.get().id;
    };
    StudentTogetherController.prototype.toggle = function () {
        if (this.togetherRequested()) {
            this.Localytics.tagEvent('Student Cancelled Together Request');
            this.popup.close();
            this.Together.cancelRequest();
        }
        else if (this.Together.inControl()) {
            this.Localytics.tagEvent('Student Deactivated Together');
            this.Together.deactivate();
        }
        else {
            this.Localytics.tagEvent('Student Requested Together');
            this.popup.open();
            this.Together.request();
        }
    };
    return StudentTogetherController;
}());
var template = "\n<button ng-disabled=\"true\" ng-click=\"$ctrl.toggle()\"\n  class=\"panel-button {{$ctrl.togetherEnabled() ? 'selected' : ''}}\">\n  <ng-include src=\"'images/panel/icons/together.svg'\"></ng-include>\n  <div class=\"text\">{{ ($ctrl.togetherEnabled() ? $ctrl.getController() : 'together') | translate}}</div>\n</button>\n";
var StudentTogetherButton = /** @class */ (function () {
    function StudentTogetherButton() {
        this.template = template;
        this.controller = StudentTogetherController;
        this.bindings = {
            members: '<',
            teacher: '<'
        };
    }
    return StudentTogetherButton;
}());
exports.StudentTogetherButton = StudentTogetherButton;
//# sourceMappingURL=StudentTogetherButton.js.map