"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = require("../../common/services/Store");
var BooksStore = /** @class */ (function (_super) {
    __extends(BooksStore, _super);
    /*@ngInject*/
    function BooksStore(BooksProxy, $q, lodash) {
        return _super.call(this, 'books', BooksProxy, $q, lodash) || this;
    }
    BooksStore.prototype.assignables = function (schoolId, subjectId) {
        return this.Proxy.assignables({
            schoolId: schoolId,
            subjectId: subjectId
        }).$promise;
    };
    BooksStore.prototype.query = function (apiQuery) {
        var _this = this;
        return _super.prototype.query.call(this, apiQuery)
            .then(function (books) {
            // this.updateClassesBooks(apiQuery.classId, books);
            return books;
        })
            .catch(function () {
            console.warn('cannot fetch books data from server - offline mode');
            return _this.$q.reject();
            // return this.selectFromClassesBooks(apiQuery.classId);
        });
    };
    return BooksStore;
}(Store_1.Store));
exports.BooksStore = BooksStore;
//# sourceMappingURL=BooksStore.js.map