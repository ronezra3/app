"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BookFile = /** @class */ (function () {
    function BookFile(book, $q, LocalStorageFactory, $http, BooksValues, FileSystemUtilities, ENV, lodash, CurrentUser) {
        this.book = book;
        this.$q = $q;
        this.LocalStorageFactory = LocalStorageFactory;
        this.$http = $http;
        this.BooksValues = BooksValues;
        this.FileSystemUtilities = FileSystemUtilities;
        this.ENV = ENV;
        this.lodash = lodash;
        this.CurrentUser = CurrentUser;
        this.isAvailable = false;
    }
    BookFile.prototype.getDownloadPromise = function () {
        return this.downloadPromise;
    };
    BookFile.prototype.persistBookAuthorization = function (id) {
        var _this = this;
        return this.LocalStorageFactory.get(this.getBooksAuthStoredName()).then(function (authorizedBooks) {
            return _this.setAuthorizedBooks(authorizedBooks, id);
        }).catch(function () {
            return _this.setAuthorizedBooks([], id);
        });
    };
    BookFile.prototype.setAuthorizedBooks = function (authorizedBooks, id) {
        authorizedBooks.push(id);
        return this.LocalStorageFactory.set(this.getBooksAuthStoredName(), authorizedBooks);
    };
    BookFile.prototype.getIsAuthorized = function (id) {
        return this.getDownloadUrl(id, 10).then(function (url) {
            return Boolean(url);
        });
    };
    BookFile.prototype.isAuthorized = function (id) {
        var _this = this;
        return this.LocalStorageFactory.get(this.getBooksAuthStoredName()).then(function (authorizedBooks) {
            if (authorizedBooks && _this.lodash.contains(authorizedBooks, id)) {
                return true;
            }
            return _this.getIsAuthorized(id);
        }).catch(function () {
            return _this.getIsAuthorized(id);
        });
    };
    BookFile.prototype.localDirPath = function () {
        return this.BooksValues.localPath + '.' + this.book.id;
    };
    BookFile.prototype.getUrl = function (filePath) {
        return this.FileSystemUtilities.getUrl(this.localDirPath() + '/' + filePath);
    };
    BookFile.prototype.download = function () {
        var _this = this;
        if (this.downloadPromise) {
            return this.downloadPromise;
        }
        return this.downloadPromise = this.getDownloadUrl(this.book.id, 10).then(function (response) {
            // console.log(response)
            _this.FileSystemUtilities.extractOnlineZip(response.data, _this.localDirPath()).then(function () {
                _this.isAvailable = true;
                return _this.$q.all([_this.persistBookAuthorization(_this.book.id),
                    _this.LocalStorageFactory.set('book-' + _this.book.id, { downloadedVersion: _this.book.version })]);
            });
        }).finally(function () { return _this.downloadPromise = null; });
    };
    BookFile.prototype.init = function () {
        var _this = this;
        if (this.isInitiallized) {
            return this.$q.resolve();
        }
        this.isInitiallized = true;
        return this.getDownloadedVersion(this.book.id).then(function (downloadedVersion) {
            var isUpToDate = downloadedVersion && downloadedVersion === _this.book.version;
            if (!isUpToDate) {
                return _this.$q.resolve();
            }
            return _this.isAuthorized(_this.book.id).then(function (isAuthorized) {
                _this.isAvailable = isAuthorized;
            }).catch(function () {
                return;
            });
        }).catch(function () {
            return;
        });
    };
    BookFile.prototype.getDownloadedVersion = function (id) {
        return this.LocalStorageFactory.get('book-' + id).then(function (book) {
            return book.downloadedVersion;
        }).catch(function () {
            return null;
        });
    };
    BookFile.prototype.getDownloadUrl = function (id, numberOfPages) {
        return this.$http.get(this.ENV.lmsEndpoint + '/books/' + id + '/url/' + numberOfPages);
    };
    BookFile.prototype.getBooksAuthStoredName = function () {
        return 'user-' + this.CurrentUser.get().id + '-books';
    };
    return BookFile;
}());
exports.BookFile = BookFile;
/*@ngInject*/
function BookFileFactory($q, LocalStorageFactory, $http, BooksValues, FileSystemUtilities, ENV, lodash, CurrentUser) {
    return function (book) {
        return new BookFile(book, $q, LocalStorageFactory, $http, BooksValues, FileSystemUtilities, ENV, lodash, CurrentUser);
    };
}
exports.BookFileFactory = BookFileFactory;
//# sourceMappingURL=BookFile.js.map