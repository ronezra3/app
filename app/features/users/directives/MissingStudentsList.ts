import LoDashStatic = _.LoDashStatic;
import {CurrentSession} from '../../session/services/CurrentSession';
import IStateParamsService = angular.ui.IStateParamsService;

class MissingStudentsListController {
  private members : Array<any>;

  /*@ngInject*/
  constructor(private lodash : LoDashStatic, private CurrentSession : CurrentSession, private UsersStore,
              private $stateParams : IStateParamsService) {
  }

  $onInit() {
    this.UsersStore.query({classId: this.$stateParams['classId']})
      .then((members) => this.members = members);
  }

  getMember(id) {
    return this.lodash.find(this.members, {id: id});
  }

  getMissingStatus() {
    return this.CurrentSession.getAttendanceMgr().getMissing();
  }
}

const template = `
<ul class="missing-list">
  <li ng-repeat="missing in $ctrl.getMissingStatus()">
    <member-thumbnail member="$ctrl.getMember(missing.id)" is-disabled="true"></member-thumbnail>
    <span class="offline-label" ng-class="{'app-label' : missing.appName}">{{(missing.appName || 'offline') | translate}}</span>
  </li>
</ul>
`;

export class MissingStudentsList {
  controller = MissingStudentsListController;
  template = template;
  bindings : any = {
    member: '<',
    onRemove: '&'
  };
}
