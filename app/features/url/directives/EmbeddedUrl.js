"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UrlResultsContentController = /** @class */ (function () {
    function UrlResultsContentController() {
        this.count = 0;
    }
    UrlResultsContentController.prototype.next = function () {
        this.count++;
    };
    UrlResultsContentController.prototype.prev = function () {
        this.count--;
    };
    UrlResultsContentController.prototype.canNext = function () {
        return this.count < this.preview.urls.length - 1;
    };
    UrlResultsContentController.prototype.canPrev = function () {
        return this.count > 0;
    };
    return UrlResultsContentController;
}());
exports.UrlResultsContentController = UrlResultsContentController;
var template = "\n    <button class=\"url-prev\" ng-click=\"$ctrl.prev()\" ng-class=\"{'hidden' : !$ctrl.canPrev()}\">\n      <ng-include src=\"'images/reader/flip_page_icon.svg'\"></ng-include>\n    </button>\n    <button class=\"url-next\" ng-click=\"$ctrl.next()\" ng-class=\"{'hidden' : !$ctrl.canNext()}\">\n      <ng-include src=\"'images/reader/flip_page_icon.svg'\"></ng-include>\n    </button>\n    <div ng-switch=\"$ctrl.preview.urls[$ctrl.count].preview.type\" ng-if=\"$ctrl.preview.urls[$ctrl.count].preview\">\n      <embedded-browser ng-switch-default preview=\"$ctrl.preview.urls[$ctrl.count]\"></embedded-browser>\n      <embedded-video ng-switch-when=\"video\" preview=\"$ctrl.preview.urls[$ctrl.count].preview\"></embedded-video>\n      <embedded-photo ng-switch-when=\"photo\" preview=\"$ctrl.preview.urls[$ctrl.count].preview\"></embedded-photo>\n    </div>\n    <div ng-if=\"$ctrl.preview.urls[$ctrl.count].activity\">\n    {{$ctrl.preview.urls[$ctrl.count].activity.header}}\n    </div>\n\n";
var EmbeddedUrl = /** @class */ (function () {
    function EmbeddedUrl() {
        this.controller = UrlResultsContentController;
        this.template = template;
        this.bindings = {
            preview: '<'
        };
    }
    return EmbeddedUrl;
}());
exports.EmbeddedUrl = EmbeddedUrl;
//# sourceMappingURL=EmbeddedUrl.js.map