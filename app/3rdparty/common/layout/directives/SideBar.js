"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "<nav ng-transclude></nav>";
function SideBar() {
    return {
        restrict: 'E',
        transclude: true,
        template: template
    };
}
exports.SideBar = SideBar;
//# sourceMappingURL=SideBar.js.map