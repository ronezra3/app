"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReaderController_1 = require("../controllers/ReaderController");
var HtmlResolver_1 = require("../services/HtmlResolver");
var HtmlReaderController = /** @class */ (function (_super) {
    __extends(HtmlReaderController, _super);
    /*@ngInject*/
    function HtmlReaderController(Together, bookInfo, $state, CurrentBook, pageUrl, LastBookPage, isTeacher, CurrentSession, TogetherEventsRouter, localUrlPrefix, DeviceUtilities) {
        var _this = _super.call(this, Together, bookInfo, $state, CurrentBook, pageUrl, LastBookPage, isTeacher, CurrentSession, TogetherEventsRouter) || this;
        _this.localUrlPrefix = localUrlPrefix;
        _this.DeviceUtilities = DeviceUtilities;
        return _this;
    }
    HtmlReaderController.prototype.isWindows = function () {
        return this.DeviceUtilities.isWindows();
    };
    HtmlReaderController.prototype.getDefaultPageUrl = function () {
        return this.bookInfo.relativeUrl;
    };
    return HtmlReaderController;
}(ReaderController_1.ReaderController));
var template = "\n<view class=\"reader html flex-view\" hardware-back-button-enabled=\"!$ctrl.isControlled()\">\n  <navigation-bar>\n    <left-buttons>\n      <back-button ng-hide=\"$ctrl.isControlled()\" on-back=\"$ctrl.leave()\"></back-button>\n    </left-buttons>\n\n    <nav-bar-title>\n      <div class=\"title\">{{$ctrl.bookInfo.title}}</div>\n    </nav-bar-title>\n\n    <right-buttons>\n      <hamburger-button></hamburger-button>\n    </right-buttons>\n  </navigation-bar>\n\n  <reader-drawer ng-show=\"$ctrl.isTeacher\" mode=\"{{$ctrl.mode}}\"></reader-drawer>\n\n  <content scrollable=\"true\">\n    <ms-html-content page-url=\"{{$ctrl.pageUrl}}\" ng-if=\"$ctrl.isWindows()\" local-url-prefix=\"{{$ctrl.localUrlPrefix}}\"\n      book-info=\"$ctrl.bookInfo\" on-page-change=\"$ctrl.setPageUrl(pageUrl)\"></ms-html-content>\n    <default-html-content page-url=\"{{$ctrl.pageUrl}}\" ng-if=\"!$ctrl.isWindows()\" local-url-prefix=\"{{$ctrl.localUrlPrefix}}\"\n      book-info=\"$ctrl.bookInfo\" on-page-change=\"$ctrl.setPageUrl(pageUrl)\"></default-html-content>\n  </content>\n</view>\n";
var HtmlReaderState = /** @class */ (function () {
    function HtmlReaderState() {
        this.controller = HtmlReaderController;
        this.controllerAs = '$ctrl';
        this.resolve = new HtmlResolver_1.HtmlResolver().get();
        this.url = '/html';
        this.template = template;
    }
    return HtmlReaderState;
}());
exports.HtmlReaderState = HtmlReaderState;
//# sourceMappingURL=reader.html.js.map