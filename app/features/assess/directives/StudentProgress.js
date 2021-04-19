"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<ul class=\"assess-solve-progress-steps\">\n  <li ng-repeat=\"question in $ctrl.studentAssess.questions\">\n    <div ng-class=\"question.status ? 'assess-solve-progress-step-answered' : 'assess-solve-progress-step'\">\n      {{question.index}}\n      <ng-include class=\"assess-solve-progress-step-answered-icon\" ng-if=\"question.status\" src=\"'images/v_icon.svg'\"></ng-include>\n    </div>\n    <div ng-class=\"question.status ? 'assess-solve-progress-step-line-answered' : 'assess-solve-progress-step-line'\" ng-hide=\"$last\"></div>\n  </li>\n</ul>\n";
var StudentProgress = /** @class */ (function () {
    function StudentProgress() {
        this.template = template;
        this.bindings = {
            studentAssess: '<'
        };
    }
    return StudentProgress;
}());
exports.StudentProgress = StudentProgress;
//# sourceMappingURL=StudentProgress.js.map