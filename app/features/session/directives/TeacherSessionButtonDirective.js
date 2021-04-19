"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TeacherSessionButtonController = /** @class */ (function () {
    /*@ngInject*/
    function TeacherSessionButtonController(CurrentSession, $state, TeacherSessionMediator, Localytics, ngDialogRouter) {
        this.CurrentSession = CurrentSession;
        this.$state = $state;
        this.TeacherSessionMediator = TeacherSessionMediator;
        this.Localytics = Localytics;
        this.ngDialogRouter = ngDialogRouter;
    }
    TeacherSessionButtonController.prototype.end = function () {
        this.ngDialogRouter.go('are-you-sure', {
            yes: this.forceEnd.bind(this),
            message: 'are_you_sure_end_session'
        });
    };
    TeacherSessionButtonController.prototype.forceEnd = function () {
        var _this = this;
        var attended = this.CurrentSession.getInfo().attended.length;
        return this.TeacherSessionMediator.end().then(function () {
            _this.Localytics.tagEvent('Session Ended', { attended: attended });
            var stepsBack = 2;
            // if (this.$state.includes('teach.reader')) {
            //   stepsBack++;
            // }
            _this.$state.back(false, stepsBack);
        });
    };
    return TeacherSessionButtonController;
}());
var template = "\n<button ng-click=\"$ctrl.end()\">\n  <ng-include src=\"'images/stop.svg'\"></ng-include>\n  <span>{{ 'end_session' | translate }}</span>\n</button>\n";
var TeacherSessionButton = /** @class */ (function () {
    function TeacherSessionButton() {
        this.controller = TeacherSessionButtonController;
        this.template = template;
    }
    return TeacherSessionButton;
}());
exports.TeacherSessionButton = TeacherSessionButton;
//# sourceMappingURL=TeacherSessionButtonDirective.js.map