import {ActivityTeachResultsController} from '../../activities/controllers/ActivityTeachResultsController';
export class ParticipantTeachResultsController extends ActivityTeachResultsController {
  chosenId;
  /*@ngInject*/
  constructor($stateParams, activity) {
    super($stateParams, activity);
    this.disableSharing = this.isPlaying;
  }
}
