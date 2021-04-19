"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlanBooksController = /** @class */ (function () {
    /*@ngInject*/
    function PlanBooksController(classInfo, books) {
        this.classInfo = classInfo;
        this.books = books;
    }
    return PlanBooksController;
}());
exports.PlanBooksController = PlanBooksController;
var template = "\n<view class=\"gray-view flex-view\">\n  <navigation-bar>\n    <left-buttons>\n      <back-button></back-button>\n    </left-buttons>\n\n    <nav-bar-title>\n      <class-header-title class-info=\"$ctrl.classInfo\" show-details=\"true\"></class-header-title>\n      <div class=\"extended-title\">\n        <ng-include class=\"clock\" src=\"'images/manage/lock_icon.svg'\"></ng-include>\n        <span>{{ $ctrl.classInfo.code.toUpperCase()}}</span>\n      </div>\n    </nav-bar-title>\n  </navigation-bar>\n\n  <content scrollable=\"true\">\n    <books class-info=\"$ctrl.classInfo\" books=\"$ctrl.books\"></books>\n  </content>\n</view>\n";
var PlanBooksState = /** @class */ (function () {
    function PlanBooksState() {
        this.controller = PlanBooksController;
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
    return PlanBooksState;
}());
exports.PlanBooksState = PlanBooksState;
//# sourceMappingURL=plan.books.js.map