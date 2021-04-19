import {ActivityEvents} from '../services/ActivityEvents';
import {Activities} from '../services/ActivitiesFactory';
export class ActivitySaveButtonController {
  activity;
  type;
  getSpecificData;
  isValid;

  /*@ngInject*/
  constructor(private $state, private Activities : Activities, private ActivityEvents : ActivityEvents) {
  }

  validate() {
    return this.isValid ? null : 'invalid-form';
  }

  save() {
    let isContextual = !!this.$state.params['pageUrl'];
    return this.Activities.save(this.type, this.activity, this.$state.params.classId, isContextual).then(() => {
      this.ActivityEvents.tagSave(this.type, !this.activity.id, isContextual , this.getSpecificData());
      return this.$state.back();
    });
  }
}

const template = `
<click-once-button on-click="$ctrl.save()" is-valid="$ctrl.validate()">
  <span>{{'save-and-close' | translate}}</span>
  <loader></loader>
</click-once-button>
`;

export class ActivitySaveButton {
  controller : any = ActivitySaveButtonController;
  template = template;
  bindings : any = {
    activity: '<',
    type: '@',
    getSpecificData: '&',
    isValid: '<'
  };
}
