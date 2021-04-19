import {IDialogRouter} from '../../../../3rdparty/common/layout/services/NgDialogRouter';
import IScope = angular.IScope;

class ManageNewPasswordController {
  student;
  newPassword;

  /*@ngInject*/
  constructor(private ngDialogRouter : IDialogRouter, $scope : IScope) {
    this.student = $scope['student'];
    this.newPassword = $scope['newPassword'];
  }

  close() {
    this.ngDialogRouter.close('manage.password.new');
  }
}

const template = `
<manage-student-avatar avatar="{{$ctrl.student.getAvatarUrl()}}" icon="{{'images/manage/lock.png'}}"></manage-student-avatar>

<div class="manage-student-user-name">{{$ctrl.student.userName}}</div>
<div class="manage-password-temp">{{'temp_password' | translate}}</div>
<div class="manage-password-new">{{$ctrl.newPassword}}</div>

<footer class="manage-student-password-footer">
  <button class="secondary action-button" ng-click="$ctrl.close()">{{'close' | translate}}</button>
</footer>
`;

export class ManageNewPasswordState {
  template = template;
  controller = ManageNewPasswordController;
  controllerAs = '$ctrl';
}
