"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppOnTop = /** @class */ (function () {
    /*@ngInject*/
    function AppOnTop($q) {
        this.$q = $q;
    }
    AppOnTop.prototype.get = function () {
        var defer = this.$q.defer();
        appontop.getAppOnTop(defer.resolve, defer.reject);
        return defer.promise;
    };
    AppOnTop.prototype.hasPermission = function () {
        var defer = this.$q.defer();
        appontop.hasPermission(defer.resolve, defer.reject);
        return defer.promise;
    };
    AppOnTop.prototype.requestPermission = function () {
        var defer = this.$q.defer();
        appontop.requestPermission(defer.resolve, defer.reject);
        return defer.promise;
    };
    return AppOnTop;
}());
exports.AppOnTop = AppOnTop;
//# sourceMappingURL=AppOnTop.js.map