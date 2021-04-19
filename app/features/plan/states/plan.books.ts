import {BooksStore} from '../../books/services/BooksStore';
import {IStateParamsService} from 'angular-ui-router';
export class PlanBooksController {
  /*@ngInject*/
  constructor(public classInfo, public books) {
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
      <div class="extended-title">
        <ng-include class="clock" src="'images/manage/lock_icon.png'"></ng-include>
        <span>{{ $ctrl.classInfo.code.toUpperCase()}}</span>
      </div>
    </nav-bar-title>
  </navigation-bar>

  <content scrollable="true">
    <books class-info="$ctrl.classInfo" books="$ctrl.books"></books>
  </content>
</view>
`;

export class PlanBooksState {
  controller = PlanBooksController;
  url = '/books';
  controllerAs = '$ctrl';
  template = template;
  resolve = {
    /*@ngInject*/
    classInfo: (ClassesStore, $stateParams) => ClassesStore.get($stateParams.classId),
    /*@ngInject*/
    books: (BooksStore : BooksStore, $stateParams : IStateParamsService) => BooksStore.query({classId: $stateParams['classId']})
  };
}
