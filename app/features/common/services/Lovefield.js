"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lf = require("lf");
var LovefieldProvider = /** @class */ (function () {
    function LovefieldProvider() {
        if (angular.isDefined(lf)) {
            this.schemaBuilder = lf.schema.create('learni', 1);
        }
        else {
            console.warn('lovefield is not defined');
        }
    }
    /*@ngInject*/
    LovefieldProvider.prototype.$get = function ($q, DeviceUtilities) {
        return new LovefieldWrapper(this.schemaBuilder, $q, DeviceUtilities);
    };
    return LovefieldProvider;
}());
exports.LovefieldProvider = LovefieldProvider;
var LovefieldWrapper = /** @class */ (function () {
    function LovefieldWrapper(schemaBuilder, $q, DeviceUtilities) {
        this.schemaBuilder = schemaBuilder;
        this.$q = $q;
        this.DeviceUtilities = DeviceUtilities;
    }
    LovefieldWrapper.prototype.db = function () {
        var _this = this;
        if (angular.isDefined(this._db)) {
            return this.$q.resolve(this._db);
        }
        var connParams;
        if (this.DeviceUtilities.isIOS()) {
            connParams = { storeType: lf.schema.DataStoreType.WEB_SQL };
        }
        if (!this._dbPromise) {
            this._dbPromise = this.schemaBuilder.connect(connParams)
                .then(function (connection) {
                _this._db = connection;
                return _this._db;
            })
                .catch(function (err) {
                console.error(err);
            });
        }
        return this._dbPromise;
    };
    LovefieldWrapper.prototype.clear = function () {
        var _this = this;
        if (angular.isDefined(this._db)) {
            var tables = this._db.getSchema().tables();
            tables.forEach(function (table) {
                _this._db.delete().from(table).exec();
            });
        }
    };
    return LovefieldWrapper;
}());
exports.LovefieldWrapper = LovefieldWrapper;
//# sourceMappingURL=Lovefield.js.map