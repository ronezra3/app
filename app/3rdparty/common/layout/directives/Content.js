"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "<article ng-transclude class=\"content\" ng-class=\"{'scrollable': scrollable === true}\"></article>";
function Content() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            scrollable: '='
        },
        template: template
    };
}
exports.Content = Content;
//# sourceMappingURL=Content.js.map