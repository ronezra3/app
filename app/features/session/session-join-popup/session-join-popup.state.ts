import IScope = angular.IScope;
import {IStateService} from 'angular-ui-router';
import {StudentSessionService} from '../services/StudentSessionService';
import {Utilities} from '../../../3rdparty/common/services/Utilities';
import IIntervalService = angular.IIntervalService;

class SessionJoinPopupController {
  classInfo;
  teacher;
  createdAt;
  private closeThisDialog;

  /*@ngInject*/
  constructor($scope : IScope, private $state : IStateService, private StudentSessionService : StudentSessionService) {
    this.classInfo = $scope['classInfo'];
    this.teacher = $scope['teacher'];
    this.closeThisDialog = $scope['closeThisDialog'];

    this.createdAt = $scope['session'].createdAt;
  }

  join() {
    return this.$state.go('learn.books', {classId: this.classInfo.id})
      .then(() => this.StudentSessionService.join(this.classInfo.id))
      .then(() => this.closeThisDialog());
  }
}

const template = `
<div class="wrapper">
  <header>
    <h3>{{'join-session-popup-title' | translate}}</h3>
  </header>
  <article>
    <span>{{$ctrl.classInfo.subject.name | translate}} {{'with' | translate}} {{$ctrl.teacher.getFullName()}}</span>
    <div>
      <img src="images/session-join-popup/rhino.png">
      <div>
        <span class="time">
          {{'started' | translate}} <span am-time-ago="$ctrl.createdAt"></span>
        </span> 
        <nav class="activity-buttons-nav">
          <join-session-button class="primary" join="$ctrl.join()"></join-session-button> 
        </nav>
      </div>
    </div>
  </article>
</div>
`;

export class SessionJoinPopupState {
  template = template;
  controller = SessionJoinPopupController;
  controllerAs = '$ctrl';
  appendClassName = 'new session-join-popup';
  showClose = true;
}
