"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionProxy = /** @class */ (function () {
    /*@ngInject*/
    function SessionProxy($q, $resource, ENV, lodash, ClassesStore, CurrentUser) {
        this.$q = $q;
        this.lodash = lodash;
        this.ClassesStore = ClassesStore;
        this.CurrentUser = CurrentUser;
        var baseUrl = ENV.apiEndpoint + "/sessions/:id";
        this.SessionModel = $resource(baseUrl, { id: '@id' }, {
            getCurrent: {
                method: 'GET',
                url: baseUrl + "/current/:classId",
                params: { classId: '@classId' },
                transformResponse: SessionProxy.transformResponse
            },
            getActive: {
                method: 'GET',
                url: baseUrl + "/active",
                transformResponse: SessionProxy.transformResponse,
                isArray: true
            },
            save: {
                method: 'POST',
                url: baseUrl,
                transformResponse: SessionProxy.transformResponse
            }
        });
    }
    SessionProxy.transformResponse = function (data) {
        if (data) {
            var session = JSON.parse(data);
            if (!session.together) {
                session.together = {};
            }
            return session;
        }
    };
    SessionProxy.prototype.start = function (classId) {
        return new this.SessionModel({ classId: classId }).$save();
    };
    SessionProxy.prototype.query = function (startDate, endDate, limit, classId) {
        return this.SessionModel.query({ startDate: startDate, endDate: endDate, limit: limit, classId: classId }).$promise;
    };
    SessionProxy.prototype.end = function (session) {
        session.endedAt = Date.now();
        return session.$save();
    };
    SessionProxy.prototype.getCurrent = function (classId) {
        var _this = this;
        return this.SessionModel.getCurrent({ classId: classId }).$promise.then(function (session) {
            return session.id ? session : _this.$q.reject();
        });
    };
    SessionProxy.prototype.getActive = function () {
        var _this = this;
        return this.ClassesStore.query(this.ClassesStore.queryBuilder(this.CurrentUser.get()))
            .then(function (classes) { return _this.SessionModel.getActive({ classIds: classes.map(function (classObj) { return classObj.id; }) }).$promise; })
            .then(function (activeSessions) {
            return activeSessions.length ?
                _this.lodash.sortBy(activeSessions, function (session) { return new Date(session.createdAt); })[activeSessions.length - 1] :
                _this.$q.reject();
        });
    };
    SessionProxy.prototype.get = function (id) {
        return this.SessionModel.get({ id: id });
    };
    return SessionProxy;
}());
exports.SessionProxy = SessionProxy;
//# sourceMappingURL=SessionProxy.js.map