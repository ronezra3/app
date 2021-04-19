"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BackButton_1 = require("./directives/BackButton");
var Content_1 = require("./directives/Content");
var HamburgerButton_1 = require("./directives/HamburgerButton");
var NavigationBar_1 = require("./directives/NavigationBar");
var SideBar_1 = require("./directives/SideBar");
var SideBars_1 = require("./directives/SideBars");
var View_1 = require("./directives/View");
var Checkbox_1 = require("./directives/Checkbox");
var MatchMediaWrapper_1 = require("./services/MatchMediaWrapper");
var NgDialogRouter_1 = require("./services/NgDialogRouter");
var Popup_1 = require("./services/Popup");
exports.default = angular.module('Common.layout', [])
    .value('LayoutValues', {
    // iPad resolution - 1
    'miniTablet': {
        width: 747,
        height: 1003
    },
    // iPhone6Plus resolution + 1
    'phone': {
        width: 415,
        height: 737
    }
})
    .component('backButton', new BackButton_1.BackButton())
    .directive('content', Content_1.Content)
    .component('hamburgerButton', new HamburgerButton_1.HamburgerButton())
    .component('navigationBar', new NavigationBar_1.NavigationBar())
    .component('checkbox', new Checkbox_1.Checkbox())
    .directive('sideBar', SideBar_1.SideBar)
    .component('sideBars', new SideBars_1.SideBars())
    .directive('view', View_1.View)
    .provider('ngDialogRouter', NgDialogRouter_1.NgDialogRouterProvider)
    .service('MatchMediaWrapper', MatchMediaWrapper_1.MatchMediaWrapper)
    .factory('Popup', Popup_1.Popup)
    .run(function (LogOut, ngDialogRouter) { return LogOut.onLoggingOut(function () { return ngDialogRouter.closeAll(); }); })
    .name;
//# sourceMappingURL=index.js.map