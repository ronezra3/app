import { CurrentSession } from '../../session/services/CurrentSession';

class SessionStartedController {
  private session;

  /*@ngInject*/
  constructor(private $state, public classInfo, CurrentSession: CurrentSession) {
    this.session = CurrentSession.getInfo();
  }

  next() {
    // this.$state.go('teach.books', { classId: this.classInfo.id }, { replace: true });
    this.$state.go(`teach.reader.svg`, { bookId: 2, classId: this.classInfo.id , classCode: this.classInfo.code})
  }
}

const template = `
<view class="gray-view flex-view session-started" hardware-back-button-enabled="false">
  <navigation-bar>
    <left-buttons>
      <back-button></back-button>
    </left-buttons>
    <nav-bar-title>
      <class-header-title class-info="$ctrl.classInfo" show-details="true"></class-header-title>

      <!-- <div class="extended-title">
        <ng-include class="clock" src="'images/manage/lock_icon.png'"></ng-include>
        
      </div> -->
    </nav-bar-title>
  </navigation-bar>
  <nav class="activity-buttons-nav narrow padded">
    <start-session-button next="$ctrl.next()" class="primary"></start-session-button>
  </nav>

  <content class="padded">
    <div>
      <h2 class="main-title">{{ 'session_started' | translate }}</h2>
      <div class="instructions">
        <span>{{'instruct_students_join' | translate}}</span>
       <!-- <span class="join-button">
          <span class="session-clock" ng-include="'images/panel/icons/session-clock.png'"></span>
          <span>{{ 'join_session' | translate }}</span>
        </span> -->
        <span>{{'instruct_students_join_button' | translate}} <span style="font-weight: bold;">{{ $ctrl.classInfo.code.toUpperCase()}}</span></span>
      </div>
      <attendance-stats class-id="$ctrl.classInfo.id"></attendance-stats>
      <button class="full-attendance" ui-sref="attendance({classId: $ctrl.classInfo.id, sessionId: $ctrl.session.id})"
              ng-click="">
        <div class="person">
          <div class="head"></div>
          <div class="body"></div>
        </div>
        <span>{{"full_attendance" | translate}}</span>
      </button>
    </div>
  </content>
</view>
`;

export class SessionStartedState {
  controller = SessionStartedController;
  controllerAs = '$ctrl';
  url = '/:classId/sessionStarted';
  template = template;
  resolve = {
    /*@ngInject*/
    classInfo: (ClassesStore, $stateParams) => ClassesStore.get($stateParams['classId'])
  };
}
