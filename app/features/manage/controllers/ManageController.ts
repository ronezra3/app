import {IStateServiceExtended} from '../../../3rdparty/common/decorators/StateDecorator';
import IRootScopeService = angular.IRootScopeService;

class ManageController {
  classInfo;

  /*@ngInject*/
  constructor($rootScope : IRootScopeService, private $state : IStateServiceExtended,
              private ngDialogRouter, private CurrentUser, private ClassesStore) {
    ClassesStore.get($state.params['classId'])
      .then((classInfo) => this.classInfo = classInfo);

    $rootScope.$on('classInfoChanged', (event, newClassInfo) => this.classInfo = newClassInfo);
  }

  deleteClass() {
    this.ngDialogRouter.go('are-you-sure', {
      yes: () => {
        return this.ClassesStore.delete(this.classInfo)
          .then(() => this.$state.back(false, 2));
      },
      message: 'are_you_sure_delete_class',
    }, null, {appendClassName: 'manage'});
  }
}

const template = `
<view class="gray-view flex-view">
  <navigation-bar>
    <left-buttons>
      <back-button></back-button>
    </left-buttons>
    <nav-bar-title>
      <class-header-title class-info="$ctrl.classInfo" show-details="true"></class-header-title>
    </nav-bar-title>
    <right-buttons>
      <button class="delete-class-button" ng-click="$ctrl.deleteClass()">
        <ng-include src="'images/manage/trash.png'"></ng-include>
        <span>{{'delete_class' | translate}}</span>
      </button>
    </right-buttons>
  </navigation-bar>

  <content>
    <ui-view></ui-view>
  </content>

  <nav class="manage-tabs">
    <manage-tab-button type="{{'info'}}"></manage-tab-button>
  </nav>
</view>
`;

    // <manage-tab-button type="{{'books'}}"></manage-tab-button>
    // <manage-tab-button type="{{'students'}}"></manage-tab-button>

export class ManageState {
  url = '/manage/:classId';
  abstract = true;
  controller = ManageController;
  controllerAs = '$ctrl';
  bindToController = true;
  template = template;
}
