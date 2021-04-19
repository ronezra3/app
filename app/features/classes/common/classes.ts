import { IState } from 'angular-ui-router';
import { CurrentUser } from '../../../3rdparty/common/services/CurrentUser';
import { ClassesStore } from '../../class/services/ClassesStore';
import { IStateServiceExtended } from '../../../3rdparty/common/decorators/StateDecorator';

class ClassesController {
  /*@ngInject*/
  constructor(public classes, public school, public isTeacher, public subjects, private ngDialogRouter, private ClassesStore
    , private $state: IStateServiceExtended) {
  }
  deleteClass(classItem) {
 
    this.ngDialogRouter.go('are-you-sure', 
      {
        yes: () => {
          return this.ClassesStore.delete(null, classItem.id)
            .then(() => {
              this.$state.reload();

            });
        },
        message: 'are_you_sure_delete_class',
      },
      null,
      { appendClassName: 'manage' }
    );
  }
}
//      <span class="school-name">{{$ctrl.school.name}}</span>

const template = `
<view class="gray-view flex-view classes">
  <navigation-bar>
    <logo>
      <img class="full" src="images/logo_full.png"/>
      <ng-include class="square" src="'images/logo.png'"></ng-include>
    </logo>

    <nav-bar-title>
    </nav-bar-title>

    <right-buttons>
      <user-thumbnail></user-thumbnail>
    </right-buttons>
  </navigation-bar>

  <content scrollable="true">
    <div class="activity-header" style="margin-bottom:0;margin-top: 10px; font-size:2.8rem">
    <h1 ng-if="$ctrl.isTeacher">{{'המפגשים שלי'}}</h1>
    <create-class-thumbnail ng-if="$ctrl.isTeacher" subjects="$ctrl.subjects"
    style="margin-top: -12px;
    margin-bottom: 12px;"></create-class-thumbnail>
    <join-class-thumbnail style="margin-top: -12px;
    margin-bottom: 12px;" ng-if="!$ctrl.isTeacher"></join-class-thumbnail>
    </div>
    <ul class="wrap-panel">
      <li ng-repeat="class in $ctrl.classes" ng-if="$ctrl.isTeacher">
        <button ng-click="$ctrl.deleteClass(class)" style="position:absolute;margin-left: 21px;margin-top: 21px;">
          <ng-include class="delete-icon" src="'images/x-icon.png'"></ng-include>
        </button>
        <class-thumbnail class-info="class"></class-thumbnail>
      </li>
      <li>
        
        
      </li>
    </ul>
  </content>
</view>
`;

export class Classes implements IState {
  public url = '/';
  public template = template;
  public controller = ClassesController;
  public controllerAs = '$ctrl';
  public resolve = {
    /*@ngInject*/
    school: (CurrentUser: CurrentUser, UsersProxy) => UsersProxy.getSchool({ id: CurrentUser.get().id }).$promise.catch(() => { }),
    /*@ngInject*/
    classes: (CurrentUser: CurrentUser, ClassesStore: ClassesStore) => ClassesStore.query(ClassesStore.queryBuilder(CurrentUser.get())),
    /*@ngInject*/
    isTeacher: (CurrentUser: CurrentUser) => CurrentUser.get().isTeacher,
    /*@ngInject*/
    subjects: (isTeacher, SubjectsProxy, CurrentUser: CurrentUser) => isTeacher ? SubjectsProxy.query({ id: CurrentUser.get().id }).$promise.catch(() => { }) : null
  };
}
