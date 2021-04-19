"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClassesController = /** @class */ (function () {
    /*@ngInject*/
    function ClassesController(classes, school, isTeacher, subjects) {
        this.classes = classes;
        this.school = school;
        this.isTeacher = isTeacher;
        this.subjects = subjects;
    }
    return ClassesController;
}());
var template = "\n<view class=\"gray-view flex-view classes\">\n  <navigation-bar>\n    <logo>\n      <img class=\"full\" src=\"images/logo_full.svg\"/>\n      <ng-include class=\"square\" src=\"'images/logo.svg'\"></ng-include>\n    </logo>\n\n    <nav-bar-title>\n      <span class=\"school-name\">{{$ctrl.school.name}}</span>\n    </nav-bar-title>\n\n    <right-buttons>\n      <user-thumbnail></user-thumbnail>\n    </right-buttons>\n  </navigation-bar>\n\n  <content scrollable=\"true\">\n    <div class=\"activity-header\" style=\"margin-bottom:0;margin-top: 10px; font-size:2.8rem\" ng-if=\"$ctrl.isTeacher\">\n    <h1>{{'\u05D4\u05DE\u05E4\u05D2\u05E9\u05D9\u05DD \u05E9\u05DC\u05D9'}}</h1>\n    <create-class-thumbnail ng-if=\"$ctrl.isTeacher\" subjects=\"$ctrl.subjects\"\n    style=\"margin-top: -12px;\n    margin-bottom: 12px;\"></create-class-thumbnail>\n    </div>\n    <ul class=\"wrap-panel\">\n      <li ng-repeat=\"class in $ctrl.classes\" ng-if=\"$ctrl.isTeacher\">\n        <class-thumbnail class-info=\"class\"></class-thumbnail>\n      </li>\n      <li>\n        \n        <join-class-thumbnail ng-if=\"!$ctrl.isTeacher\"></join-class-thumbnail>\n      </li>\n    </ul>\n  </content>\n</view>\n";
var Classes = /** @class */ (function () {
    function Classes() {
        this.url = '/';
        this.template = template;
        this.controller = ClassesController;
        this.controllerAs = '$ctrl';
        this.resolve = {
            /*@ngInject*/
            school: function (CurrentUser, UsersProxy) { return UsersProxy.getSchool({ id: CurrentUser.get().id }).$promise.catch(function () { }); },
            /*@ngInject*/
            classes: function (CurrentUser, ClassesStore) { return ClassesStore.query(ClassesStore.queryBuilder(CurrentUser.get())); },
            /*@ngInject*/
            isTeacher: function (CurrentUser) { return CurrentUser.get().isTeacher; },
            /*@ngInject*/
            subjects: function (isTeacher, SubjectsProxy, CurrentUser) { return isTeacher ? SubjectsProxy.query({ id: CurrentUser.get().id }).$promise.catch(function () { }) : null; }
        };
    }
    return Classes;
}());
exports.Classes = Classes;
//# sourceMappingURL=classes.js.map