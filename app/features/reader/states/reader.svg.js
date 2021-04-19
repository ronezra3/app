"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resolver_1 = require("../../reader/services/Resolver");
var ReaderController_1 = require("../controllers/ReaderController");
var SvgReaderController = /** @class */ (function (_super) {
    __extends(SvgReaderController, _super);
    function SvgReaderController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SvgReaderController.prototype.canNext = function () {
        return this.pageUrl < this.bookInfo.numberOfPages && !this.isControlled();
    };
    SvgReaderController.prototype.next = function () {
        this.setPageUrl(this.pageUrl + 1);
    };
    SvgReaderController.prototype.canPrev = function () {
        return this.pageUrl > 1 && !this.isControlled();
    };
    SvgReaderController.prototype.prev = function () {
        this.setPageUrl(this.pageUrl - 1);
    };
    SvgReaderController.prototype.getDefaultPageUrl = function () {
        return 1;
    };
    SvgReaderController.prototype.setPageUrl = function (pageUrl) {
        _super.prototype.setPageUrl.call(this, parseInt(pageUrl));
    };
    SvgReaderController.prototype.comparePages = function (v1, v2) {
        return parseInt(v1.value) > parseInt(v2.value) ? 1 : -1;
    };
    return SvgReaderController;
}(ReaderController_1.ReaderController));
var template = "\n<view class=\"reader svg flex-view\" hardware-back-button-enabled=\"!$ctrl.isControlled()\">\n  <navigation-bar>\n    <left-buttons>\n      <back-button></back-button>\n    </left-buttons>\n\n    <nav-bar-title>\n      <div class=\"title\">{{$ctrl.bookInfo.title}}</div>\n      <goto-page number-of-pages=\"$ctrl.bookInfo.numberOfPages\" set-page=\"$ctrl.setPageUrl(page)\"\n                  page-number=\"$ctrl.pageUrl\" is-disabled=\"$ctrl.isControlled()\"></goto-page>\n    </nav-bar-title>\n\n    <right-buttons>\n      <hamburger-button></hamburger-button>\n    </right-buttons>\n  </navigation-bar>\n\n  <reader-drawer ng-show=\"$ctrl.isTeacher\" mode=\"{{$ctrl.mode}}\" compare-pages=\"$ctrl.comparePages\"></reader-drawer>\n\n  <content class=\"from-top\" scrollable=\"true\">\n    <svg-object page-url=\"$ctrl.pageUrl\" book-info=\"$ctrl.bookInfo\"></svg-object>\n  </content>\n\n  <footer>\n    <button class=\"prev\" ng-click=\"$ctrl.prev()\" ng-show=\"$ctrl.canPrev()\">\n      <ng-include src=\"'images/reader/flip_page_icon.svg'\"></ng-include>\n    </button>\n    <button class=\"next\" ng-click=\"$ctrl.next()\" ng-show=\"$ctrl.canNext()\">\n      <ng-include src=\"'images/reader/flip_page_icon.svg'\"></ng-include>\n    </button>\n  </footer>\n</view>\n";
var SvgReaderState = /** @class */ (function () {
    function SvgReaderState() {
        this.controller = SvgReaderController;
        this.controllerAs = '$ctrl';
        this.resolve = new Resolver_1.ReaderResolver().get();
        this.url = '/svg';
        this.template = template;
    }
    return SvgReaderState;
}());
exports.SvgReaderState = SvgReaderState;
//# sourceMappingURL=reader.svg.js.map