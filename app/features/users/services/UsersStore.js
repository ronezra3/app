"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = require("./../../common/services/Store");
var UsersStore = /** @class */ (function (_super) {
    __extends(UsersStore, _super);
    /*@ngInject*/
    function UsersStore(UsersProxy, $q, lodash) {
        return _super.call(this, 'users', UsersProxy, $q, lodash) || this;
    }
    UsersStore.prototype.create = function () {
        return new this.Proxy();
    };
    UsersStore.prototype.query = function (apiQuery) {
        var _this = this;
        return _super.prototype.query.call(this, apiQuery)
            .then(function (users) {
            // this.updateUserClasses(apiQuery.classId, users);
            return users;
        })
            .catch(function () {
            console.warn('cannot fetch users data from server - offline mode');
            // return this.selectClassStudents(apiQuery.classId); //TODO
            return _this.$q.reject();
        });
    };
    UsersStore.prototype.removeFromClass = function (user, classId) {
        return user.$removeFromClass({ classId: classId });
        // .then(() => this.lovefield.db()
        //   .then((db) => {
        //     let table = db.getSchema().table('class_students');
        //     this.deleteClassStudents(db, table, classId, user.id)
        //       .exec()
        //       .catch((e) => console.error(`cannot update cache - remove user from class ${e.message}`));
        //   }));
    };
    return UsersStore;
}(Store_1.Store));
exports.UsersStore = UsersStore;
//# sourceMappingURL=UsersStore.js.map