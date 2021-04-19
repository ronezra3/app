import {CurrentSession} from '../../session/services/CurrentSession';

export class ActivityTeachResultsFooterController {
  isPlaying : boolean;
  activity;

  /*@ngInject*/
  constructor(private CurrentSession : CurrentSession) {
  }

  updateAttendance() {
    if (this.isPlaying) {
      this.activity.attendedCount = this.CurrentSession.getAttendanceMgr().getAttendingCount();
    }
  }
}

const template = `
<nav class="activity-buttons-nav padded">
  <activity-reset-button class="primary" should-end="$ctrl.isPlaying || $ctrl.disableSharing" class="secondary" pre-end-callback="$ctrl.updateAttendance()"
                         activity="$ctrl.activity" type="{{$ctrl.type}}"></activity-reset-button>
  <activity-end-button class="primary" ng-show="$ctrl.isPlaying || $ctrl.disableSharing" type="{{$ctrl.type}}" activity="$ctrl.activity"
    class="{{$ctrl.disableSharing ? 'primary' : 'secondary' }}" pre-end-callback="$ctrl.updateAttendance()"></activity-end-button>
  <activity-share-button class="primary" ng-show="!$ctrl.disableSharing" type="{{$ctrl.type}}" activity="$ctrl.activity"
    post-share-callback="$ctrl.postShareCallback()" pre-share-callback="$ctrl.updateAttendance()"></activity-share-button>
</nav>
`;

export class ActivityTeachResultsFooter {
  controller = ActivityTeachResultsFooterController;
  template = template;
  bindings : any = {
    type: '@',
    disableSharing: '<',
    activity: '<',
    isPlaying: '<',
    postShareCallback: '&',
  };
}
