import {Activities} from '../services/ActivitiesFactory';
export class ActivityEndButtonController {
  activity;
  type;
  preEndCallback;

  /*@ngInject*/
  constructor(protected Activities : Activities, protected $state) {
  }

  protected end() {
    if (this.preEndCallback) {
      this.preEndCallback();
    }

    this.Activities.unSubscribe(this.type, 'submit');
    return this.Activities.finish(this.type, this.activity);
  }

  endAndBack() {
    return this.end().then(() =>{ 
      this.$state.back()
      
    });
  }
}

const template = `
<click-once-button on-click="$ctrl.endAndBack()" class="ease-in">

  <span>{{'end' | translate}}</span>
  <loader></loader>
</click-once-button>
`;

// <ng-include class="standby primary-icon" src="'images/end-activity-primary.svg'"></ng-include>
// <ng-include class="pressed primary-icon" src="'images/end-activity-pressed-primary.svg'"></ng-include>
// <ng-include class="standby secondary-icon" src="'images/end-activity-secondary.svg'"></ng-include>
// <ng-include class="pressed secondary-icon" src="'images/end-activity-pressed-secondary.svg'"></ng-include>

export class ActivityEndButton {
  controller = ActivityEndButtonController;
  template = template;
  bindings : any = {
    activity: '<',
    type: '@',
    preEndCallback: '&'
  };
}
