import {IDialogRouter} from '../../../../3rdparty/common/layout/services/NgDialogRouter';
import IScope = angular.IScope;

class ManageStudentModalController {
  student;
  onStudentRemoved;

  /*@ngInject*/
  constructor($scope : IScope, private ngDialogRouter : IDialogRouter) {
    this.student = $scope['student'];
    this.onStudentRemoved = $scope['onStudentRemoved'];
  }

  close() {
    this.ngDialogRouter.close('manage.student');
  }

  removeStudent() {
    this.close();
    this.ngDialogRouter.go('manage.student.remove', {
      student: this.student,
      onStudentRemoved: this.onStudentRemoved
    });
  }

  resetPassword() {
    this.close();
    this.ngDialogRouter.go('manage.password.reset', {
      student: this.student
    });
  }
}

const template = `
<manage-student-avatar avatar="{{$ctrl.student.getAvatarUrl()}}"></manage-student-avatar>

<div class="manage-student-user-name">{{$ctrl.student.userName}}</div>
<div class="manage-student-name">{{$ctrl.student.getFullName()}}</div>

<nav class="manage-student-footer">
  <button ng-click="$ctrl.resetPassword()">{{'reset_password' | translate}}</button>
  <button ng-click="$ctrl.removeStudent()">{{'remove_from_class' | translate}}</button>
  <button ng-click="$ctrl.close()">{{'close' | translate}}</button>
</nav>
`;

export class ManageStudentModalState {
  template = template;
  controller = ManageStudentModalController;
  controllerAs = '$ctrl';
}
