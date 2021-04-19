export class AttendanceStatsController {
  public classId;

  public membersLength = null;
  private attendanceMgr = this.CurrentSession.getAttendanceMgr();

  /*@ngInject*/
  constructor(private CurrentSession, private UsersStore) {
  }

  getAttendingCount() {
    return this.attendanceMgr.getAttendingCount();
  }

  getMissingCount() {
    let attendingCount = this.attendanceMgr.getAttendingCount();
    return this.membersLength > attendingCount ? this.membersLength - attendingCount : 0;
  }

  $onInit() {
    this.UsersStore.query({classId: this.classId}).then((members) => this.membersLength = members.length);
  }
}

const template = `
<loader class="attendance-stats-loader" ng-show="$ctrl.membersLength === null"></loader>
<div class="attendance-stat attending" ng-if="$ctrl.membersLength !== null">
  <div class="number">{{$ctrl.getAttendingCount()}}</div>
  <div class="person">
    <div class="head"></div>
    <div class="body"></div>
  </div>
  <span>{{"joined" | translate}}</span>
</div>

`;

// <div class="attendance-stat not-attending" ng-if="$ctrl.membersLength !== null">
//   <div class="number">{{$ctrl.getMissingCount()}}</div>
//   <div class="person">
//     <div class="head"></div>
//     <div class="body"></div>
//   </div>
//   <span>{{"not_yet" | translate}}</span>
// </div>

export class AttendanceStats {
  template = template;
  controller = AttendanceStatsController;
  bindings : any = {
    classId: '<'
  };
}
