"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocallyStoredParameter_1 = require("../storage/LocallyStoredParameter");
var CurrentUser = /** @class */ (function (_super) {
    __extends(CurrentUser, _super);
    /*@ngInject*/
    function CurrentUser(LocalStorageFactory, UsersProxy, $rootScope) {
        var _this = _super.call(this, LocalStorageFactory, 'currentUser') || this;
        _this.UsersProxy = UsersProxy;
        _this.$rootScope = $rootScope;
        return _this;
    }
    CurrentUser.prototype.convertParam = function (user) {
        return user ? new this.UsersProxy(user) : user;
    };
    CurrentUser.prototype.load = function () {
        var _this = this;
        return _super.prototype.load.call(this).then(function (user) {
            if (user) {
                _this.$rootScope.$broadcast(CurrentUser.LOADED_EVENT, user);
            }
            return user;
        });
    };
    CurrentUser.prototype.set = function (user) {
        var promise = _super.prototype.set.call(this, user);
        this.$rootScope.$broadcast(CurrentUser.LOADED_EVENT, user);
        return promise;
    };
    CurrentUser.prototype.onLoad = function (callback) {
        this.$rootScope.$on(CurrentUser.LOADED_EVENT, function (event, data) { return callback(data); });
    };
    CurrentUser.LOADED_EVENT = 'currentUser-loaded';
    return CurrentUser;
}(LocallyStoredParameter_1.LocallyStoredParameter));
exports.CurrentUser = CurrentUser;
//# sourceMappingURL=CurrentUser.js.map