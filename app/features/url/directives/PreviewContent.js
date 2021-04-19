"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UrlPreviewContentController = /** @class */ (function () {
    function UrlPreviewContentController() {
    }
    UrlPreviewContentController.prototype.setPreview = function (data) {
        this.activity.preview = data;
    };
    return UrlPreviewContentController;
}());
exports.UrlPreviewContentController = UrlPreviewContentController;
var template = "\n<preview-header type=\"url\" field-name=\"url\" activity=\"$ctrl.activity\" form=\"$ctrl.form\">\n  <preview-header-input>\n  \n    <input name=\"url\" class=\"activity-input-long direction-ltr\" type=\"url\" ng-model=\"$ctrl.activity.actualUrl\" ng-required=\"$ctrl.isRequired\"\n      ng-class=\"{'url-input-square-bottom': $ctrl.activity.preview}\" autocomplete=\"off\" style=\"text-align:left;\"\n      placeholder=\"{{$ctrl.isRequired ? ('url-placeholder' | translate) : $ctrl.defaultUrl}}\"\n        http-prefix inaccessible-url inaccessible-url-on-success=\"$ctrl.setPreview(data)\" inaccessible-url-on-error=\"$ctrl.setPreview(data)\"/>\n      <!-- <loader ng-show=\"$ctrl.form.url.$pending.inaccessibleUrl\"></loader> -->\n    <!-- <url-preview preview=\"$ctrl.activity.preview\" ng-show=\"$ctrl.activity.preview\"></url-preview> -->\n  </preview-header-input>\n  <preview-header-additional-validators>\n    <span class=\"validation-message-error\" ng-show=\"$ctrl.form.url.$error.url\">{{'invalid_url' | translate}}</span>\n    <span class=\"validation-message-error\" ng-show=\"$ctrl.form.url.$error.inaccessibleUrl\">{{'url_error_404' | translate}}</span>\n  </preview-header-additional-validators>\n</preview-header>\n";
var UrlPreviewContent = /** @class */ (function () {
    function UrlPreviewContent() {
        this.controller = UrlPreviewContentController;
        this.template = template;
        this.bindings = {
            activity: '<',
            isRequired: '<',
            form: '<',
            defaultUrl: '<?'
        };
    }
    return UrlPreviewContent;
}());
exports.UrlPreviewContent = UrlPreviewContent;
//# sourceMappingURL=PreviewContent.js.map