import {ValidationHandler} from '../../../../3rdparty/common/services/ValidationHandler';
import IQService = angular.IQService;
import LoDashStatic = _.LoDashStatic;

class ManageBooksController {
  books : Array<any>;

  /*@ngInject*/
  constructor(lodash : LoDashStatic, ClassesStore, private $q : IQService, ValidationHandler : ValidationHandler,
              CurrentUser, UsersProxy, private ngDialogRouter, private BooksStore, private $stateParams) {
    let promises : any = {
      school: UsersProxy.getSchool({id: CurrentUser.get().id}).$promise,
      classInfo: ClassesStore.get($stateParams.classId),
      classBooks: BooksStore.query({classId: $stateParams.classId})
    };

    $q.all(promises).then((results : any) => {
      return BooksStore.assignables(results.school.id, results.classInfo.subjectId).then((assignables) => {
        this.books = assignables;
        lodash.each(results.classBooks, (classBook) => {
          var book : any = lodash.find(this.books, classBook);
          book.assigned = true;
        });
      });
    }).catch(() => {
      this.books = [];
      ValidationHandler.handle('generic_error');
    });
  }

  public toggle(book) {
    if (book.assigned) {
      return this.remove(book);
    }

    return this.assign(book);
  }

  private remove(book) {
    let deferred = this.$q.defer();
    this.ngDialogRouter.go('are-you-sure', {
      yes: () => {
        return this.BooksStore.unassign(book, this.$stateParams.classId).then(deferred.resolve);
      },
      no: deferred.reject,
      message: 'are_you_sure_delete_book'
    });

    return deferred.promise;
  }

  private assign(book) {
    return book.$assign({classId: this.$stateParams.classId})
      .then(() => book.assigned = true);
  }
}

const template = `
<view class="beige-view">
  <content scrollable="true">
    <loader class="manage-section-loader" ng-hide="$ctrl.books"></loader>

    <div ng-if="$ctrl.books.length === 0" class="empty-mode">
      <h2>{{ "manage-books-empty-mode-title" | translate }}</h2>
    </div>

    <ul class="manage-books-list" ng-if="$ctrl.books.length > 0">
      <li class="manage-book" ng-repeat="book in $ctrl.books">
        <div class="manage-book-cover">
          <img class="manage-book-img" csp-src="{{book | thumbnailUrl}}"/>
          <click-once-button class="manage-book-dark-cover" enable-on-success="true" on-click="$ctrl.toggle(book)">
            <loader></loader>
            <ng-include ng-show="book.assigned" class="manage-book-remove-icon" src="'images/manage/trash.png'"></ng-include>
            <ng-include ng-hide="book.assigned" class="manage-book-assign-icon"
                      src="'images/assess/plus_icon.png'"></ng-include>
          </click-once-button>
        </div>

        <div class="manage-book-details">
          <div class="manage-book-title">{{book.title}}</div>
          <div class="manage-book-author">{{'by' | translate}} {{book.author}}</div>
        </div>
      </li>
    </ul>
  </content>
</view>
`;

export class ManageBooksState {
  url = '/books';
  controller = ManageBooksController;
  controllerAs = '$ctrl';
  bindToController = true;
  template = template;
}
