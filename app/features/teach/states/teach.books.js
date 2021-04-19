"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TeachBooksController = /** @class */ (function () {
    /*@ngInject*/
    function TeachBooksController(classInfo, books, $rootScope, $state) {
        this.classInfo = classInfo;
        this.books = books;
        this.$rootScope = $rootScope;
        this.$state = $state;
    }
    return TeachBooksController;
}());
exports.TeachBooksController = TeachBooksController;
var template = "\n<view class=\"gray-view flex-view\" hardware-back-button-enabled=\"false\">\n  <navigation-bar>\n    <nav-bar-title>\n      <class-header-title class-info=\"$ctrl.classInfo\" show-details=\"true\"></class-header-title>\n      <div class=\"extended-title\">\n        <ng-include class=\"clock\" src=\"'images/manage/lock_icon.svg'\"></ng-include>\n        <span>{{ $ctrl.classInfo.code.toUpperCase()}}</span>\n      </div>\n    </nav-bar-title>\n\n    <right-buttons>\n      <hamburger-button></hamburger-button>\n    </right-buttons>\n  </navigation-bar>\n\n\n  <content scrollable=\"true\">\n    <books class-info=\"$ctrl.classInfo\" books=\"$ctrl.books\"></books>\n  </content>\n</view>\n";
var TeachBooksState = /** @class */ (function () {
    function TeachBooksState() {
        this.controller = TeachBooksController;
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
    return TeachBooksState;
}());
exports.TeachBooksState = TeachBooksState;
//# sourceMappingURL=teach.books.js.map