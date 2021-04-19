"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SubmitableResourceWrapper_1 = require("../../activities/services/SubmitableResourceWrapper");
var IdeasResourceWrapper = /** @class */ (function (_super) {
    __extends(IdeasResourceWrapper, _super);
    function IdeasResourceWrapper($resource, ENV, CurrentUser, lodash) {
        var _this = _super.call(this, $resource, ENV, 'ideas', CurrentUser) || this;
        _this.lodash = lodash;
        return _this;
    }
    IdeasResourceWrapper.prototype.get = function () {
        var resource = _super.prototype.get.call(this);
        var lodash = this.lodash;
        resource.prototype.hasSubmitted = function (userId) {
            return lodash.some(this.associations, { userId: userId });
        };
        return resource;
    };
    return IdeasResourceWrapper;
}(SubmitableResourceWrapper_1.SubmitableResourceWrapper));
exports.IdeasResourceWrapper = IdeasResourceWrapper;
//# sourceMappingURL=ResourceWrapper.js.map