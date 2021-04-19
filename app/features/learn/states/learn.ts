import {IStateParamsService} from 'angular-ui-router';
import {UsersStore} from '../../users/services/UsersStore';
import {ClassesStore} from '../../class/services/ClassesStore';
class LearnController {
  /*@ngInject*/
  constructor(public members, public teacher) {
  }
}

const template = `
<side-bars class="gray-view">
  <side-bars-content>
    <ui-view></ui-view>
  </side-bars-content>

  <right-side-bar>
    <student-panel members="$ctrl.members" teacher="$ctrl.teacher"></student-panel>
  </right-side-bar>
</side-bars>
`;

export class LearnState {
  controller = LearnController;
  abstract = true;
  url = '/learn/:classId';
  template = template;
  controllerAs = '$ctrl';
  resolve = {
    /*@ngInject*/
    members: ($stateParams : IStateParamsService, UsersStore : UsersStore) => UsersStore.query({classId: $stateParams['classId']}),
    /*@ngInject*/
    teacher: ($stateParams : IStateParamsService, ClassesStore : ClassesStore) =>
      ClassesStore.get($stateParams['classId']).then((classInfo) => classInfo.getTeacher())
  };
}
