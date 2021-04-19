"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ManageBooksController = /** @class */ (function () {
    /*@ngInject*/
    function ManageBooksController(lodash, ClassesStore, $q, ValidationHandler, CurrentUser, UsersProxy, ngDialogRouter, BooksStore, $stateParams) {
        var _this = this;
        this.$q = $q;
        this.ngDialogRouter = ngDialogRouter;
        this.BooksStore = BooksStore;
        this.$stateParams = $stateParams;
        var promises = {
            school: UsersProxy.getSchool({ id: CurrentUser.get().id }).$promise,
            classInfo: ClassesStore.get($stateParams.classId),
            classBooks: BooksStore.query({ classId: $stateParams.classId })
        };
        $q.all(promises).then(function (results) {
            return BooksStore.assignables(results.school.id, results.classInfo.subjectId).then(function (assignables) {
                _this.books = assignables;
                lodash.each(results.classBooks, function (classBook) {
                    var book = lodash.find(_this.books, classBook);
                    book.assigned = true;
                });
            });
        }).catch(function () {
            _this.books = [];
            ValidationHandler.handle('generic_error');
        });
    }
    ManageBooksController.prototype.toggle = function (book) {
        if (book.assigned) {
            return this.remove(book);
        }
        return this.assign(book);
    };
    ManageBooksController.prototype.remove = function (book) {
        var _this = this;
        var deferred = this.$q.defer();
        this.ngDialogRouter.go('are-you-sure', {
            yes: function () {
                return _this.BooksStore.unassign(book, _this.$stateParams.classId).then(deferred.resolve);
            },
            no: deferred.reject,
            message: 'are_you_sure_delete_book'
        });
        return deferred.promise;
    };
    ManageBooksController.prototype.assign = function (book) {
        return book.$assign({ classId: this.$stateParams.classId })
            .then(function () { return book.assigned = true; });
    };
    return ManageBooksController;
}());
var template = "\n<view class=\"beige-view\">\n  <content scrollable=\"true\">\n    <loader class=\"manage-section-loader\" ng-hide=\"$ctrl.books\"></loader>\n\n    <div ng-if=\"$ctrl.books.length === 0\" class=\"empty-mode\">\n      <h2>{{ \"manage-books-empty-mode-title\" | translate }}</h2>\n    </div>\n\n    <ul class=\"manage-books-list\" ng-if=\"$ctrl.books.length > 0\">\n      <li class=\"manage-book\" ng-repeat=\"book in $ctrl.books\">\n        <div class=\"manage-book-cover\">\n          <img class=\"manage-book-img\" csp-src=\"{{book | thumbnailUrl}}\"/>\n          <click-once-button class=\"manage-book-dark-cover\" enable-on-success=\"true\" on-click=\"$ctrl.toggle(book)\">\n            <loader></loader>\n            <ng-include ng-show=\"book.assigned\" class=\"manage-book-remove-icon\" src=\"'images/manage/trash.svg'\"></ng-include>\n            <ng-include ng-hide=\"book.assigned\" class=\"manage-book-assign-icon\"\n                      src=\"'images/assess/plus_icon.svg'\"></ng-include>\n          </click-once-button>\n        </div>\n\n        <div class=\"manage-book-details\">\n          <div class=\"manage-book-title\">{{book.title}}</div>\n          <div class=\"manage-book-author\">{{'by' | translate}} {{book.author}}</div>\n        </div>\n      </li>\n    </ul>\n  </content>\n</view>\n";
var ManageBooksState = /** @class */ (function () {
    function ManageBooksState() {
        this.url = '/books';
        this.controller = ManageBooksController;
        this.controllerAs = '$ctrl';
        this.bindToController = true;
        this.template = template;
    }
    return ManageBooksState;
}());
exports.ManageBooksState = ManageBooksState;
//# sourceMappingURL=ManageBooksController.js.map