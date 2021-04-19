"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ManageStudentsController = /** @class */ (function () {
    /*@ngInject*/
    function ManageStudentsController(UsersStore, $state, lodash, ClassesStore) {
        var _this = this;
        this.lodash = lodash;
        UsersStore.query({ classId: $state.params['classId'] }).then(function (members) { return _this.members = members; });
        ClassesStore.get($state.params['classId']).then(function (classInfo) { return _this.classInfo = classInfo; });
    }
    ManageStudentsController.prototype.onStudentRemoved = function (student) {
        this.lodash.remove(this.members, student);
    };
    return ManageStudentsController;
}());
var template = "\n<view>\n  <content class=\"manage-students-view\" scrollable=\"true\">\n    <loader class=\"manage-section-loader\" ng-hide=\"$ctrl.members\"></loader>\n\n    <div ng-if=\"$ctrl.members.length === 0\" class=\"empty-mode\">\n      <h2>{{ \"manage_students_empty_mode_title\" | translate }}</h2>\n      <p>{{ \"manage_students_empty_mode_desc\" | translate: {code: $ctrl.classInfo.code.toUpperCase()} }}</p>\n    </div>\n\n    <p class=\"manage-class-students\" ng-show=\"$ctrl.members.length > 0\">\n    {{'class_students' | translate}} ({{$ctrl.members.length}})</p>\n    <section class=\"manage-class-students-section\" ng-show=\"$ctrl.members.length > 0\">\n      <class-student ng-repeat=\"student in $ctrl.members\" student=\"student\"\n                     on-student-removed=\"$ctrl.onStudentRemoved(student)\"></class-student>\n    </section>\n  </content>\n</view>\n";
var ManageStudentsState = /** @class */ (function () {
    function ManageStudentsState() {
        this.url = '/students';
        this.controller = ManageStudentsController;
        this.controllerAs = '$ctrl';
        this.bindToController = true;
        this.template = template;
    }
    return ManageStudentsState;
}());
exports.ManageStudentsState = ManageStudentsState;
//# sourceMappingURL=ManageStudents.js.map