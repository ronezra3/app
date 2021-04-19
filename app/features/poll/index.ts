import {PollPreviewController} from './controllers/PollPreviewController';
import {PollAnswersChart} from './directives/PollAnswersChartDirective';
import {PollAnswerStatus} from './directives/PollAnswerStatusDirective';
import {PollOption} from './directives/PollOptionDirective';
import {PollPreviewContent} from './directives/PreviewContent';
import {Poll} from './services/PollFactory';
import {NumberToLetterFilter} from './filters/NumberToLetterFilter';
import {PollSubmitButton} from './directives/SubmitButton';
import {PollResultsContent} from './directives/ResultsContent';

export default angular.module('LearniApp.poll', [])
  .value('PollValues', {
    minAnswers: 2,
    defaultAnswers: 3,
    maxAnswers: 5
  })
  .controller('PollTeachPreviewController', PollPreviewController)
  .controller('PollEnrichPreviewController', PollPreviewController)
  .component('pollAnswersChart', new PollAnswersChart())
  .component('pollAnswerStatus', new PollAnswerStatus())
  .component('pollOption', new PollOption())
  .component('pollPreviewContent', new PollPreviewContent())
  .component('pollSubmitButton', new PollSubmitButton())
  .component('pollResultsContent', new PollResultsContent())
  .filter('numberToLetter', NumberToLetterFilter)
  .factory('Poll', Poll).name;
