import { IStateParamsService } from 'angular-ui-router';
import { BooksStore } from '../../books/services/BooksStore';
export class LearnBooksController {
  /*@ngInject*/
  constructor(private CurrentSession, public classInfo, public books, private $state) {
  }

  isInSession() {
    return this.CurrentSession.isActive();
  }

}


const template = `
<view class="gray-view flex-view" hardware-back-button-enabled="!$ctrl.isInSession()">
  <navigation-bar>
    <left-buttons><back-button ng-if="!$ctrl.isInSession()"></back-button></left-buttons>

    <nav-bar-title>
      <class-header-title class-info="$ctrl.classInfo" show-details="false"></class-header-title>
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

export class LearnBooksState {
  controller = LearnBooksController;
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
