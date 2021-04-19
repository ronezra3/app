"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LearnBooksController = /** @class */ (function () {
    /*@ngInject*/
    function LearnBooksController(CurrentSession, classInfo, books, $state) {
        this.CurrentSession = CurrentSession;
        this.classInfo = classInfo;
        this.books = books;
        this.$state = $state;
    }
    LearnBooksController.prototype.isInSession = function () {
        return this.CurrentSession.isActive();
    };
    return LearnBooksController;
}());
exports.LearnBooksController = LearnBooksController;
var template = "\n<view class=\"gray-view flex-view\" hardware-back-button-enabled=\"!$ctrl.isInSession()\">\n  <navigation-bar>\n    <left-buttons><back-button ng-if=\"!$ctrl.isInSession()\"></back-button></left-buttons>\n\n    <nav-bar-title>\n      <class-header-title class-info=\"$ctrl.classInfo\" show-details=\"false\"></class-header-title>\n    </nav-bar-title>\n\n    <right-buttons>\n      <hamburger-button></hamburger-button>\n    </right-buttons>\n  </navigation-bar>\n\n\n  <content scrollable=\"true\">\n    <books class-info=\"$ctrl.classInfo\" books=\"$ctrl.books\"></books>\n  </content>\n</view>\n";
var LearnBooksState = /** @class */ (function () {
    function LearnBooksState() {
        this.controller = LearnBooksController;
        this.url = '/books';
        this.controllerAs = '$ctrl';
        this.template = template;
        this.resolve = {
            /*@ngInject*/
            classInfo: function (ClassesStore, $stateParams) { return ClassesStore.get($stateParams.classId); },
            /*@ngInject*/
            books: function (BooksStore, $stateParams) { return BooksStore.query({ classId: $stateParams['classId'] }); }
        };
    }
    return LearnBooksState;
}());
exports.LearnBooksState = LearnBooksState;
//# sourceMappingURL=learn.books.js.map