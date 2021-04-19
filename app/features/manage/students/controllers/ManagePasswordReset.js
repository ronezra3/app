"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ManagePasswordResetController = /** @class */ (function () {
    /*@ngInject*/
    function ManagePasswordResetController($scope, ngDialogRouter, UsersProxy, Localytics) {
        this.ngDialogRouter = ngDialogRouter;
        this.UsersProxy = UsersProxy;
        this.Localytics = Localytics;
        this.student = $scope['student'];
    }
    ManagePasswordResetController.prototype.close = function () {
        this.ngDialogRouter.close('manage.password.reset');
    };
    ManagePasswordResetController.prototype.reset = function () {
        var _this = this;
        return this.UsersProxy.resetPassword(this.student).$promise
            .then(function (response) {
            _this.Localytics.tagEvent('Student Password Reset');
            _this.close();
            _this.ngDialogRouter.go('manage.password.new', {
                student: _this.student,
                newPassword: response.newPassword
            });
        });
    };
    return ManagePasswordResetController;
}());
var template = "\n<manage-student-avatar avatar=\"{{$ctrl.student.getAvatarUrl()}}\" icon=\"{{'images/manage/lock.svg'}}\"></manage-student-avatar>\n\n<div class=\"manage-reset-password-text\">\n  <span>{{'are_you_sure_reset_password' | translate}}</span>\n  <span class=\"manage-reset-password-name\">{{$ctrl.student.userName}}?</span>\n</div>\n\n<footer class=\"manage-reset-password-footer\">\n  <button class=\"secondary action-button\" ng-click=\"$ctrl.close()\">{{'close' | translate}}\n  </button>\n  <click-once-button class=\"primary action-button\" on-click=\"$ctrl.reset()\">\n    <span>{{'reset' | translate}}</span>\n    <loader></loader>\n  </click-once-button>\n</footer>\n";
var ManagePasswordResetState = /** @class */ (function () {
    function ManagePasswordResetState() {
        this.template = template;
        this.controller = ManagePasswordResetController;
        this.controllerAs = '$ctrl';
    }
    return ManagePasswordResetState;
}());
exports.ManagePasswordResetState = ManagePasswordResetState;
//# sourceMappingURL=ManagePasswordReset.js.map