"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CurrentSession = /** @class */ (function () {
    /*@ngInject*/
    function CurrentSession(SessionProxy, $rootScope, SocketIO, lodash, $q) {
        this.SessionProxy = SessionProxy;
        this.$rootScope = $rootScope;
        this.SocketIO = SocketIO;
        this.lodash = lodash;
        this.$q = $q;
    }
    CurrentSession.prototype.getInfo = function () {
        return angular.isDefined(this.info) ? this.info : null;
    };
    CurrentSession.prototype.getAttendanceMgr = function () {
        return this.attendanceMgr;
    };
    CurrentSession.prototype.startAttendanceMgr = function (mgr) {
        mgr.start();
        this.attendanceMgr = mgr;
    };
    CurrentSession.prototype.start = function (classId) {
        var _this = this;
        return this.SessionProxy.start(classId)
            .then(function (session) {
            _this.setInfo(session);
            return session;
        });
    };
    CurrentSession.prototype.end = function () {
        var _this = this;
        return this.SessionProxy.end(this.info)
            .then(function () {
            _this.SocketIO.emit(_this.info.id, 'sessionEnded');
            _this.$rootScope.$broadcast('sessionEnding');
        });
    };
    CurrentSession.prototype.onEnd = function (callback) {
        this.SocketIO.on('sessionEnded', callback);
    };
    CurrentSession.prototype.onEnding = function (callback) {
        this.$rootScope.$on('sessionEnding', callback);
    };
    CurrentSession.prototype.isActive = function () {
        return angular.isDefined(this.info);
    };
    CurrentSession.prototype.leave = function () {
        this.info = undefined;
        this.attendanceMgr = undefined;
        this.SocketIO.removeAllListeners('sessionEnded');
    };
    CurrentSession.prototype.load = function (classId) {
        var _this = this;
        return this.SessionProxy.getCurrent(classId).then(function (session) {
            _this.setInfo(session);
            return session;
        });
    };
    CurrentSession.prototype.reportVisitedPage = function (book, page) {
        var session = this.getInfo();
        var sessionBook = this.lodash.find(session.books, { id: book.id });
        if (!sessionBook) {
            sessionBook = { id: book.id, pages: [] };
            this.info.books.push(sessionBook);
        }
        if (page && !this.lodash.contains(sessionBook.pages, page)) {
            sessionBook.pages.push(page);
            return session.$save();
        }
        return this.$q.resolve(session);
    };
    CurrentSession.prototype.setInfo = function (session) {
        this.info = session;
    };
    return CurrentSession;
}());
exports.CurrentSession = CurrentSession;
//# sourceMappingURL=CurrentSession.js.map