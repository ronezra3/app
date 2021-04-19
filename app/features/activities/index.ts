import {ActivityResponseSubmittedController} from './controllers/ActivityResponseSubmittedController';
import {ActivityRemoveButton} from './directives/RemoveButton';
import {ActivityResetButton} from './directives/ResetButton';
import {ActivitySaveButton} from './directives/SaveButton';
import {ActivityPublishButton} from './directives/PublishButton';
import {ActivityShareButton} from './directives/ShareButton';
import {ActivityEndButton} from './directives/EndButton';
import {ActivityBackButton} from './directives/BackButton';
import {DuplicatedAnswerValidator} from './validators/DuplicatedAnswerValidator';
import {PreviewHeader} from './directives/PreviewHeader';
import {ActivityHeader} from './directives/ActivityHeader';
import {Activities} from './services/ActivitiesFactory';
import {ActivitiesRouter} from './services/ActivitiesRouter';
import {ActivityEvents} from './services/ActivityEvents';
import {ActivityResponses} from './services/ActivityResponsesFactory';
import {ActivityStates} from './States';
import {ActivityNavBar} from './directives/NavBar';
import {ActivityTeachPreviewController} from './controllers/ActivityTeachPreviewController';
import {ActivityEnrichPreviewController} from './controllers/ActivityEnrichPreviewController';
import {ActivityPlayController} from './controllers/PlayController';
import {ActivityTeachResultsFooter} from './directives/TeachResultsFooter';
import {ActivityEnrichResultsFooter} from './directives/EnrichResultsFooter';
import {ActivityEnrichPreviewFooter} from './directives/EnrichPreviewFooter';
import {ActivityTeachResultsController} from './controllers/ActivityTeachResultsController';
import {ActivityEnrichResultsController} from './controllers/ActivityEnrichResultsController';

export default angular.module('LearniApp.activities', [])
  .config(ActivityStates)
  .controller('ActivityResponseSubmittedController', ActivityResponseSubmittedController)
  .controller('ActivityPlayController', ActivityPlayController)
  .controller('ActivityTeachResultsController', ActivityTeachResultsController)
  .controller('ActivityEnrichResultsController', ActivityEnrichResultsController)
  .controller('ActivityStudentResultsController', ActivityEnrichResultsController)
  .controller('ActivityTeachPreviewController', ActivityTeachPreviewController)
  .controller('ActivityEnrichPreviewController', ActivityEnrichPreviewController)
  .component('activitySaveButton', new ActivitySaveButton())
  .component('activityPublishButton', new ActivityPublishButton())
  .component('activityShareButton', new ActivityShareButton())
  .component('activityEndButton', new ActivityEndButton())
  .component('activityRemoveButton', new ActivityRemoveButton())
  .component('activityResetButton', new ActivityResetButton())
  .component('previewHeader', new PreviewHeader())
  .component('activityHeader', new ActivityHeader())
  .component('activityTeachResultsFooter', new ActivityTeachResultsFooter())
  .component('activityEnrichResultsFooter', new ActivityEnrichResultsFooter())
  .component('activityEnrichPreviewFooter', new ActivityEnrichPreviewFooter())
  .component('activityBackButton', new ActivityBackButton())
  .component('activityNavBar', new ActivityNavBar())
  .directive('duplicatedAnswerValidator', DuplicatedAnswerValidator)
  .service('Activities', Activities)
  .service('ActivityEvents', ActivityEvents)
  .service('ActivitiesRouter', ActivitiesRouter)
  .service('ActivityResponses', ActivityResponses).name;
