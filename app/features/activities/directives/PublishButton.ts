import {ActivityEvents} from '../services/ActivityEvents';
import {Activities} from '../services/ActivitiesFactory';
import {CurrentSession} from '../../session/services/CurrentSession';

export class ActivityPublishButtonController {
  activity;
  type;
  getSpecificData;
  isValid;
  prePublish;
  nextScreen;
  postPublish;

  /*@ngInject*/
  constructor(private $state, private Activities : Activities, private ActivityEvents : ActivityEvents, protected Utilities,
              private CurrentSession : CurrentSession) {
  }

  validate() {
    if(this.isValid === undefined && this.type === 'url') {
      return 'wait-for-load'
    }
    if (!this.isValid) {
      return 'invalid-form';
    }

    // if (this.CurrentSession.getAttendanceMgr().getAttendingCount() <= 0) {
    //   return 'empty-session';
    // }

    return null;
  }

  publish() {
    let prePublishPromise = this.prePublish();
    if (this.Utilities.isqPromise(prePublishPromise)) {
      return prePublishPromise.then(this.verifiedPublish.bind(this));
    }

    return this.verifiedPublish();
  }

  private verifiedPublish() {
    let isContextual = !!this.$state.params['pageUrl'];

    return this.Activities.publish(this.type, this.$state.params.classId, this.activity, isContextual).then(() => {

      this.ActivityEvents.tagPublish(this.type, !this.activity.id, isContextual, this.getSpecificData());

      this.postPublish();

      return this.$state.go(`${this.type}-${this.nextScreen || 'teach-results'}`, {
        isPlaying: true,
        activityId: this.activity.id,
        classId: this.$state.params.classId
      }, {replace: true});
    });
  }
}

const template = `
<click-once-button on-click="$ctrl.publish()" is-valid="$ctrl.validate()">

  <span>{{('publish' + (($ctrl.activity.id || $ctrl.isDirty) ? '' : '-default')) | translate}}</span>
  <loader></loader>
</click-once-button>
`;
//   <ng-include class="pressed" src="'images/publish-pressed.svg'"></ng-include>
  // <ng-include class="standby" src="'images/publish.svg'"></ng-include>

export class ActivityPublishButton {
  controller : any = ActivityPublishButtonController;
  template = template;
  bindings : any = {
    activity: '<',
    type: '@',
    getSpecificData: '&',
    isValid: '<',
    isDirty: '<',
    prePublish: '&',
    postPublish: '&',
    nextScreen: '@?'
  };
}
