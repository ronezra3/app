"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var templae = "\n<section class=\"left-buttons\" ng-transclude=\"leftButtons\"></section>\n<section class=\"right-buttons\" ng-transclude=\"rightButtons\"></section>\n<section class=\"nav-bar-title\" ng-transclude=\"title\"></section>\n";
var NavigationBar = /** @class */ (function () {
    function NavigationBar() {
        this.transclude = {
            leftButtons: '?leftButtons',
            title: '?navBarTitle',
            rightButtons: '?rightButtons',
            logo: '?logo'
        };
        this.template = templae;
    }
    return NavigationBar;
}());
exports.NavigationBar = NavigationBar;
//# sourceMappingURL=NavigationBar.js.map