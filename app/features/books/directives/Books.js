"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = "\n<ul class=\"wrap-panel\">\n  <li ng-repeat=\"book in $ctrl.books\">\n    <book-thumbnail book=\"book\"></book-thumbnail>\n  </li>\n</ul>\n<div ng-if=\"$ctrl.books.length === 0\" class=\"empty-mode\">\n  <h2>{{ \"books_empty_mode_title\" | translate }}</h2>\n  <p ng-if=\"$ctrl.classInfo.isTeacher()\">{{ \"books_empty_mode_desc\" | translate }}</p>\n</div>\n";
var Books = /** @class */ (function () {
    function Books() {
        this.template = template;
        this.bindings = {
            classInfo: '<',
            books: '<'
        };
    }
    return Books;
}());
exports.Books = Books;
//# sourceMappingURL=Books.js.map