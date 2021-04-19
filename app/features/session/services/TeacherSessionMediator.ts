import {SessionMediator} from './SessionMediator';
export class TeacherSessionMediator extends SessionMediator {

  /*@ngInject*/
  constructor(SessionEvents, CurrentSession, ActivitiesRouter,
              TogetherEventsRouter, DeviceSleepDeprivation, CurrentUser, private AttendanceManager, LogOut) {
    super(true, SessionEvents, CurrentSession, ActivitiesRouter, TogetherEventsRouter,
      DeviceSleepDeprivation, CurrentUser, LogOut);
  }

  subscribe(session) {
    super.subscribe(session);
    this.CurrentSession.startAttendanceMgr(new this.AttendanceManager(session.attended));
  }

  end() {
    // Due note that this method is disconnecting from the real-time service.
    // So if your logic depend on this connection [just like Session.end()],
    // please make sure that you put it before this calling.
    return this.CurrentSession.end().then(() => super.leave());
  }
}
