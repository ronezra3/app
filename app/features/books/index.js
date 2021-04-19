"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Books_1 = require("./directives/Books");
var BookThumbnail_1 = require("./directives/BookThumbnail");
var ThumbnailUrl_1 = require("./filters/ThumbnailUrl");
var BookActivityFactory_1 = require("./services/BookActivityFactory");
var BookFile_1 = require("./services/BookFile");
var BookFilesStock_1 = require("./services/BookFilesStock");
var BookDownloader_1 = require("./services/BookDownloader");
var BooksProxy_1 = require("./services/BooksProxy");
var BooksStore_1 = require("./services/BooksStore");
var CurrentBook_1 = require("./services/CurrentBook");
var LastBookPage_1 = require("./services/LastBookPage");
var CurrentBookActivities_1 = require("./services/CurrentBookActivities");
exports.default = angular.module('LearniApp.books', [])
    .value('BooksValues', {
    'localPath': '.84638004-7b1b-4388-bbaa-06490efdea27/'
})
    .component('books', new Books_1.Books())
    .component('bookThumbnail', new BookThumbnail_1.BookThumbnail())
    .filter('thumbnailUrl', ThumbnailUrl_1.ThumbnailUrl)
    .service('BookFilesStock', BookFilesStock_1.BookFilesStock)
    .service('BookDownloader', BookDownloader_1.BookDownloader)
    .service('CurrentBook', CurrentBook_1.CurrentBook)
    .service('CurrentBookActivities', CurrentBookActivities_1.CurrentBookActivities)
    .factory('BookActivity', BookActivityFactory_1.BookActivity)
    .factory('BookFileFactory', BookFile_1.BookFileFactory)
    .factory('BooksProxy', BooksProxy_1.BooksProxy)
    .service('BooksStore', BooksStore_1.BooksStore)
    .factory('LastBookPage', LastBookPage_1.LastBookPage)
    .run(function (LogOut, CurrentBookActivities, CurrentBook, BookFilesStock) {
    LogOut.onLoggingOut(function () {
        CurrentBook.clear();
        CurrentBookActivities.clear();
        BookFilesStock.clear();
    });
})
    .name;
//# sourceMappingURL=index.js.map