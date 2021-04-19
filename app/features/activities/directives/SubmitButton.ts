import { Activities } from '../services/ActivitiesFactory';

export abstract class ActivitySubmitButtonController {
  activity;
  type;
  isValid;

  /*@ngInject*/
  constructor(private Activities: Activities, protected $state) {
  }

  validate() {
    if (this.type == 'url' && !this.isValid) {
      return 'empty-form'
    }
    return this.isValid ? null : 'invalid-form';
  }

  submit(response) {
    return this.Activities.submit(this.type, this.activity, response)
      .then(this.postSubmit.bind(this));
  }

  protected postSubmit() {
    return this.$state.go('responseSubmitted', { type: this.type }, { replace: true });
  }
}

const template = `
<click-once-button on-click="$ctrl.submit()" is-valid="$ctrl.validate()" class="activity-submit-button">
  <span>{{'submit' | translate}}</span>
  <loader></loader>
</click-once-button>
`;

export class ActivitySubmitButton {
  controller: any = ActivitySubmitButtonController;
  template = template;
  bindings: any = {
    activity: '<',
    type: '@',
    isValid: '<'
  };
}
