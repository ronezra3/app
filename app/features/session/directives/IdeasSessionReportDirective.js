"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<session-report-book-location ng-if=\"idea.bookInfo\" book=\"idea.bookInfo.book\"\n                              pages=\"[idea.bookInfo.pageNumber]\">\n</session-report-book-location>\n\n<section class=\"ideas-session-report-title\">{{idea.title || 'default-ideas-title' | translate}}</section>\n\n<replied-number class=\"ideas-session-report-replied-number\" replied=\"idea.associations.length\"\n                activity=\"idea\"></replied-number>\n\n<most-popular-words class=\"ideas-most-popular-words-background\" activity=\"idea\"\n                    is-playing=\"false\"></most-popular-words>\n\n";
function IdeasSessionReport() {
    return {
        restrict: 'E',
        scope: {
            idea: '=activity'
        },
        template: template
    };
}
exports.IdeasSessionReport = IdeasSessionReport;
//# sourceMappingURL=IdeasSessionReportDirective.js.map