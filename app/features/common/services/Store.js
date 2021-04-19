"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store = /** @class */ (function () {
    function Store(name, Proxy, $q, lodash) {
        this.name = name;
        this.Proxy = Proxy;
        this.$q = $q;
        this.lodash = lodash;
    }
    Store.prototype.query = function (query) {
        return this.Proxy.query(query).$promise
            .then(function (elements) {
            // this.upsertCache(elements);
            return elements;
        });
    };
    Store.prototype.get = function (id) {
        var _this = this;
        return this.$q.resolve().then(function () { return _this.getFromFromProxy(id); });
        // return this.lovefield.db().then((db) => {
        //   let table = db.getSchema().table(this.name);
        //   return db.select().from(table).where(table.id.eq(id)).exec()
        //     .then((rows) => this.getFromFromProxy(id));
        // });
    };
    Store.prototype.getFromFromProxy = function (id) {
        return this.Proxy.get({ id: id }).$promise
            .then(function (elem) {
            // this.upsertCache([elem]);
            return elem;
        });
    };
    return Store;
}());
exports.Store = Store;
//# sourceMappingURL=Store.js.map