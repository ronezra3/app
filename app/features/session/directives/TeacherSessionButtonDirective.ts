import {TeacherSessionMediator} from '../services/TeacherSessionMediator';
import {Localytics} from '../../common/services/Localytics';
import {CurrentSession} from '../services/CurrentSession';
class TeacherSessionButtonController {
  /*@ngInject*/
  constructor(private CurrentSession : CurrentSession, private $state, private TeacherSessionMediator : TeacherSessionMediator,
              private Localytics : Localytics, private ngDialogRouter) {
  }

  end() {
    this.ngDialogRouter.go('are-you-sure', {
        yes: this.forceEnd.bind(this),
        message: 'are_you_sure_end_session'
      });
  }

  private forceEnd() {
    var attended = this.CurrentSession.getInfo().attended.length;
    return this.TeacherSessionMediator.end().then(() => {
      this.Localytics.tagEvent('Session Ended', {attended: attended});

      // var stepsBack = 2;
      // if (this.$state.includes('teach.reader')) {
      //   stepsBack++;
      // }

      this.$state.go('classes', null, { replace: true });
    });
  }
}

const template = `
<button ng-click="$ctrl.end()">
  <span>{{ 'end_session' | translate }}</span>
  <ng-include src="'images/stop.png'"></ng-include>
</button>
`;

export class TeacherSessionButton {
  controller = TeacherSessionButtonController;
  template = template;
}
