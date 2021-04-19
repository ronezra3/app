"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ProgressBar() {
    return {
        link: link,
        restrict: 'E',
        template: require('./../templates/AssessDashboardProgressBar.html'),
        scope: { progress: '=' }
    };
    function link(scope, element, attrs) {
        var progressForeground = element.children().children();
        updateProgressWidth();
        scope.$watch('progress', function () {
            updateProgressWidth();
        });
        function updateProgressWidth() {
            progressForeground.css({ 'width': scope.progress + '%' });
        }
    }
}
exports.ProgressBar = ProgressBar;
//# sourceMappingURL=AssessDashboardProgressBarDirective.js.map