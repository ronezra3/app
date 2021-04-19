"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<div class=\"assess-session-report-title\">{{assess.title || 'default-assess-title' | translate}}</div>\n<div class=\"assess-session-average-grade\">{{'average-grade' | translate}} {{getAverageGrade(assess) | percentage:0}}\n</div>\n\n<session-report-book-location class=\"assess-session-report-book-location\" ng-if=\"assess.bookInfo\"\n                              book=\"assess.bookInfo.book\" pages=\"[assess.bookInfo.pageNumber]\">\n</session-report-book-location>\n\n<button class=\"assess-session-report-toggle-button\"  ui-sref=\"assess-session-report({activityId: assess.id, classId: classId})\" ng-click=\"\">\n  <span>{{'full-report' | translate}}</span>\n</button>\n";
/*@ngInject*/
function AssessSessionReport(StudentAssess) {
    return {
        link: link,
        restrict: 'E',
        scope: {
            assess: '=activity',
            classId: '='
        },
        template: template
    };
    function link(scope, element, attrs) {
        var studentsAssessments = null;
        if (scope.assess) {
            studentsAssessments = StudentAssess.query({ ids: [scope.assess.id] });
        }
        scope.getAverageGrade = function (assess) {
            if (studentsAssessments !== null) {
                return assess.getAverageGrade(studentsAssessments);
            }
        };
    }
}
exports.AssessSessionReport = AssessSessionReport;
//# sourceMappingURL=AssessSessionReportDirective.js.map