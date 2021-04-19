"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
function SessionReportItem(lodash, BooksStore, $state) {
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
        controller: function () {
            var _this = this;
            var ctrl = this;
            ctrl.activities = function () {
                return lodash.uniq(lodash.pluck(ctrl.session.activities, 'type'));
            };
            ctrl.open = function () {
                $state.go('report', { sessionId: _this.session.id });
            };
            ctrl.sessionBooks = [];
            lodash.chain(ctrl.session.books).take(2).map(function (book) {
                BooksStore.get(book.id).then(function (book) {
                    ctrl.sessionBooks.push(book);
                });
            }).value();
            ctrl.getBookPages = function (book) {
                return lodash.find(ctrl.session.books, { id: book.id }).pages;
            };
        }
    };
}
exports.SessionReportItem = SessionReportItem;
//# sourceMappingURL=SessionReportItemDirective.js.map