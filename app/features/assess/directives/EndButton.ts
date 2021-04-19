import {ActivityEndButtonController} from '../../activities/directives/EndButton';
class AssessEndButtonController extends ActivityEndButtonController {
  type = 'assess';
  stillWorkingCount;

  /*@ngInject*/
  constructor(Activities, $state, private ngDialogRouter, private $q) {
    super(Activities, $state);
  }

  endAndBack() {
    if (!this.stillWorkingCount) {
      return super.endAndBack();
    }

    let deferred = this.$q.defer();
    this.ngDialogRouter.go('are-you-sure', {
        message: 'confirm-end-assess',
        secondMessage: 'assess-still-working',
        yes: () => super.endAndBack().then(deferred.resolve),
        no: deferred.reject,
        translationData: {studentCount: this.stillWorkingCount}
      },
      false,
      {appendClassName: 'assess'});

    return deferred.promise;
  }
}

const template = `
<click-once-button class="header-button" on-click="$ctrl.endAndBack()">
  <loader></loader>
  <ng-include class="header-icon" src="'images/assess/stop_icon.png'"></ng-include>
  <span class="header-text">{{'end' | translate}}</span>
</click-once-button>
`;

//   <ng-include class="header-icon" src="'images/stop.svg'"></ng-include>


export class AssessEndButton {
  controller = AssessEndButtonController;
  template = template;
  bindings : any = {
    activity: '<',
    stillWorkingCount: '<'
  };
}
