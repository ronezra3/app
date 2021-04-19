"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n    <link-preview class=\"ng-hide slide-down-animation\" ng-show=\"$ctrl.preview.type !== 'photo'\" preview=\"$ctrl.preview\"></link-preview>\n    <embedded-photo class=\"ng-hide slide-down-animation\" ng-show=\"$ctrl.preview.type === 'photo'\" preview=\"$ctrl.preview\"></embedded-photo>\n";
var UrlPreview = /** @class */ (function () {
    function UrlPreview() {
        this.template = template;
        this.bindings = {
            preview: '<'
        };
    }
    return UrlPreview;
}());
exports.UrlPreview = UrlPreview;
//# sourceMappingURL=Preview.js.map