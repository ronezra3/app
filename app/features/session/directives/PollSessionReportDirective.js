"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<session-report-book-location ng-if=\"poll.bookInfo\" book=\"poll.bookInfo.book\"\n                              pages=\"[poll.bookInfo.pageNumber]\">\n</session-report-book-location>\n\n<section class=\"poll-session-report-title\">{{poll.question || 'default-poll-title' | translate}}</section>\n\n<replied-number class=\"poll-session-report-replied-number\" replied=\"poll.getVoters().length\"\n                activity=\"poll\"></replied-number>\n<poll-answers-chart class=\"poll-session-report-answers\" activity=\"poll\" is-playing=\"false\"></poll-answers-chart>\n";
function PollSessionReport() {
    return {
        restrict: 'E',
        scope: {
            poll: '=activity'
        },
        template: template
    };
}
exports.PollSessionReport = PollSessionReport;
//# sourceMappingURL=PollSessionReportDirective.js.map