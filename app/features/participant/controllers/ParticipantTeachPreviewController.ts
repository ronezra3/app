import IPromise = angular.IPromise;
import {ActivityTeachPreviewController} from '../../activities/controllers/ActivityTeachPreviewController';
export class ParticipantTeachPreviewController extends ActivityTeachPreviewController {
  /*@ngInject*/
  constructor(private lodash, private CurrentSession, activity) {
    super(activity);
  }

  protected prePublish() : IPromise<any> {
    var attending = this.CurrentSession.getAttendanceMgr().getAttending();
    this.activity.studentsScriptIds = this.lodash(attending).chain().value(); //.sample(4)
    return null;
  }
}
