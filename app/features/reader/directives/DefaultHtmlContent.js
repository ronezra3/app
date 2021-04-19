"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HtmlContentController = /** @class */ (function () {
    /*@ngInject*/
    function HtmlContentController($sce, $element, $scope) {
        this.$sce = $sce;
        this.$element = $element;
        this.$scope = $scope;
    }
    HtmlContentController.prototype.getSceUrl = function () {
        return this.$sce.trustAsResourceUrl(this.localUrlPrefix + this.pageUrl);
    };
    HtmlContentController.prototype.pageChange = function (url) {
        this.onPageChange({ pageUrl: this.getRelativeUrl(url) });
    };
    HtmlContentController.prototype.getRelativeUrl = function (absoluteUrl) {
        var searchString = "/." + this.bookInfo.id + "/";
        var idEndIndex = absoluteUrl.indexOf(searchString) + searchString.length;
        return absoluteUrl.substring(idEndIndex, absoluteUrl.length);
    };
    return HtmlContentController;
}());
exports.HtmlContentController = HtmlContentController;
var DefaultHtmlContentController = /** @class */ (function (_super) {
    __extends(DefaultHtmlContentController, _super);
    function DefaultHtmlContentController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultHtmlContentController.prototype.$onInit = function () {
        var _this = this;
        var iframe = this.$element.children();
        iframe.on('load', function () {
            return iframe[0].contentWindow.onhashchange = function (event) {
                return _this.$scope.$apply(function () {
                    return _this.pageChange(event.newURL);
                });
            };
        });
    };
    return DefaultHtmlContentController;
}(HtmlContentController));
exports.DefaultHtmlContentController = DefaultHtmlContentController;
var DefaultHtmlContent = /** @class */ (function () {
    function DefaultHtmlContent() {
        this.template = "<iframe ng-src={{$ctrl.getSceUrl()}}></iframe>";
        this.controller = DefaultHtmlContentController;
        this.bindings = {
            localUrlPrefix: '@',
            bookInfo: '<',
            pageUrl: '@',
            onPageChange: '&'
        };
    }
    return DefaultHtmlContent;
}());
exports.DefaultHtmlContent = DefaultHtmlContent;
//# sourceMappingURL=DefaultHtmlContent.js.map