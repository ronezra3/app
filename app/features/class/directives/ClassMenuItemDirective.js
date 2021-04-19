"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ClassMenuItem() {
    return {
        restrict: 'E',
        template: require('./../templates/class-menu-item.html'),
        replace: true,
        scope: {
            type: '@'
        }
    };
}
exports.ClassMenuItem = ClassMenuItem;
//# sourceMappingURL=ClassMenuItemDirective.js.map