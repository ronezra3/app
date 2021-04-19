const template = `
<ul class="wrap-panel">
  <li ng-repeat="book in $ctrl.books">
    <book-thumbnail book="book"></book-thumbnail>
  </li>
</ul>
<div ng-if="$ctrl.books.length === 0" class="empty-mode">
  <h2>{{ "books_empty_mode_title" | translate }}</h2>
  <p ng-if="$ctrl.classInfo.isTeacher()">{{ "books_empty_mode_desc" | translate }}</p>
</div>
`;

export class Books {
  template = template;
  bindings : any = {
    classInfo: '<',
    books: '<'
  };
}
