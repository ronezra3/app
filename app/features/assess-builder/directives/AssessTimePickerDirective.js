"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssessTimePickerController = /** @class */ (function () {
    /*@ngInject*/
    function AssessTimePickerController(moment, AssessValues) {
        this.moment = moment;
        this.isNull = false;
        this.assessMinutes((this.assess.time / 60) || AssessValues.defaultDurationMin);
    }
    AssessTimePickerController.prototype.assessMinutes = function (minutes) {
        if (angular.isDefined(minutes)) {
            this.isNull = (minutes === null);
            this.duration = this.moment.duration({ minutes: minutes });
            this.assess.time = this.duration.asSeconds();
        }
        return this.isNull ? null : this.duration.asMinutes();
    };
    ;
    AssessTimePickerController.prototype.onFocus = function ($event) {
        $event.target.select();
    };
    return AssessTimePickerController;
}());
var AssessTimePicker = /** @class */ (function () {
    function AssessTimePicker() {
        this.controller = AssessTimePickerController;
        this.template = require('./../templates/assess-time-picker.html');
        this.bindings = {
            assess: '<'
        };
    }
    return AssessTimePicker;
}());
exports.AssessTimePicker = AssessTimePicker;
//# sourceMappingURL=AssessTimePickerDirective.js.map