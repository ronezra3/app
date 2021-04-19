"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CheckboxCtrl = /** @class */ (function () {
    function CheckboxCtrl() {
        this.state = false;
    }
    CheckboxCtrl.prototype.valueGetterSetter = function (value) {
        if (angular.isUndefined(value)) {
            return this.state;
        }
        this.onChange({ value: value });
        this.state = value;
    };
    return CheckboxCtrl;
}());
var template = "\n<input type=\"checkbox\" ng-model=\"$ctrl.valueGetterSetter\" ng-model-options=\"{ getterSetter: true }\" name=\"{{$ctrl.name}}\" id=\"{{$ctrl.name}}\">\n<label for=\"{{$ctrl.name}}\">\n  <span class=\"fake-checkbox\"><ng-include src=\"'images/v_icon2.svg'\"></ng-include></span>\n  <ng-transclude></ng-transclude>\n</label>\n";
var Checkbox = /** @class */ (function () {
    function Checkbox() {
        this.controller = CheckboxCtrl;
        this.template = template;
        this.transclude = true;
        this.bindings = {
            onChange: '&',
            name: '@'
        };
    }
    return Checkbox;
}());
exports.Checkbox = Checkbox;
//# sourceMappingURL=Checkbox.js.map