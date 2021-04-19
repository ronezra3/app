"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DonutChartVoteProgress_1 = require("./components/DonutChartVoteProgress");
var SubmitButton_1 = require("./components/SubmitButton");
var YesNoDonutChart_1 = require("./components/YesNoDonutChart");
var PreviewContent_1 = require("./components/PreviewContent");
var SnapshotFactory_1 = require("./services/SnapshotFactory");
var ResultsContent_1 = require("./components/ResultsContent");
exports.default = angular.module('LearniApp.snapshot', [])
    .directive('donutChartVoteProgress', DonutChartVoteProgress_1.DonutChartVoteProgress)
    .component('snapshotSubmitButton', new SubmitButton_1.SnapshotSubmitButton())
    .component('yesNoDonut', new YesNoDonutChart_1.YesNoDonut())
    .component('snapshotResultsContent', new ResultsContent_1.SnapshotResultsContent())
    .component('snapshotPreviewContent', new PreviewContent_1.SnapshotPreviewContent())
    .factory('Snapshot', SnapshotFactory_1.Snapshot).name;
//# sourceMappingURL=index.js.map