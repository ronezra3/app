"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function SvgIcon() {
    return {
        restrict: 'E',
        scope: {
            src: '@'
        },
        template: '<ng-include src="src"></ng-include>'
    };
}
exports.SvgIcon = SvgIcon;
//# sourceMappingURL=SvgIconDirective.js.map