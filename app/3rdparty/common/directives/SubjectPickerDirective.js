"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SubjectPickerController = /** @class */ (function () {
    /*@ngInject*/
    function SubjectPickerController(EventEmitter) {
        this.EventEmitter = EventEmitter;
    }
    SubjectPickerController.prototype.$onChanges = function (changes) {
        if (changes.subjects) {
            this.subjects = angular.copy(this.subjects);
        }
        if (changes.model) {
            this.model = angular.copy(this.model);
        }
    };
    SubjectPickerController.prototype.onChange = function () {
        this.onChangeExternal(this.EventEmitter({ subject: this.model }));
    };
    return SubjectPickerController;
}());
var template = "\n<select ng-model=\"$ctrl.model\" ng-change=\"$ctrl.onChange()\"\n  ng-options=\"subject.id as subject.name | translate for subject in $ctrl.subjects | orderBy:'name'\">\n  <option value=\"\" disabled>{{'subject' | translate}}</option>\n</select>\n<ng-include src=\"'3rdparty/common/images/arrow_down.svg'\"></ng-include>\n";
var SubjectPicker = /** @class */ (function () {
    function SubjectPicker() {
        this.controller = SubjectPickerController;
        this.template = template;
        this.bindings = {
            model: '<',
            subjects: '<',
            onChangeExternal: '&onChange'
        };
    }
    return SubjectPicker;
}());
exports.SubjectPicker = SubjectPicker;
//# sourceMappingURL=SubjectPickerDirective.js.map