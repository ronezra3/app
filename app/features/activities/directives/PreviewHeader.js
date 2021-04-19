"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PreviewHeaderController = /** @class */ (function () {
    /*@ngInject*/
    function PreviewHeaderController(CurrentBook, $stateParams) {
        if ($stateParams['pageUrl'] && CurrentBook.info.isSvg()) {
            this.currentPage = $stateParams['pageUrl'];
        }
    }
    return PreviewHeaderController;
}());
var template = "\n<header class=\"activity-header narrow\">\n  <ng-include class=\"icon\" src=\"'images/panel/icons/' + $ctrl.type + '.svg'\"></ng-include>\n  <div class=\"input-wrapper\" ng-transclude=\"input\">\n    <input class=\"activity-input-long\" name=\"{{$ctrl.fieldName}}\" type=\"text\"\n           autocomplete=\"off\"\n           style=\"direction: RTL\"\n           ng-model=\"$ctrl.activity[$ctrl.fieldName]\"\n           ng-required=\"$ctrl.isRequired\"\n           placeholder=\"{{($ctrl.isRequired ? $ctrl.type + '-placeholder' : 'default-' + $ctrl.type + '-title') | translate}}\"/>\n  </div>\n  <div class=\"activity-additional-info\">\n    <span class=\"validation-message-error\"\n          ng-show=\"$ctrl.form[$ctrl.fieldName].$error.required &&\n          $ctrl.form[$ctrl.fieldName].$touched\">\n      {{'required-field' | translate}}\n    </span>\n    <span ng-transclude=\"additionalValidators\"></span>\n\n    <content-location current=\"{{$ctrl.currentPage}}\" class=\"preview-page-number\" ng-if=\"$ctrl.currentPage\"></content-location>\n  </div>\n</header>\n";
var PreviewHeader = /** @class */ (function () {
    function PreviewHeader() {
        this.controller = PreviewHeaderController;
        this.template = template;
        this.transclude = {
            input: '?previewHeaderInput',
            additionalValidators: '?previewHeaderAdditionalValidators'
        };
        this.bindings = {
            type: '@',
            fieldName: '@',
            activity: '<',
            form: '<',
            isRequired: '<?'
        };
    }
    return PreviewHeader;
}());
exports.PreviewHeader = PreviewHeader;
//# sourceMappingURL=PreviewHeader.js.map