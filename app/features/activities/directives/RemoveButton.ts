import {Activities} from '../services/ActivitiesFactory';
import {IStateServiceExtended} from '../../../3rdparty/common/decorators/StateDecorator';

class ActivityRemoveButtonController {
  activity : any;
  type : string;

  /*@ngInject*/
  constructor(private Activities : Activities, private $state : IStateServiceExtended, private ngDialogRouter) {
  }

  remove() {
    this.ngDialogRouter.go('are-you-sure',
      {
        message: 'activity-remove-confirmation',
        yes: () => {
          return this.Activities.remove(this.activity)
            .then(() => this.$state.back());
        }
      },
      false,
      {appendClassName: this.type});

  }
}

const template = `
<click-once-button on-click="$ctrl.remove()">
  <span>{{'delete-activity' | translate}}</span>
  <loader></loader>
</click-once-button>`;

export class ActivityRemoveButton {
  controller = ActivityRemoveButtonController;
  template = template;
  bindings : any = {
    activity: '<',
    type: '@'
  };
}
