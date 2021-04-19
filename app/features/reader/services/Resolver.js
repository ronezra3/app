"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReaderResolver = /** @class */ (function () {
    function ReaderResolver() {
    }
    ReaderResolver.prototype.get = function () {
        return {
            bookInfo: this.bookInfo,
            bookActivities: this.bookActivities,
            isTeacher: this.isTeacher,
            pageUrl: this.pageUrl,
            bookFile: this.bookFile
        };
    };
    /*@ngInject*/
    ReaderResolver.prototype.bookInfo = function (CurrentBook, $stateParams, $q, ValidationHandler, BooksStore) {
        CurrentBook.clear();
        return BooksStore.get($stateParams['bookId'])
            .then(function (bookInfo) {
            CurrentBook.info = bookInfo;
            return bookInfo;
        }).catch(function (err) {
            ValidationHandler.handle("cannot_find_book_info");
            return $q.reject("cannot_find_book_info: " + err);
        });
    };
    /*@ngInject*/
    ReaderResolver.prototype.bookFile = function (bookInfo, BookFilesStock) {
        return BookFilesStock.get(bookInfo);
    };
    /*@ngInject*/
    ReaderResolver.prototype.pageUrl = function (bookInfo, Together, CurrentSession, $stateParams, LastBookPage) {
        if (Together.isInTogether() && !Together.inControl()) {
            return CurrentSession.getInfo().together.pageUrl;
        }
        var classId = $stateParams['classId'];
        return LastBookPage.get(bookInfo.id, classId).catch(function () { return null; });
    };
    /*@ngInject*/
    ReaderResolver.prototype.bookActivities = function (CurrentBookActivities, $stateParams, ValidationHandler) {
        CurrentBookActivities.clear();
        return CurrentBookActivities.init($stateParams['bookId'], $stateParams['classId']).then(function () { return CurrentBookActivities.get(); })
            .catch(function () { return ValidationHandler.handle('error_loading_activities'); });
    };
    /*@ngInject*/
    ReaderResolver.prototype.isTeacher = function (ClassesStore, $stateParams) {
        return ClassesStore.get($stateParams['classId']).then(function (classInfo) { return classInfo.isTeacher(); });
    };
    return ReaderResolver;
}());
exports.ReaderResolver = ReaderResolver;
//# sourceMappingURL=Resolver.js.map