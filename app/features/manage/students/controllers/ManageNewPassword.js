"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ManageNewPasswordController = /** @class */ (function () {
    /*@ngInject*/
    function ManageNewPasswordController(ngDialogRouter, $scope) {
        this.ngDialogRouter = ngDialogRouter;
        this.student = $scope['student'];
        this.newPassword = $scope['newPassword'];
    }
    ManageNewPasswordController.prototype.close = function () {
        this.ngDialogRouter.close('manage.password.new');
    };
    return ManageNewPasswordController;
}());
var template = "\n<manage-student-avatar avatar=\"{{$ctrl.student.getAvatarUrl()}}\" icon=\"{{'images/manage/lock.svg'}}\"></manage-student-avatar>\n\n<div class=\"manage-student-user-name\">{{$ctrl.student.userName}}</div>\n<div class=\"manage-password-temp\">{{'temp_password' | translate}}</div>\n<div class=\"manage-password-new\">{{$ctrl.newPassword}}</div>\n\n<footer class=\"manage-student-password-footer\">\n  <button class=\"secondary action-button\" ng-click=\"$ctrl.close()\">{{'close' | translate}}</button>\n</footer>\n";
var ManageNewPasswordState = /** @class */ (function () {
    function ManageNewPasswordState() {
        this.template = template;
        this.controller = ManageNewPasswordController;
        this.controllerAs = '$ctrl';
    }
    return ManageNewPasswordState;
}());
exports.ManageNewPasswordState = ManageNewPasswordState;
//# sourceMappingURL=ManageNewPassword.js.map