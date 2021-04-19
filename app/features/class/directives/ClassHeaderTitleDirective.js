"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ClassHeaderTitle() {
    return {
        restrict: 'E',
        template: require('./../templates/class-header-title.html'),
        scope: {
            classInfo: '=',
            showDetails: '='
        }
    };
}
exports.ClassHeaderTitle = ClassHeaderTitle;
//# sourceMappingURL=ClassHeaderTitleDirective.js.map