"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<div class=\"assess-dashboard-title\">\n  <div class=\"timer\" ng-class=\"{'timed-out': timedOut}\">\n    <ng-include class=\"assess-dashboard-timer-icon\" src=\"'images/timer_icon.svg'\"></ng-include>\n    <span>{{timeLeft}}</span>\n  </div>\n  <h1>{{assess.title || ('default-assess-title' | translate)}}</h1>\n</div>\n\n<div class=\"assess-dashboard-grade-and-progress-container\">\n  <div class=\"assess-dashboard-grade-container\">\n    <div class=\"assess-dashboard-sub-header\">{{'average-grade' | translate}}</div>\n    <div class=\"assess-dashboard-grade-box\">\n      <div class=\"assess-dashboard-grade-text\">{{averageGrade}}%</div>\n    </div>\n  </div>\n\n  <div class=\"assess-dashboard-progress-container\">\n    <div class=\"assess-dashboard-sub-header\">{{'average-completion' | translate}}</div>\n    <div class=\"assess-dashboard-progress-box\">\n      <div class=\"assess-dashboard-progress-percentage\">{{averageProgress}}%</div>\n      <progress-bar class=\"assess-dashboard-progress\" progress=\"averageProgress\"></progress-bar>\n    </div>\n  </div>\n</div>\n";
function AssessDashboardMiddle() {
    return {
        restrict: 'E',
        template: template,
        scope: {
            assess: '=',
            timeLeft: '=',
            averageGrade: '=',
            averageProgress: '=',
            timedOut: '='
        }
    };
}
exports.AssessDashboardMiddle = AssessDashboardMiddle;
//# sourceMappingURL=AssessDashboardMiddleDirective.js.map