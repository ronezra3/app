"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LearnController = /** @class */ (function () {
    /*@ngInject*/
    function LearnController(members, teacher) {
        this.members = members;
        this.teacher = teacher;
    }
    return LearnController;
}());
var template = "\n<side-bars class=\"gray-view\">\n  <side-bars-content>\n    <ui-view></ui-view>\n  </side-bars-content>\n\n  <right-side-bar>\n    <student-panel members=\"$ctrl.members\" teacher=\"$ctrl.teacher\"></student-panel>\n  </right-side-bar>\n</side-bars>\n";
var LearnState = /** @class */ (function () {
    function LearnState() {
        this.controller = LearnController;
        this.abstract = true;
        this.url = '/learn/:classId';
        this.template = template;
        this.controllerAs = '$ctrl';
        this.resolve = {
            /*@ngInject*/
            members: function ($stateParams, UsersStore) { return UsersStore.query({ classId: $stateParams['classId'] }); },
            /*@ngInject*/
            teacher: function ($stateParams, ClassesStore) {
                return ClassesStore.get($stateParams['classId']).then(function (classInfo) { return classInfo.getTeacher(); });
            }
        };
    }
    return LearnState;
}());
exports.LearnState = LearnState;
//# sourceMappingURL=learn.js.map