import {IDialogRouter} from '../../../../3rdparty/common/layout/services/NgDialogRouter';
import {Localytics} from '../../../common/services/Localytics';

class ManagePasswordResetController {
  student;

  /*@ngInject*/
  constructor($scope, private ngDialogRouter : IDialogRouter, private UsersProxy, private  Localytics : Localytics) {
    this.student = $scope['student'];
  }

  close() {
    this.ngDialogRouter.close('manage.password.reset');
  }

  reset() {
    return this.UsersProxy.resetPassword(this.student).$promise
      .then((response) => {
        this.Localytics.tagEvent('Student Password Reset');

        this.close();
        this.ngDialogRouter.go('manage.password.new', {
          student: this.student,
          newPassword: response.newPassword
        });
      });
  }
}

const template = `
<manage-student-avatar avatar="{{$ctrl.student.getAvatarUrl()}}" icon="{{'images/manage/lock.png'}}"></manage-student-avatar>

<div class="manage-reset-password-text">
  <span>{{'are_you_sure_reset_password' | translate}}</span>
  <span class="manage-reset-password-name">{{$ctrl.student.userName}}?</span>
</div>

<footer class="manage-reset-password-footer">
  <button class="secondary action-button" ng-click="$ctrl.close()">{{'close' | translate}}
  </button>
  <click-once-button class="primary action-button" on-click="$ctrl.reset()">
    <span>{{'reset' | translate}}</span>
    <loader></loader>
  </click-once-button>
</footer>
`;

export class ManagePasswordResetState {
  template = template;
  controller = ManagePasswordResetController;
  controllerAs = '$ctrl';
}

