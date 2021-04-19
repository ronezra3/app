"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StudentPanelCtrl = /** @class */ (function () {
    /*@ngInject*/
    function StudentPanelCtrl(ENV) {
        this.ENV = ENV;
        this.activities = this.ENV.student.activities;
    }
    return StudentPanelCtrl;
}());
var template = "\n<panel>\n  <panel-header>\n    <student-session-button></student-session-button>\n  </panel-header>\n  \n  <panel-content>\n    <student-together-button members=\"$ctrl.members\" teacher=\"$ctrl.teacher\"></student-together-button>\n    <!--<activities-section activities=\"$ctrl.activities\"></activities-section>-->\n  </panel-content>\n</panel>\n";
var StudentPanel = /** @class */ (function () {
    function StudentPanel() {
        this.controller = StudentPanelCtrl;
        this.template = template;
        this.bindings = {
            members: '<',
            teacher: '<'
        };
    }
    return StudentPanel;
}());
exports.StudentPanel = StudentPanel;
//# sourceMappingURL=student-panel.component.js.map