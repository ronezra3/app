"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ManageRemoveStudentController = /** @class */ (function () {
    /*@ngInject*/
    function ManageRemoveStudentController($scope, ngDialogRouter, $stateParams, UsersStore, Localytics) {
        this.ngDialogRouter = ngDialogRouter;
        this.$stateParams = $stateParams;
        this.UsersStore = UsersStore;
        this.Localytics = Localytics;
        this.student = $scope['student'];
        this.onStudentRemoved = $scope['onStudentRemoved'];
    }
    ManageRemoveStudentController.prototype.close = function () {
        this.ngDialogRouter.close('manage.student.remove');
    };
    ManageRemoveStudentController.prototype.remove = function () {
        var _this = this;
        return this.UsersStore.removeFromClass(this.student, this.$stateParams['classId'])
            .then(function () {
            _this.Localytics.tagEvent('Student Removed');
            _this.close();
            _this.onStudentRemoved({ student: _this.student });
        });
    };
    return ManageRemoveStudentController;
}());
var template = "\n<manage-student-avatar avatar=\"{{$ctrl.student.getAvatarUrl()}}\" icon=\"{{'images/manage/x_icon.svg'}}\"></manage-student-avatar>\n\n<div class=\"manage-remove-student-text\">\n  <span>{{'are_you_sure_delete_student' | translate}}</span>\n  <span class=\"manage-remove-student-name\">{{$ctrl.student.userName}}?</span>\n</div>\n\n<footer class=\"manage-remove-student-footer\">\n  <button class=\"secondary action-button\" ng-click=\"$ctrl.close()\">{{'close' | translate}}\n  </button>\n  <click-once-button class=\"primary action-button\" on-click=\"$ctrl.remove()\">\n    <span>{{'remove' | translate}}</span>\n    <loader></loader>\n  </click-once-button>\n</footer>\n";
var ManageRemoveStudentState = /** @class */ (function () {
    function ManageRemoveStudentState() {
        this.template = template;
        this.controller = ManageRemoveStudentController;
        this.controllerAs = '$ctrl';
    }
    return ManageRemoveStudentState;
}());
exports.ManageRemoveStudentState = ManageRemoveStudentState;
//# sourceMappingURL=ManageRemoveStudent.js.map