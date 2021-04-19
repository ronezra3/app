import {ParticipantPlayController} from './controllers/ParticipantPlayController';
import {ParticipantTeachPreviewController} from './controllers/ParticipantTeachPreviewController';
import {ParticipantTeachResultsController} from './controllers/ParticipantTeachResultsController';
import {Participant} from './services/ParticipantFactory';
import {Choosen} from './services/Choosen';
import {ParticipantPreviewContent} from './components/PreviewContent';
import {ParticipantResultsContent} from './components/ResultsContent';
import {SearchingStudent} from './components/SearchingStudent';

export default angular.module('LearniApp.participant', [])
  .controller('ParticipantPlayController', ParticipantPlayController)
  .controller('ParticipantTeachPreviewController', ParticipantTeachPreviewController)
  .controller('ParticipantTeachResultsController', ParticipantTeachResultsController)
  .component('participantPreviewContent', new ParticipantPreviewContent())
  .component('participantResultsContent', new ParticipantResultsContent())
  .component('searchingStudent', new SearchingStudent())
  .service('Choosen', Choosen)
  .factory('Participant', Participant).name;

