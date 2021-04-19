import {TogetherEventsRouter} from '../../together/services/TogetherEventsRouter';
import {ActivitiesRouter} from '../../activities/services/ActivitiesRouter';
import {CurrentSession} from './CurrentSession';
import {SessionEvents} from '../../class/services/SessionEventsFactory';
import {CurrentUser} from '../../../3rdparty/common/services/CurrentUser';
import {LogOut} from '../../../3rdparty/common/services/LogOut';
import {ISession} from './SessionProxy';

export class SessionMediator {

  private logOutUnSubscribe;

  constructor(private isTeacher : boolean, private SessionEvents : SessionEvents, protected CurrentSession : CurrentSession,
              protected ActivitiesRouter : ActivitiesRouter, private TogetherEventsRouter : TogetherEventsRouter, private DeviceSleepDeprivation,
              private CurrentUser : CurrentUser,
              private LogOut : LogOut) {
  }

  onReconnect(classId : string) {
    let previousSession = this.CurrentSession.getInfo();
    this.CurrentSession.load(classId).then(currentSession =>
      this.syncWith(currentSession, previousSession)).catch(() => this.leave());
  }

  leave() {
    this.TogetherEventsRouter.unsubscribe();

    let session = this.CurrentSession.getInfo();
    this.CurrentSession.leave();
    this.SessionEvents.leave(session.id, this.CurrentUser.get().id);
    this.DeviceSleepDeprivation.stop();

    this.logOutUnSubscribe();
  }

  sync(currentSession : ISession) {
    this.TogetherEventsRouter.sync(currentSession);
    this.ActivitiesRouter.sync(currentSession, this.isTeacher);
  }

  subscribe(session : ISession) {
    this.DeviceSleepDeprivation.start();

    this.SessionEvents.join(session.id, this.CurrentUser.get().id, this.isTeacher, null, () => this.onReconnect(session.classId));

    this.TogetherEventsRouter.subscribe(this.isTeacher);

    this.logOutUnSubscribe = this.LogOut.onLoggingOut(() => this.leave());
  }

  protected syncWith(currentSession : ISession, previousSession : ISession) {
    this.TogetherEventsRouter.syncWith(currentSession, previousSession);
    this.ActivitiesRouter.syncWith(currentSession, previousSession, this.isTeacher);
  }
}
