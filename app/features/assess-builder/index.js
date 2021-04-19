"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MultiQuestion_1 = require("./services/MultiQuestion");
var BooleanQuestion_1 = require("./services/BooleanQuestion");
var SingleQuestion_1 = require("./services/SingleQuestion");
var AssessAddQuestionButtonDirective_1 = require("./directives/AssessAddQuestionButtonDirective");
var CorrectAnswerPicker_1 = require("./directives/CorrectAnswerPicker");
var AssessAnswerOptionDirective_1 = require("./directives/AssessAnswerOptionDirective");
var AssessBooleanQuestionDirective_1 = require("./directives/AssessBooleanQuestionDirective");
var AssessClosedQuestionDirective_1 = require("./directives/AssessClosedQuestionDirective");
var AssessQuestionInputDirective_1 = require("./directives/AssessQuestionInputDirective");
var AssessSettingsCheckboxDirective_1 = require("./directives/AssessSettingsCheckboxDirective");
var AssessTimePickerDirective_1 = require("./directives/AssessTimePickerDirective");
exports.default = angular.module('LearniApp.assess-builder', [])
    .service('MultiQuestion', MultiQuestion_1.MultiQuestionFactory)
    .factory('BooleanQuestion', BooleanQuestion_1.BooleanQuestionFactory)
    .factory('SingleQuestion', SingleQuestion_1.SingleQuestionFactory)
    .component('addQuestionButton', new AssessAddQuestionButtonDirective_1.AddQuestionButton())
    .component('correctAnswerPicker', new CorrectAnswerPicker_1.CorrectAnswerPicker())
    .component('assessAnswer', new AssessAnswerOptionDirective_1.AssessAnswer())
    .component('assessBooleanQuestion', new AssessBooleanQuestionDirective_1.AssessBooleanQuestion())
    .component('assessClosedQuestion', new AssessClosedQuestionDirective_1.AssessClosedQuestion())
    .component('assessQuestionInput', new AssessQuestionInputDirective_1.AssessQuestionInput())
    .component('assessSettingsCheckbox', new AssessSettingsCheckboxDirective_1.AssessSettingsCheckbox())
    .component('assessTimePicker', new AssessTimePickerDirective_1.AssessTimePicker()).name;
//# sourceMappingURL=index.js.map