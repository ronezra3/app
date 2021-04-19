"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SideBarsController = /** @class */ (function () {
    /*@ngInject*/
    function SideBarsController(MatchMediaWrapper, $rootScope) {
        var _this = this;
        this.MatchMediaWrapper = MatchMediaWrapper;
        this.$rootScope = $rootScope;
        this.isRightSideBarVisible = !MatchMediaWrapper.isMiniTabletOrSmaller() && MatchMediaWrapper.isLandscape();
        MatchMediaWrapper.onPortrait(function (isPortrait) {
            if (!MatchMediaWrapper.isMiniTabletOrSmaller()) {
                _this.isRightSideBarVisible = !isPortrait;
                _this.$rootScope.$broadcast('rightSidebarStateChanged', _this.isRightSideBarVisible);
            }
        });
        MatchMediaWrapper.onMiniTablet(function () { return _this.close(); });
        $rootScope.$on('toggleRightSidebar', function () { return _this.toggleRightSidebar(); });
    }
    SideBarsController.prototype.toggleRightSidebar = function () {
        this.isRightSideBarVisible = !this.isRightSideBarVisible;
        this.$rootScope.$broadcast('rightSidebarStateChanged', this.isRightSideBarVisible);
    };
    SideBarsController.prototype.close = function () {
        this.isRightSideBarVisible = false;
        this.$rootScope.$broadcast('rightSidebarStateChanged', this.isRightSideBarVisible);
    };
    return SideBarsController;
}());
var template = "\n<div class=\"side-bars\">\n  <div ng-show=\"$ctrl.isRightSideBarVisible\" class=\"sidebars-backdrop fade-animation ng-hide\" ng-click=\"$ctrl.close()\"></div>\n  <section class=\"side-bars-content\" ng-transclude=\"content\"></section>\n  <section ng-class=\"{'closed': !$ctrl.isRightSideBarVisible}\" class=\"side-bar-container side-bar-right closed\"\n           ng-swipe-right=\"$ctrl.toggleRightSidebar()\" ng-transclude=\"rightSideBar\"></section>\n</div>\n";
var SideBars = /** @class */ (function () {
    function SideBars() {
        this.controller = SideBarsController;
        this.transclude = {
            content: 'sideBarsContent',
            rightSideBar: 'rightSideBar'
        };
        this.template = template;
    }
    return SideBars;
}());
exports.SideBars = SideBars;
//# sourceMappingURL=SideBars.js.map