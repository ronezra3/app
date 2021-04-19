/*@ngInject*/
export function SessionReportItem(lodash, BooksStore, $state) {
  return {
    restrict: 'E',
    template: require('./../templates/session-report-item.html'),
    replace: true,
    scope: {},
    controllerAs: 'ctrl',
    bindToController: {
      session: '=',
      membersCount: '='
    },
    controller: function() {
      var ctrl = this;
      ctrl.activities = () => {
        return lodash.uniq(lodash.pluck(ctrl.session.activities, 'type'));
      };

      ctrl.open = () => {
        $state.go('report', {sessionId: this.session.id});
      };

      ctrl.sessionBooks = [];

      lodash.chain(ctrl.session.books).take(2).map((book) => {
        BooksStore.get(book.id).then((book) => {
          ctrl.sessionBooks.push(book);
        });
      }).value();

      ctrl.getBookPages = function (book) {
        return lodash.find(ctrl.session.books, {id: book.id}).pages;
      };
    }
  };
}
