"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TeacherPanelCtrl = /** @class */ (function () {
    /*@ngInject*/
    function TeacherPanelCtrl(ENV) {
        this.ENV = ENV;
        this.activities = this.ENV.teacher.activities;
    }
    return TeacherPanelCtrl;
}());
var template = "\n<panel>\n  <panel-header>\n   <teacher-session-button class-info=\"classInfo\"></teacher-session-button>\n  </panel-header>\n  \n  <panel-content>\n    <mdm-section></mdm-section>\n    <activities-section activities=\"$ctrl.activities\" mode=\"teach\"></activities-section>\n  </panel-content>\n</panel>\n";
var TeacherPanel = /** @class */ (function () {
    function TeacherPanel() {
        this.controller = TeacherPanelCtrl;
        this.template = template;
    }
    return TeacherPanel;
}());
exports.TeacherPanel = TeacherPanel;
//# sourceMappingURL=teacher-panel.component.js.map