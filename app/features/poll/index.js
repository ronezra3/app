"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PollPreviewController_1 = require("./controllers/PollPreviewController");
var PollAnswersChartDirective_1 = require("./directives/PollAnswersChartDirective");
var PollAnswerStatusDirective_1 = require("./directives/PollAnswerStatusDirective");
var PollOptionDirective_1 = require("./directives/PollOptionDirective");
var PreviewContent_1 = require("./directives/PreviewContent");
var PollFactory_1 = require("./services/PollFactory");
var NumberToLetterFilter_1 = require("./filters/NumberToLetterFilter");
var SubmitButton_1 = require("./directives/SubmitButton");
var ResultsContent_1 = require("./directives/ResultsContent");
exports.default = angular.module('LearniApp.poll', [])
    .value('PollValues', {
    minAnswers: 2,
    defaultAnswers: 3,
    maxAnswers: 5
})
    .controller('PollTeachPreviewController', PollPreviewController_1.PollPreviewController)
    .controller('PollEnrichPreviewController', PollPreviewController_1.PollPreviewController)
    .component('pollAnswersChart', new PollAnswersChartDirective_1.PollAnswersChart())
    .component('pollAnswerStatus', new PollAnswerStatusDirective_1.PollAnswerStatus())
    .component('pollOption', new PollOptionDirective_1.PollOption())
    .component('pollPreviewContent', new PreviewContent_1.PollPreviewContent())
    .component('pollSubmitButton', new SubmitButton_1.PollSubmitButton())
    .component('pollResultsContent', new ResultsContent_1.PollResultsContent())
    .filter('numberToLetter', NumberToLetterFilter_1.NumberToLetterFilter)
    .factory('Poll', PollFactory_1.Poll).name;
//# sourceMappingURL=index.js.map