"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<session-report-book-location ng-if=\"snapshot.bookInfo\" book=\"snapshot.bookInfo.book\"\n                              pages=\"[snapshot.bookInfo.pageNumber]\">\n</session-report-book-location>\n\n<section class=\"snapshot-session-report-title\">{{snapshot.question || 'default-snapshot-title' | translate}}</section>\n\n<replied-number class=\"snapshot-session-report-replied-number\" replied=\"snapshot.getVoters().length\"\n                activity=\"snapshot\"></replied-number>\n\n<div class=\"session-report-snapshot-vote\">\n  <span class=\"snapshot-session-report-no\">{{snapshot.no.length}}</span>\n  <svg-icon class=\"snapshot-session-report-icon no\" src=\"images/snapshot/one_hand_no.svg\"></svg-icon>\n  <svg-icon class=\"snapshot-session-report-icon yes\" src=\"images/snapshot/one_hand_yes.svg\"></svg-icon>\n  <span class=\"snapshot-session-report-yes\">{{snapshot.yes.length}}</span>\n</div>\n";
function SnapshotSessionReport() {
    return {
        restrict: 'E',
        scope: {
            snapshot: '=activity'
        },
        template: template
    };
}
exports.SnapshotSessionReport = SnapshotSessionReport;
//# sourceMappingURL=SnapshotSessionReportDirective.js.map