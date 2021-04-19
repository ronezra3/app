"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = require("../../common/services/Store");
var ClassesStore = /** @class */ (function (_super) {
    __extends(ClassesStore, _super);
    /*@ngInject*/
    function ClassesStore(ClassesProxy, $q, lodash, CurrentUser) {
        var _this = _super.call(this, 'classes', ClassesProxy, $q, lodash) || this;
        _this.CurrentUser = CurrentUser;
        return _this;
    }
    ClassesStore.prototype.getByBookId = function (bookId) {
        return this.Proxy.query({ bookId: bookId, userId: this.CurrentUser.get().id }).$promise;
    };
    ClassesStore.prototype.queryBuilder = function (user) {
        return {
            userId: user.id,
            type: user.isTeacher ? this.Proxy.classTypes.teaching : this.Proxy.classTypes.studying
        };
    };
    ClassesStore.prototype.query = function (query) {
        var _this = this;
        return _super.prototype.query.call(this, query)
            .then(function (classes) {
            // this.updateUserClasses(query.userId, classes);
            return classes;
        })
            .catch(function () {
            console.warn('cannot fetch classes data from server - offline mode');
            // return this.selectUserClasses(query.userId);
            return _this.$q.reject();
        });
    };
    ClassesStore.prototype.join = function (code, user) {
        var _this = this;
        var deferred = this.$q.defer();
        this.Proxy.join({ code: code.toLowerCase(), userId: user.id }).$promise
            .then(function (classInfo) {
            deferred.resolve(new _this.Proxy(classInfo));
            // this.upsertCache([classInfo])
            //   .then(() => this.lovefield.db()
            //     .then(db => this.insertUserClasses(db, db.getSchema().table('user_classes'), user.id, classInfo.id)));
        })
            .catch(deferred.reject);
        return deferred.promise;
    };
    ClassesStore.prototype.create = function (classInfo, user) {
        var _this = this;
        return this.Proxy.create({ classInfo: classInfo, userId: user.id }).$promise
            .then(function (classInfo) {
            // this.upsertCache([classInfo])
            //   .then(() => this.lovefield.db()
            //     .then((db) => this.insertUserClasses(db, db.getSchema().table('user_classes'), user.id, classInfo.id)));
            return new _this.Proxy(classInfo);
        });
    };
    ClassesStore.prototype.update = function (classInfo) {
        return classInfo.$save()
            .then(function () {
            // this.upsertCache([classInfo]);
        });
    };
    ClassesStore.prototype.delete = function (classInfo) {
        return classInfo.$delete();
    };
    return ClassesStore;
}(Store_1.Store));
exports.ClassesStore = ClassesStore;
//# sourceMappingURL=ClassesStore.js.map