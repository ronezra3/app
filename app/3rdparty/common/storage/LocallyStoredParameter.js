"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocallyStoredParameter = /** @class */ (function () {
    function LocallyStoredParameter(LocalStorageFactory, parameterName) {
        this.LocalStorageFactory = LocalStorageFactory;
        this.parameterName = parameterName;
        this.currentParameter = null;
    }
    LocallyStoredParameter.prototype.convertParam = function (param) {
        return param;
    };
    LocallyStoredParameter.prototype.set = function (parameter) {
        this.currentParameter = parameter;
        return this.LocalStorageFactory.set(this.parameterName, parameter);
    };
    LocallyStoredParameter.prototype.load = function () {
        var _this = this;
        return this.LocalStorageFactory.get(this.parameterName).then(function (parameter) { return _this.currentParameter = _this.convertParam(parameter); });
    };
    LocallyStoredParameter.prototype.get = function () {
        return this.currentParameter;
    };
    LocallyStoredParameter.prototype.remove = function () {
        this.currentParameter = null;
        return this.LocalStorageFactory.remove(this.parameterName);
    };
    return LocallyStoredParameter;
}());
exports.LocallyStoredParameter = LocallyStoredParameter;
/*@ngInject*/
function LocallyStoredParameterFactory(LocalStorageFactory) {
    return function (name) { return new LocallyStoredParameter(LocalStorageFactory, name); };
}
exports.LocallyStoredParameterFactory = LocallyStoredParameterFactory;
//# sourceMappingURL=LocallyStoredParameter.js.map