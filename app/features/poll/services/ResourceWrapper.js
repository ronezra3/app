"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SubmitableResourceWrapper_1 = require("../../activities/services/SubmitableResourceWrapper");
var PollResourceWrapper = /** @class */ (function (_super) {
    __extends(PollResourceWrapper, _super);
    function PollResourceWrapper($resource, ENV, CurrentUser, lodash) {
        var _this = _super.call(this, $resource, ENV, 'polls', CurrentUser) || this;
        _this.lodash = lodash;
        return _this;
    }
    PollResourceWrapper.prototype.getSubmitParams = function () {
        var submitParams = _super.prototype.getSubmitParams.call(this);
        submitParams.answerId = '@answerId';
        return submitParams;
    };
    PollResourceWrapper.prototype.get = function () {
        var resource = _super.prototype.get.call(this);
        var lodash = this.lodash;
        resource.prototype.getVoters = function () {
            var voters = [];
            lodash.each(this.answers, function (answer) {
                if (angular.isDefined(answer.voters)) {
                    voters = voters.concat(answer.voters);
                }
            });
            return voters;
        };
        resource.prototype.hasSubmitted = function (userId) {
            var userIds = this.getVoters();
            return lodash.some(userIds, function (id) {
                return id === userId;
            });
        };
        return resource;
    };
    return PollResourceWrapper;
}(SubmitableResourceWrapper_1.SubmitableResourceWrapper));
exports.PollResourceWrapper = PollResourceWrapper;
//# sourceMappingURL=ResourceWrapper.js.map