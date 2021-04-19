import { IStateParamsService } from 'angular-ui-router';
import { AttendanceManager } from './AttendanceManager';
import { CurrentSession } from '../session/services/CurrentSession';

class AttendanceController {
  classId = this.$stateParams['classId'];
  attendingCount;
  sessionId;
  private attendanceManager: AttendanceManager;

  /*@ngInject*/
  constructor(CurrentSession: CurrentSession, private $stateParams: IStateParamsService) {
    this.attendanceManager = CurrentSession.getAttendanceMgr();
    this.sessionId = CurrentSession.getInfo().id;
  }

  $onInit() {
    this.attendanceManager.onAttendingMembersChanged(() => this.updateAttendingCount());
    this.updateAttendingCount();
  }

  private updateAttendingCount() {
    this.attendingCount = this.attendanceManager.getAttendingCount() || 0;
  }
  getAttendingCount() {
    return this.attendanceManager.getAttendingCount();
  }
}

const template = `
<button class="panel-button"
  ui-sref="attendance({classId: $ctrl.classId, sessionId: $ctrl.sessionId})" ng-click="">
  <div class="number-icon">{{$ctrl.getAttendingCount()}}</div>
  <span class="text">{{'attending' | translate}}</span>
</button>
`;

export class AttendanceButton {
  template = template;
  controller = AttendanceController;
}
