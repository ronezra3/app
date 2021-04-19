"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultHtmlContent_1 = require("./DefaultHtmlContent");
var MsHtmlContentController = /** @class */ (function (_super) {
    __extends(MsHtmlContentController, _super);
    function MsHtmlContentController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MsHtmlContentController.prototype.$onInit = function () {
        var _this = this;
        var webview = this.$element.children()[0];
        var lastSrc = null;
        webview.addEventListener('MSWebViewContentLoading', function (e) {
            if (lastSrc !== null && e.uri !== '') {
                _this.$scope.$applyAsync(function () {
                    return _this.pageChange(e.uri);
                });
            }
            lastSrc = e.uri;
        });
    };
    return MsHtmlContentController;
}(DefaultHtmlContent_1.HtmlContentController));
exports.MsHtmlContentController = MsHtmlContentController;
var MsHtmlContent = /** @class */ (function (_super) {
    __extends(MsHtmlContent, _super);
    function MsHtmlContent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.template = "<x-ms-webview destroy-win-webview ng-src={{$ctrl.getSceUrl()}}></x-ms-webview>";
        _this.controller = MsHtmlContentController;
        return _this;
    }
    return MsHtmlContent;
}(DefaultHtmlContent_1.DefaultHtmlContent));
exports.MsHtmlContent = MsHtmlContent;
//# sourceMappingURL=MsHtmlContent.js.map