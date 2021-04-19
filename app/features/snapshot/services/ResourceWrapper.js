"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SubmitableResourceWrapper_1 = require("../../activities/services/SubmitableResourceWrapper");
var SnapshotResourceWrapper = /** @class */ (function (_super) {
    __extends(SnapshotResourceWrapper, _super);
    function SnapshotResourceWrapper($resource, ENV, CurrentUser, lodash) {
        var _this = _super.call(this, $resource, ENV, 'snapshots', CurrentUser) || this;
        _this.lodash = lodash;
        return _this;
    }
    SnapshotResourceWrapper.prototype.getSubmitParams = function () {
        var submitParams = _super.prototype.getSubmitParams.call(this);
        submitParams.vote = '@vote';
        return submitParams;
    };
    SnapshotResourceWrapper.prototype.get = function () {
        var resource = _super.prototype.get.call(this);
        var lodash = this.lodash;
        resource.prototype.hasSubmitted = function (userId) {
            var userIds = this.getVoters();
            return lodash.some(userIds, function (id) {
                return id === userId;
            });
        };
        resource.prototype.getVoters = function () {
            return lodash.union(this.yes, this.no);
        };
        return resource;
    };
    return SnapshotResourceWrapper;
}(SubmitableResourceWrapper_1.SubmitableResourceWrapper));
exports.SnapshotResourceWrapper = SnapshotResourceWrapper;
//# sourceMappingURL=ResourceWrapper.js.map