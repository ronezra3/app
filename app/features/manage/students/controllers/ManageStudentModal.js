"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ManageStudentModalController = /** @class */ (function () {
    /*@ngInject*/
    function ManageStudentModalController($scope, ngDialogRouter) {
        this.ngDialogRouter = ngDialogRouter;
        this.student = $scope['student'];
        this.onStudentRemoved = $scope['onStudentRemoved'];
    }
    ManageStudentModalController.prototype.close = function () {
        this.ngDialogRouter.close('manage.student');
    };
    ManageStudentModalController.prototype.removeStudent = function () {
        this.close();
        this.ngDialogRouter.go('manage.student.remove', {
            student: this.student,
            onStudentRemoved: this.onStudentRemoved
        });
    };
    ManageStudentModalController.prototype.resetPassword = function () {
        this.close();
        this.ngDialogRouter.go('manage.password.reset', {
            student: this.student
        });
    };
    return ManageStudentModalController;
}());
var template = "\n<manage-student-avatar avatar=\"{{$ctrl.student.getAvatarUrl()}}\"></manage-student-avatar>\n\n<div class=\"manage-student-user-name\">{{$ctrl.student.userName}}</div>\n<div class=\"manage-student-name\">{{$ctrl.student.getFullName()}}</div>\n\n<nav class=\"manage-student-footer\">\n  <button ng-click=\"$ctrl.resetPassword()\">{{'reset_password' | translate}}</button>\n  <button ng-click=\"$ctrl.removeStudent()\">{{'remove_from_class' | translate}}</button>\n  <button ng-click=\"$ctrl.close()\">{{'close' | translate}}</button>\n</nav>\n";
var ManageStudentModalState = /** @class */ (function () {
    function ManageStudentModalState() {
        this.template = template;
        this.controller = ManageStudentModalController;
        this.controllerAs = '$ctrl';
    }
    return ManageStudentModalState;
}());
exports.ManageStudentModalState = ManageStudentModalState;
//# sourceMappingURL=ManageStudentModal.js.map