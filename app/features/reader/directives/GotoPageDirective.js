"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GotoPageController = /** @class */ (function () {
    function GotoPageController() {
        this.isFocus = false;
        this.isNull = false;
    }
    GotoPageController.prototype.focusChange = function (boolValue, $event) {
        this.isFocus = boolValue;
        if (boolValue === true) {
            $event.target.select();
        }
    };
    GotoPageController.prototype.navigateTo = function (page) {
        if (angular.isDefined(page)) {
            this.isNull = (page === null);
            if (!this.isNull) {
                this.setPage({ page: page });
            }
        }
        if (!this.isNull || !this.isFocus) {
            return this.pageNumber;
        }
    };
    return GotoPageController;
}());
var template = "\n<label for=\"currentPage\" ng-class=\"{active : $ctrl.isFocus, enabled: !$ctrl.isDisabled()}\">\n  <input id=\"currentPage\" ng-disabled=\"$ctrl.isDisabled()\" type=\"number\" min=\"1\"\n         max=\"{{$ctrl.numberOfPages}}\" ng-model=\"$ctrl.navigateTo\" ng-model-options=\"{ getterSetter: true }\"\n         ng-class=\"{'input-active' : $ctrl.isFocus}\" ng-focus=\"$ctrl.focusChange(true, $event)\"\n         ng-blur=\"$ctrl.focusChange(false, $event)\"/>\n  <span>{{$ctrl.numberOfPages}}</span>\n</label>\n";
var GotoPage = /** @class */ (function () {
    function GotoPage() {
        this.template = template;
        this.controller = GotoPageController;
        this.bindings = {
            pageNumber: '<',
            isDisabled: '&',
            numberOfPages: '<',
            setPage: '&'
        };
    }
    return GotoPage;
}());
exports.GotoPage = GotoPage;
//# sourceMappingURL=GotoPageDirective.js.map