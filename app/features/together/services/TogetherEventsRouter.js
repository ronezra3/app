"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
var TogetherEventsRouter = /** @class */ (function () {
    function TogetherEventsRouter(Together, $state, BookDownloader, BooksStore, BookFilesStock, CurrentSession, CurrentBook, $rootScope) {
        this.Together = Together;
        this.$state = $state;
        this.BookDownloader = BookDownloader;
        this.BooksStore = BooksStore;
        this.BookFilesStock = BookFilesStock;
        this.CurrentSession = CurrentSession;
        this.CurrentBook = CurrentBook;
        this.$rootScope = $rootScope;
    }
    TogetherEventsRouter.prototype.subscribe = function (isTeacher) {
        this.Together.onUpdated(this.update.bind(this));
        this.Together.onDeActivated(this.deActivate.bind(this));
        this.Together.onRequested(this.requested.bind(this));
        this.Together.onRequestCanceled(this.requestCanceled.bind(this));
        if (!isTeacher) {
            this.Together.onGranted(this.granted.bind(this));
        }
    };
    TogetherEventsRouter.prototype.unsubscribe = function () {
        this.Together.unSubscribe();
    };
    TogetherEventsRouter.prototype.syncWith = function (currentSession, previousSession) {
        var togetherChanged = (currentSession.together.pageUrl !== previousSession.together.pageUrl)
            || (currentSession.together.bookId !== previousSession.together.bookId)
            || (currentSession.together.controllingUserId !== previousSession.together.controllingUserId);
        if (!togetherChanged) {
            return;
        }
        var inControl = this.Together.isInTogether() && this.Together.inControl();
        if (inControl) {
            return this.magnetizeCurrentView();
        }
        return this.sync(currentSession);
    };
    TogetherEventsRouter.prototype.sync = function (currentSession) {
        if (!this.Together.isInTogether()) {
            return this.deActivate();
        }
        return this.syncTogetherView(currentSession.together);
    };
    TogetherEventsRouter.prototype.onRequested = function (callback) {
        this.$rootScope.$on(TogetherEventsRouter.REQUESTED_EVENT, function (event, data) { return callback(data); });
    };
    TogetherEventsRouter.prototype.onRequestCanceled = function (callback) {
        this.$rootScope.$on(TogetherEventsRouter.REQUEST_CANCELLED_EVENT, function (event, data) { return callback(data); });
    };
    TogetherEventsRouter.prototype.onGranted = function (callback) {
        this.$rootScope.$on(TogetherEventsRouter.GRANTED_EVENT, function (event, data) { return callback(data); });
    };
    TogetherEventsRouter.prototype.onBookDownloadStarted = function (id, callback) {
        this.$rootScope.$on(TogetherEventsRouter.BOOK_DOWNLOAD_STARTED + "-" + id, function (event, data) { return callback(data); });
    };
    TogetherEventsRouter.prototype.onPageChanged = function (callback) {
        this.$rootScope.$on(TogetherEventsRouter.PAGE_CHANGED, function (event, data) { return callback(data); });
    };
    TogetherEventsRouter.prototype.openBook = function (book) {
        var isInReader = this.isInReader();
        return this.$state.go("^" + (isInReader ? '' : '.reader') + "." + book.type, { bookId: book.id }, { force: true, replace: isInReader });
    };
    TogetherEventsRouter.prototype.loadBook = function (id) {
        var _this = this;
        return this.BooksStore.get(id).then(function (book) {
            return _this.BookFilesStock.get(book).then(function (file) {
                if (file.getDownloadPromise()) {
                    return;
                }
                if (file.isAvailable) {
                    return _this.openBook(book);
                }
                var promise = _this.BookDownloader.download(file).then(function () {
                    if (_this.Together.isControlled() && _this.CurrentSession.getInfo().together.bookId === book.id) {
                        return _this.openBook(book);
                    }
                });
                _this.$rootScope.$broadcast(TogetherEventsRouter.BOOK_DOWNLOAD_STARTED + "-" + id, promise);
                return promise;
            });
        });
    };
    TogetherEventsRouter.prototype.closeBook = function () {
        this.$state.back(true);
    };
    TogetherEventsRouter.prototype.syncTogetherView = function (togetherInfo) {
        var inReader = this.isInReader();
        if (!togetherInfo.bookId) {
            return inReader ? this.closeBook() : null;
        }
        if (!inReader || (this.$state.params.bookId !== togetherInfo.bookId)) {
            return this.loadBook(togetherInfo.bookId);
        }
        if (togetherInfo.pageUrl) {
            this.$rootScope.$broadcast(TogetherEventsRouter.PAGE_CHANGED, togetherInfo.pageUrl);
        }
    };
    TogetherEventsRouter.prototype.isInReader = function () {
        return this.$state.includes('*.reader.*');
    };
    TogetherEventsRouter.prototype.update = function (togetherInfo) {
        var session = this.CurrentSession.getInfo();
        session.together = togetherInfo;
        this.syncTogetherView(togetherInfo);
    };
    TogetherEventsRouter.prototype.magnetizeCurrentView = function () {
        var inReader = this.isInReader();
        if (inReader) {
            return this.Together.update(this.$state.params.bookId, this.CurrentBook.pageUrl);
        }
        return this.Together.update();
    };
    TogetherEventsRouter.prototype.deActivate = function () {
        var session = this.CurrentSession.getInfo();
        session.together.bookId = null;
        session.together.pageUrl = null;
        session.together.controllingUserId = null;
    };
    TogetherEventsRouter.prototype.requested = function (studentId) {
        var session = this.CurrentSession.getInfo();
        session.together.requestingUserId = studentId;
        this.$rootScope.$broadcast(TogetherEventsRouter.REQUESTED_EVENT, studentId);
    };
    TogetherEventsRouter.prototype.requestCanceled = function () {
        var session = this.CurrentSession.getInfo();
        session.together.requestingUserId = null;
        this.$rootScope.$broadcast(TogetherEventsRouter.REQUEST_CANCELLED_EVENT);
    };
    TogetherEventsRouter.prototype.granted = function (userId) {
        var session = this.CurrentSession.getInfo();
        session.together.controllingUserId = userId;
        session.together.requestingUserId = null;
        if (this.Together.inControl()) {
            this.magnetizeCurrentView();
        }
        this.$rootScope.$broadcast(TogetherEventsRouter.GRANTED_EVENT);
    };
    TogetherEventsRouter.REQUESTED_EVENT = 'together-request';
    TogetherEventsRouter.REQUEST_CANCELLED_EVENT = 'together-request-canceled';
    TogetherEventsRouter.GRANTED_EVENT = 'together-granted';
    TogetherEventsRouter.BOOK_DOWNLOAD_STARTED = 'together-book-download-started';
    TogetherEventsRouter.PAGE_CHANGED = 'together-page-changed';
    return TogetherEventsRouter;
}());
exports.TogetherEventsRouter = TogetherEventsRouter;
//# sourceMappingURL=TogetherEventsRouter.js.map