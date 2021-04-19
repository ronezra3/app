import {SessionMediator} from './SessionMediator';
import {AppStatus} from '../../common/services/AppStatusFactory';
export class StudentSessionMediator extends SessionMediator {

  /*@ngInject*/
  constructor(SessionEvents, CurrentSession, ActivitiesRouter, TogetherEventsRouter, DeviceSleepDeprivation,
              CurrentUser, private AttentionEventsRouter, private AppStatus : AppStatus,
              private Together, private $rootScope, LogOut,private $state) {

    super(false, SessionEvents, CurrentSession, ActivitiesRouter, TogetherEventsRouter, DeviceSleepDeprivation, CurrentUser, LogOut);
    
  }

  sync(currentSession) {
    super.sync(currentSession);

    this.AttentionEventsRouter.sync(currentSession.inAttention);
    this.AppStatus.activate(currentSession.id);

    this.AppStatus.reportCurrentStatus();
  }

  syncWith(currentSession, previousSession) {
    super.syncWith(currentSession, previousSession);
    this.sync(currentSession);
  }

  subscribe(session) {
    super.subscribe(session);

    this.ActivitiesRouter.subscribe(session);
    this.AttentionEventsRouter.subscribe();

    this.CurrentSession.onEnd(this.leaveInternal.bind(this));
  }

  leave() {
    this.AppStatus.reportStatus('offline', 'left_session');
    this.leaveInternal();
  }

  private leaveInternal() {
    this.ActivitiesRouter.unsubscribe();
    this.AppStatus.deActivate();
    this.AttentionEventsRouter.unsubscribe();
    this.Together.cancelRequest();
    this.$rootScope.$broadcast('together-request-canceled');
    // var stepsBack = 2;
    // this.$state.back(false, stepsBack);
    // setInterval(() => {
      this.$state.go('classes', null, { replace: true });
    // }, 1000)

    // Due note that this method is disconnecting from the real-time service.
    // So if your logic depend on this connection [just like AppStatus.deActivate()],
    // please make sure that you put it before this calling.
    super.leave();
  }
}
