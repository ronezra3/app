import { BooksStore } from '../../books/services/BooksStore';
import { IStateParamsService } from 'angular-ui-router';
import IRootScopeService = angular.IRootScopeService;
export class TeachBooksController {
  /*@ngInject*/
  constructor(public classInfo, public books, private $rootScope: IRootScopeService, private $state) {
  }
  
}

const template = `
<view class="gray-view flex-view" hardware-back-button-enabled="false">
  <navigation-bar>
    <nav-bar-title>
      <class-header-title class-info="$ctrl.classInfo" show-details="true"></class-header-title>
      <div class="extended-title">
        <ng-include class="clock" src="'images/manage/lock_icon.png'"></ng-include>
        <span>{{ $ctrl.classInfo.code.toUpperCase()}}</span>
      </div>
    </nav-bar-title>

    <right-buttons>
      <hamburger-button></hamburger-button>
    </right-buttons>
  </navigation-bar>


  <content scrollable="true">
    <books class-info="$ctrl.classInfo" books="$ctrl.books"></books>
  </content>
</view>
`;

export class TeachBooksState {
  controller = TeachBooksController;
  url = '/books';
  controllerAs = '$ctrl';
  template = template;
  resolve = {
    /*@ngInject*/
    classInfo: (ClassesStore, $stateParams) => ClassesStore.get($stateParams.classId),
    /*@ngInject*/
    books: (BooksStore: BooksStore, $stateParams: IStateParamsService) => BooksStore.query({ classId: $stateParams['classId'] })
  };
}
