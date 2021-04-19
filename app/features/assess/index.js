"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssessFormController_1 = require("./controllers/AssessFormController");
var Play_1 = require("./controllers/Play");
var AssessPreviewController_1 = require("./controllers/AssessPreviewController");
var AssessQuestionStatsController_1 = require("./controllers/AssessQuestionStatsController");
var AssessReportController_1 = require("./controllers/AssessReportController");
var AssessTeachResultsController_1 = require("./controllers/AssessTeachResultsController");
var AssessAnswerSpecificFeedbackDirective_1 = require("./directives/AssessAnswerSpecificFeedbackDirective");
var StudentButton_1 = require("./directives/StudentButton");
var AssessDashboardHeaderDirective_1 = require("./directives/AssessDashboardHeaderDirective");
var AssessDashboardMiddleDirective_1 = require("./directives/AssessDashboardMiddleDirective");
var EndButton_1 = require("./directives/EndButton");
var AssessDashboardProgressBarDirective_1 = require("./directives/AssessDashboardProgressBarDirective");
var AssessDashboardStudentsDirective_1 = require("./directives/AssessDashboardStudentsDirective");
var AssessMultiQuestionExplanationDirective_1 = require("./directives/AssessMultiQuestionExplanationDirective");
var AssessQuestionTitleDirective_1 = require("./directives/AssessQuestionTitleDirective");
var CorrectQuestionIndicatorDirective_1 = require("./directives/CorrectQuestionIndicatorDirective");
var SearchStudentFilter_1 = require("./filters/SearchStudentFilter");
var AssessFactory_1 = require("./services/AssessFactory");
var StudentAssessFactory_1 = require("./services/StudentAssessFactory");
var AssessResults_1 = require("./services/AssessResults");
var AnswerButtonDirective_1 = require("./directives/AnswerButtonDirective");
var SubmitButton_1 = require("./directives/SubmitButton");
var PreviewContent_1 = require("./directives/PreviewContent");
var PublishButton_1 = require("./directives/PublishButton");
var SaveButton_1 = require("./directives/SaveButton");
var ReportNavBar_1 = require("./directives/ReportNavBar");
var ReportContent_1 = require("./directives/ReportContent");
var StudentQuestion_1 = require("./directives/StudentQuestion");
var StudentProgress_1 = require("./directives/StudentProgress");
var StudentQuestionMock_1 = require("./directives/StudentQuestionMock");
var assess_dashboard_bottom_component_1 = require("./directives/assess-dashboard-bottom.component");
var PlayIntro_1 = require("./controllers/PlayIntro");
exports.default = angular.module('LearniApp.assess', [])
    .value('AssessValues', {
    'minAnswers': 2,
    'maxAnswers': 5,
    'defaultDurationMin': 10
})
    .config(function (ngDialogRouterProvider) {
    ngDialogRouterProvider.state('assess.play.intro', new PlayIntro_1.AssessPlayIntro());
})
    .controller('AssessFormController', AssessFormController_1.AssessFormController)
    .controller('AssessPlayController', Play_1.AssessPlayController)
    .controller('AssessTeachPreviewController', AssessPreviewController_1.AssessPreviewController)
    .controller('AssessEnrichPreviewController', AssessPreviewController_1.AssessPreviewController)
    .controller('AssessQuestionStatsController', AssessQuestionStatsController_1.AssessQuestionStatsController)
    .controller('AssessReportController', AssessReportController_1.AssessReportController)
    .controller('AssessSessionReportController', AssessReportController_1.AssessReportController)
    .controller('AssessTeachResultsController', AssessTeachResultsController_1.AssessTeachResultsController)
    .component('assessAnswerSpecificFeedback', new AssessAnswerSpecificFeedbackDirective_1.AssessAnswerSpecificFeedback())
    .component('assessPreviewContent', new PreviewContent_1.AssessPreviewContent())
    .component('assessDashboardBottom', new assess_dashboard_bottom_component_1.AssessDashboardBottom())
    .component('assessDashboardHeader', new AssessDashboardHeaderDirective_1.AssessDashboardHeader())
    .component('assessEndButton', new EndButton_1.AssessEndButton())
    .component('assessPublishButton', new PublishButton_1.AssessPublishButton())
    .component('assessSaveButton', new SaveButton_1.AssessSaveButton())
    .component('assessStudentButton', new StudentButton_1.AssessStudentButton())
    .directive('assessDashboardMiddle', AssessDashboardMiddleDirective_1.AssessDashboardMiddle)
    .directive('progressBar', AssessDashboardProgressBarDirective_1.ProgressBar)
    .directive('assessDashboardStudents', AssessDashboardStudentsDirective_1.AssessDashboardStudents)
    .component('assessMultiQuestionExplanation', new AssessMultiQuestionExplanationDirective_1.AssessMultiQuestionExplanation())
    .component('assessQuestionTitle', new AssessQuestionTitleDirective_1.AssessQuestionTitle())
    .component('correctQuestionIndicator', new CorrectQuestionIndicatorDirective_1.CorrectQuestionIndicator())
    .component('assessAnswerButton', new AnswerButtonDirective_1.AssessAnswerButton())
    .component('assessSubmitButton', new SubmitButton_1.AssessSubmitButton())
    .component('assessReportNavBar', new ReportNavBar_1.AssessReportNavBar())
    .component('assessReportContent', new ReportContent_1.AssessReportContent())
    .component('studentQuestion', new StudentQuestion_1.StudentQuestion())
    .component('studentQuestionMock', new StudentQuestionMock_1.StudentQuestionMock())
    .component('studentProgress', new StudentProgress_1.StudentProgress())
    .filter('searchStudent', SearchStudentFilter_1.SearchStudent)
    .factory('AssessResultsFactory', AssessResults_1.AssessResultsFactory)
    .factory('Assess', AssessFactory_1.Assess)
    .factory('StudentAssess', StudentAssessFactory_1.StudentAssess).name;
//# sourceMappingURL=index.js.map