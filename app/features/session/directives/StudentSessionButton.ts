import IComponentOptions = angular.IComponentOptions;
import { CurrentSession } from '../services/CurrentSession';
import { StudentSessionService } from '../services/StudentSessionService';
import { IStateParamsService } from 'angular-ui-router';
import {IStateServiceExtended} from '../../../3rdparty/common/decorators/StateDecorator';

class StudentSessionButton {

  /*@ngInject*/
  constructor(private StudentSessionService: StudentSessionService, private CurrentSession: CurrentSession,
    private $stateParams: IStateParamsService, private $state: IStateServiceExtended) {
  }

  public isInSession() {
    return this.CurrentSession.isActive();
  }

  public leave() {

    return this.StudentSessionService.leave();

  }

  public join() {
    return this.StudentSessionService.join(this.$stateParams['classId']);
  }
}

export class StudentSessionButtonComponent implements IComponentOptions {
  public controller: typeof StudentSessionButton = StudentSessionButton;
  public template: string = require('./../templates/student-session-button.html');
}
