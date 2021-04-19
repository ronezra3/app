import {IDialogRouter} from '../../../../3rdparty/common/layout/services/NgDialogRouter';
import {Localytics} from '../../../common/services/Localytics';

class ManageRemoveStudentController {
  student;
  onStudentRemoved;

  /*@ngInject*/
  constructor($scope, private ngDialogRouter : IDialogRouter, private $stateParams, private UsersStore, private Localytics : Localytics) {
    this.student = $scope['student'];
    this.onStudentRemoved = $scope['onStudentRemoved'];
  }

  close() {
    this.ngDialogRouter.close('manage.student.remove');
  }

  remove() {
    return this.UsersStore.removeFromClass(this.student, this.$stateParams['classId'])
      .then(() => {
        this.Localytics.tagEvent('Student Removed');

        this.close();
        this.onStudentRemoved({student: this.student});
      });
  }
}

const template = `
<manage-student-avatar avatar="{{$ctrl.student.getAvatarUrl()}}" icon="{{'images/manage/x_icon.png'}}"></manage-student-avatar>

<div class="manage-remove-student-text">
  <span>{{'are_you_sure_delete_student' | translate}}</span>
  <span class="manage-remove-student-name">{{$ctrl.student.userName}}?</span>
</div>

<footer class="manage-remove-student-footer">
  <button class="secondary action-button" ng-click="$ctrl.close()">{{'close' | translate}}
  </button>
  <click-once-button class="primary action-button" on-click="$ctrl.remove()">
    <span>{{'remove' | translate}}</span>
    <loader></loader>
  </click-once-button>
</footer>
`;

export class ManageRemoveStudentState {
  template = template;
  controller = ManageRemoveStudentController;
  controllerAs = '$ctrl';
}
