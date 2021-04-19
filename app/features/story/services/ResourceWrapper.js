"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SubmitableResourceWrapper_1 = require("../../activities/services/SubmitableResourceWrapper");
var StoryResourceWrapper = /** @class */ (function (_super) {
    __extends(StoryResourceWrapper, _super);
    function StoryResourceWrapper($resource, ENV, CurrentUser, lodash) {
        var _this = _super.call(this, $resource, ENV, 'story', CurrentUser) || this;
        _this.lodash = lodash;
        return _this;
    }
    StoryResourceWrapper.prototype.get = function () {
        var resource = _super.prototype.get.call(this);
        var lodash = this.lodash;
        resource.prototype.hasSubmitted = function (userId) {
            return lodash.some(this.associations, { userId: userId });
        };
        return resource;
    };
    return StoryResourceWrapper;
}(SubmitableResourceWrapper_1.SubmitableResourceWrapper));
exports.StoryResourceWrapper = StoryResourceWrapper;
//# sourceMappingURL=ResourceWrapper.js.map