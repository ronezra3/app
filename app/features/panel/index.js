"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityButton_1 = require("./common/ActivityButton");
var activities_section_component_1 = require("./common/activities-section.component");
var panel_1 = require("./common/panel");
var dependencies = ['student', 'teacher'].map(function (name) { return require("./" + name + "/index").default; });
exports.default = angular.module('LearniApp.panel', dependencies)
    .component('activityButton', new ActivityButton_1.ActivityButton())
    .component('activitiesSection', new activities_section_component_1.ActivitiesSection())
    .component('panel', new panel_1.Panel())
    .name;
//# sourceMappingURL=index.js.map