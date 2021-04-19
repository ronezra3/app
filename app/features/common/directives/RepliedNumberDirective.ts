class RepliedNumberController {
  isPlaying;
  activity;
  replied;

  /*@ngInject*/
  constructor(private CurrentSession) {
  }

  getTotalCount() {
    console.log(JSON.stringify(this.activity))
    if (this.activity.attendedCount) {
      return this.isPlaying ? this.CurrentSession.getAttendanceMgr().getAttendingCount() : this.activity.attendedCount;
    }
    else {
      return this.CurrentSession.getAttendanceMgr().getAttendingCount();
    }
  }
}

const template = `
<span class="replied-counter">{{ $ctrl.replied || 0}}/{{ $ctrl.getTotalCount() || 0}} </span>
<span class="replied-label">{{'replied' | translate}} </span>
`;

export class RepliedNumber {
  controller = RepliedNumberController;
  template = template;
  bindings: any = {
    replied: '<',
    isPlaying: '<',
    activity: '<'
  };
}
