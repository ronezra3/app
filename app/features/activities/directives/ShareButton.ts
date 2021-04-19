import {Activities} from '../services/ActivitiesFactory';
class ActivityShareButtonController {
  activity;
  type;
  postShareCallback;
  preShareCallback;

  /*@ngInject*/
  constructor(private Activities : Activities) {
  }

  share() {
    this.preShareCallback();

    this.Activities.unSubscribe(this.type, 'submit');
    return this.Activities.share(this.type, this.activity).then(this.postShareCallback);
  }
}

const template = `
<click-once-button on-click="$ctrl.share()">

  <span>{{'share' | translate}}</span>
  <loader></loader>
</click-once-button>
`;
// <ng-include class="pressed" src="'images/share-pressed.svg'"></ng-include>
// <ng-include class="standby" src="'images/share.svg'"></ng-include>

export class ActivityShareButton {
  controller = ActivityShareButtonController;
  template = template;
  bindings : any = {
    activity: '<',
    type: '@',
    postShareCallback: '&',
    preShareCallback: '&'
  };
}
