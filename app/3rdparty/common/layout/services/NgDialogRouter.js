"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("ng-dialog");
var NgDialogRouterProvider = /** @class */ (function () {
    function NgDialogRouterProvider() {
        this.dialogsConfig = {};
    }
    NgDialogRouterProvider.prototype.state = function (path, config) {
        if (angular.isUndefined(config.template)) {
            throw new Error('Cannot create dialog state without template!');
        }
        this.dialogsConfig[path] = config;
        return this;
    };
    /*@ngInject*/
    NgDialogRouterProvider.prototype.$get = function (ngDialog, $rootScope, lodash, HardwareBackButton, Localytics) {
        return new NgDialogRouter(ngDialog, this.dialogsConfig, $rootScope, lodash, HardwareBackButton, Localytics);
    };
    return NgDialogRouterProvider;
}());
exports.NgDialogRouterProvider = NgDialogRouterProvider;
var NgDialogRouter = /** @class */ (function () {
    function NgDialogRouter(ngDialog, dialogsConfig, $rootScope, lodash, HardwareBackButton, Localytics) {
        this.ngDialog = ngDialog;
        this.dialogsConfig = dialogsConfig;
        this.$rootScope = $rootScope;
        this.lodash = lodash;
        this.HardwareBackButton = HardwareBackButton;
        this.Localytics = Localytics;
        this.storage = {};
    }
    NgDialogRouter.prototype.go = function (path, params, closeByBackButton, dynamicConfig) {
        var _this = this;
        if (closeByBackButton === void 0) { closeByBackButton = true; }
        this.lastPath = path;
        if (angular.isDefined(this.storage[path])) {
            throw new Error('Cannot open the same dialog twice');
        }
        var config = this.lodash.clone(this.dialogsConfig[path]);
        if (dynamicConfig) {
            if (dynamicConfig.appendClassName && config.appendClassName) {
                config.appendClassName += " " + dynamicConfig.appendClassName;
                delete dynamicConfig.appendClassName;
            }
            this.lodash.assign(config, dynamicConfig);
        }
        config.scope = this.lodash.assign(this.$rootScope.$new(), params);
        config.plain = true;
        var deregister = this.HardwareBackButton.push((function () {
            if (closeByBackButton) {
                _this.close(path);
            }
        }).bind(this));
        config.preCloseCallback = function () {
            delete _this.storage[path];
            deregister();
        };
        this.storage[path] = this.ngDialog.open(config);
        this.Localytics.tagScreen(path);
    };
    NgDialogRouter.prototype.closeAll = function () {
        this.lastPath = null;
        this.storage = {};
        this.ngDialog.closeAll();
    };
    NgDialogRouter.prototype.close = function (path) {
        var id = this.storage[path].id;
        delete this.storage[path];
        this.ngDialog.close(id);
    };
    NgDialogRouter.prototype.is = function (path) {
        return this.lastPath === path;
    };
    return NgDialogRouter;
}());
//# sourceMappingURL=NgDialogRouter.js.map