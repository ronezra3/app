"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceWrapper_1 = require("./ResourceWrapper");
var SubmitableResourceWrapper = /** @class */ (function (_super) {
    __extends(SubmitableResourceWrapper, _super);
    function SubmitableResourceWrapper($resource, ENV, type, CurrentUser) {
        var _this = _super.call(this, $resource, ENV, type) || this;
        _this.CurrentUser = CurrentUser;
        return _this;
    }
    SubmitableResourceWrapper.prototype.getExtraMethods = function () {
        var extraMethods = _super.prototype.getExtraMethods.call(this);
        extraMethods.submit = {
            method: 'POST',
            params: this.getSubmitParams(),
            url: this.baseApiEndpoint + '/submit'
        };
        return extraMethods;
    };
    SubmitableResourceWrapper.prototype.getSubmitParams = function () {
        return { userId: this.CurrentUser.get().id };
    };
    return SubmitableResourceWrapper;
}(ResourceWrapper_1.ActivityResourceWrapper));
exports.SubmitableResourceWrapper = SubmitableResourceWrapper;
//# sourceMappingURL=SubmitableResourceWrapper.js.map