import {AssessFormController} from './controllers/AssessFormController';
import {AssessPlayController} from './controllers/Play';
import {AssessPreviewController} from './controllers/AssessPreviewController';
import {AssessQuestionStatsController} from './controllers/AssessQuestionStatsController';
import {AssessReportController} from './controllers/AssessReportController';
import {AssessTeachResultsController} from './controllers/AssessTeachResultsController';
import {AssessAnswerSpecificFeedback} from './directives/AssessAnswerSpecificFeedbackDirective';
import {AssessStudentButton} from './directives/StudentButton';
import {AssessDashboardHeader} from './directives/AssessDashboardHeaderDirective';
import {AssessDashboardMiddle} from './directives/AssessDashboardMiddleDirective';
import {AssessEndButton} from './directives/EndButton';
import {ProgressBar} from './directives/AssessDashboardProgressBarDirective';
import {AssessDashboardStudents} from './directives/AssessDashboardStudentsDirective';
import {AssessMultiQuestionExplanation} from './directives/AssessMultiQuestionExplanationDirective';
import {AssessQuestionTitle} from './directives/AssessQuestionTitleDirective';
import {CorrectQuestionIndicator} from './directives/CorrectQuestionIndicatorDirective';
import {SearchStudent} from './filters/SearchStudentFilter';
import {Assess} from './services/AssessFactory';
import {StudentAssess} from './services/StudentAssessFactory';
import {AssessResultsFactory} from './services/AssessResults';
import {AssessAnswerButton} from './directives/AnswerButtonDirective';
import {AssessSubmitButton} from './directives/SubmitButton';
import {AssessPreviewContent} from './directives/PreviewContent';
import {AssessPublishButton} from './directives/PublishButton';
import {AssessSaveButton} from './directives/SaveButton';
import {AssessReportNavBar} from './directives/ReportNavBar';
import {AssessReportContent} from './directives/ReportContent';
import {StudentQuestion} from './directives/StudentQuestion';
import {StudentProgress} from './directives/StudentProgress';
import {StudentQuestionMock} from './directives/StudentQuestionMock';
import {AssessDashboardBottom} from './directives/assess-dashboard-bottom.component';
import {NgDialogRouterProvider} from '../../3rdparty/common/layout/services/NgDialogRouter';
import {AssessPlayIntro} from './controllers/PlayIntro';

export default angular.module('LearniApp.assess', [])
  .value('AssessValues', {
    'minAnswers': 2,
    'maxAnswers': 5,
    'defaultDurationMin': 10
  })
  .config((ngDialogRouterProvider : NgDialogRouterProvider) => {
    ngDialogRouterProvider.state('assess.play.intro', new AssessPlayIntro());
  })
  .controller('AssessFormController', AssessFormController)
  .controller('AssessPlayController', AssessPlayController)
  .controller('AssessTeachPreviewController', AssessPreviewController)
  .controller('AssessEnrichPreviewController', AssessPreviewController)
  .controller('AssessQuestionStatsController', AssessQuestionStatsController)
  .controller('AssessReportController', AssessReportController)
  .controller('AssessSessionReportController', AssessReportController)
  .controller('AssessTeachResultsController', AssessTeachResultsController)
  .component('assessAnswerSpecificFeedback', new AssessAnswerSpecificFeedback())
  .component('assessPreviewContent', new AssessPreviewContent())
  .component('assessDashboardBottom', new AssessDashboardBottom())
  .component('assessDashboardHeader', new AssessDashboardHeader())
  .component('assessEndButton', new AssessEndButton())
  .component('assessPublishButton', new AssessPublishButton())
  .component('assessSaveButton', new AssessSaveButton())
  .component('assessStudentButton', new AssessStudentButton())
  .directive('assessDashboardMiddle', AssessDashboardMiddle)
  .directive('progressBar', ProgressBar)
  .directive('assessDashboardStudents', AssessDashboardStudents)
  .component('assessMultiQuestionExplanation', new AssessMultiQuestionExplanation())
  .component('assessQuestionTitle', new AssessQuestionTitle())
  .component('correctQuestionIndicator', new CorrectQuestionIndicator())
  .component('assessAnswerButton', new AssessAnswerButton())
  .component('assessSubmitButton', new AssessSubmitButton())
  .component('assessReportNavBar', new AssessReportNavBar())
  .component('assessReportContent', new AssessReportContent())
  .component('studentQuestion', new StudentQuestion())
  .component('studentQuestionMock', new StudentQuestionMock())
  .component('studentProgress', new StudentProgress())
  .filter('searchStudent', SearchStudent)
  .factory('AssessResultsFactory', AssessResultsFactory)
  .factory('Assess', Assess)
  .factory('StudentAssess', StudentAssess).name;
