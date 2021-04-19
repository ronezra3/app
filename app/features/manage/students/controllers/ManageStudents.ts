import LoDashStatic = _.LoDashStatic;
import {IStateServiceExtended} from '../../../../3rdparty/common/decorators/StateDecorator';

class ManageStudentsController {
  members : Array<any>;
  classInfo : any;

  /*@ngInject*/
  constructor(UsersStore, $state : IStateServiceExtended, private lodash : LoDashStatic, ClassesStore) {
    UsersStore.query({classId: $state.params['classId']}).then((members) => this.members = members);
    ClassesStore.get($state.params['classId']).then((classInfo) => this.classInfo = classInfo);
  }

  onStudentRemoved(student) {
    this.lodash.remove(this.members, student);
  }
}

const template = `
<view>
  <content class="manage-students-view" scrollable="true">
    <loader class="manage-section-loader" ng-hide="$ctrl.members"></loader>

    <div ng-if="$ctrl.members.length === 0" class="empty-mode">
      <h2>{{ "manage_students_empty_mode_title" | translate }}</h2>
      <p>{{ "manage_students_empty_mode_desc" | translate: {code: $ctrl.classInfo.code.toUpperCase()} }}</p>
    </div>

    <p class="manage-class-students" ng-show="$ctrl.members.length > 0">
    {{'class_students' | translate}} ({{$ctrl.members.length}})</p>
    <section class="manage-class-students-section" ng-show="$ctrl.members.length > 0">
      <class-student ng-repeat="student in $ctrl.members" student="student"
                     on-student-removed="$ctrl.onStudentRemoved(student)"></class-student>
    </section>
  </content>
</view>
`;

export class ManageStudentsState {
  url = '/students';
  controller = ManageStudentsController;
  controllerAs = '$ctrl';
  bindToController = true;
  template = template;
}
