"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<button class=\"student-button\" ng-click=\"$ctrl.openStudentStats({student: $ctrl.student})\">\n  <img class=\"thumbnail\" csp-src=\"{{$ctrl.student.getAvatarUrl()}}\"/>\n  <span class=\"name\">{{$ctrl.student.getFullName()}}</span>\n</button>\n";
var AssessStudentButton = /** @class */ (function () {
    function AssessStudentButton() {
        this.template = template;
        this.bindings = {
            student: '<',
            openStudentStats: '&'
        };
    }
    return AssessStudentButton;
}());
exports.AssessStudentButton = AssessStudentButton;
//# sourceMappingURL=StudentButton.js.map