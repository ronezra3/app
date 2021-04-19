"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mdm_section_component_1 = require("./mdm-section.component");
var teacher_panel_component_1 = require("./teacher-panel.component");
exports.default = angular.module('LearniApp.teacher-panel', [])
    .component('teacherPanel', new teacher_panel_component_1.TeacherPanel())
    .component('mdmSection', new mdm_section_component_1.MDMSection()).name;
//# sourceMappingURL=index.js.map