import { Activities } from '../services/ActivitiesFactory';
import { IStateServiceExtended } from '../../../3rdparty/common/decorators/StateDecorator';
import { CurrentBook } from '../../books/services/CurrentBook';
import { CurrentSession } from '../../session/services/CurrentSession';
import { ActivityEndButtonController } from './EndButton';
import IQService = angular.IQService;
import { IDialogRouter } from '../../../3rdparty/common/layout/services/NgDialogRouter';

class ActivityResetButtonController extends ActivityEndButtonController {
  shouldEnd;

  /*@ngInject*/
  constructor(Activities: Activities, $state: IStateServiceExtended, private CurrentBook: CurrentBook,
    private CurrentSession: CurrentSession, private ngDialogRouter: IDialogRouter, private $q: IQService) {
    super(Activities, $state);
  }

  endAndReset() {
    let deferred = this.$q.defer();

    if (this.shouldEnd) {
      return this.end()
        .then(this.reset.bind(this)).then(deferred.resolve);
    }
    return this.reset().then(deferred.resolve);
  }

  private reset() {
    let nextScreen = `${this.type}-${this.CurrentSession.isActive() ? 'teach' : 'enrich'}-preview`;

    return this.Activities.reset(this.activity)
      .then(() => {
        return this.$state.go(nextScreen, {
          activityId: this.activity.id,
          classId: this.$state.params['classId'],
          pageUrl: this.CurrentBook.pageUrl
        }, {
            replace: true
          });
      });
  }
}

const template = `
<click-once-button on-click="$ctrl.endAndReset()">

  <span>{{'reset-activity' | translate}}</span>
  <loader></loader>
</click-once-button>`;

//   <ng-include class="pressed" src="'images/reset-pressed.svg'"></ng-include>
  // <ng-include class="standby" src="'images/reset.svg'"></ng-include>
export class ActivityResetButton {
  controller = ActivityResetButtonController;
  template = template;
  bindings: any = {
    activity: '<',
    type: '@',
    shouldEnd: '<',
    preEndCallback: '&?'
  };
}
