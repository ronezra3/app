"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resolver_1 = require("./Resolver");
var HtmlResolver = /** @class */ (function (_super) {
    __extends(HtmlResolver, _super);
    function HtmlResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtmlResolver.prototype.get = function () {
        var resolve = _super.prototype.get.call(this);
        resolve.localUrlPrefix = this.localUrlPrefix;
        return resolve;
    };
    /*@ngInject*/
    HtmlResolver.prototype.localUrlPrefix = function (bookInfo, bookFile) {
        return bookFile.getUrl(bookInfo.relativeUrl).then(function (url) {
            return url.replace(bookInfo.relativeUrl, '');
        });
    };
    return HtmlResolver;
}(Resolver_1.ReaderResolver));
exports.HtmlResolver = HtmlResolver;
//# sourceMappingURL=HtmlResolver.js.map