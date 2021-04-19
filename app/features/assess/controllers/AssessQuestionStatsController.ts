export class AssessQuestionStatsController {
  /*@ngInject*/
  constructor(private CurrentSession : any) {
  }

  public getAttendingCount() {
    return this.CurrentSession.getAttendanceMgr().getAttendingCount();
  }
}
