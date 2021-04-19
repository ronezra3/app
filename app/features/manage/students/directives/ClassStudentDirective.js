"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
var ClassStudentController = /** @class */ (function () {
    function ClassStudentController(ngDialogRouter) {
        this.ngDialogRouter = ngDialogRouter;
    }
    ClassStudentController.prototype.click = function () {
        this.ngDialogRouter.go('manage.student', {
            student: this.student,
            onStudentRemoved: this.onStudentRemoved
        });
    };
    return ClassStudentController;
}());
var template = "\n<button ng-click=\"$ctrl.click()\">\n  <span class=\"circle\">\n    <img class=\"avatar\" csp-src=\"{{$ctrl.student.getAvatarUrl()}}\">\n  </span>\n  <span class=\"name\">{{$ctrl.student.getFullName()}}</span>\n</button>\n";
var ClassStudent = /** @class */ (function () {
    function ClassStudent() {
        this.controller = ClassStudentController;
        this.template = template;
        this.bindings = {
            student: '<',
            onStudentRemoved: '&'
        };
    }
    return ClassStudent;
}());
exports.ClassStudent = ClassStudent;
//# sourceMappingURL=ClassStudentDirective.js.map