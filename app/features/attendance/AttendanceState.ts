import {UsersStore} from '../users/services/UsersStore';
import {IStateParamsService} from 'angular-ui-router';
import {ClassesStore} from '../class/services/ClassesStore';
import {CurrentSession} from '../session/services/CurrentSession';

class AttendanceController {
  /*@ngInject*/
  constructor(private attendanceManager, public classInfo, public members, private lodash) {
  }

  isAttending(member) {
    return this.attendanceManager.isAttending(member.id);
  }

  getAttendingCount() {
    return this.attendanceManager.getAttendingCount();
  }

  removeMember(student) {
    this.lodash.remove(this.members, student);
  }
}

const template = `
<view class="gray-view flex-view attendance">
  <navigation-bar>
    <left-buttons>
      <back-button></back-button>
    </left-buttons>

    <nav-bar-title>
      <span>{{'attending' | translate}} {{$ctrl.getAttendingCount()}}</span>

      <div class="extended-title">
        <ng-include class="clock" src="'images/manage/lock_icon.png'"></ng-include>
        <span>{{ $ctrl.classInfo.code.toUpperCase()}}</span>
      </div>
    </nav-bar-title>
  </navigation-bar>

  <content scrollable="true">
    <div ng-if="$ctrl.members.length === 0" class="empty-mode">
      <h2>{{ "attendance_empty_mode_title" | translate }}</h2>
      <p>{{ "attendance_empty_mode_desc" | translate: {code: $ctrl.classInfo.code.toUpperCase()} }}</p>
    </div>

    <ul class="wrap-panel">
      <li ng-repeat="member in $ctrl.members"
          ng-show="$ctrl.isAttending(member)">
        <member-thumbnail member="member" on-remove="$ctrl.removeMember(student)"></member-thumbnail>
      </li>
    </ul>
  </content>
</view>
`;

export class AttendanceState {
  url = '/:classId/attendance/:sessionId';
  template = template;
  controller = AttendanceController;
  controllerAs = '$ctrl';
  resolve = {
    /*@ngInject*/
    members: (UsersStore : UsersStore, $stateParams : IStateParamsService) => UsersStore.query({classId: $stateParams['classId']}),
    /*@ngInject*/
    attendanceManager: (AttendanceFactory, CurrentSession : CurrentSession, $stateParams : IStateParamsService) =>
      CurrentSession.isActive() ? CurrentSession.getAttendanceMgr() : AttendanceFactory($stateParams['sessionId']),
    /*@ngInject*/
    classInfo: (ClassesStore : ClassesStore, $stateParams : IStateParamsService) => ClassesStore.get($stateParams['classId'])
  };
}
