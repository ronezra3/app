"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resolver_1 = require("../../activities/services/Resolver");
var ActivityMembersResolver = /** @class */ (function (_super) {
    __extends(ActivityMembersResolver, _super);
    function ActivityMembersResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActivityMembersResolver.prototype.getResolve = function () {
        var resolve = _super.prototype.getResolve.call(this);
        resolve.members = this.members;
        return resolve;
    };
    /*@ngInject*/
    ActivityMembersResolver.prototype.members = function (UsersStore, $stateParams) {
        return UsersStore.query({ classId: $stateParams.classId });
    };
    return ActivityMembersResolver;
}(Resolver_1.ActivityResolver));
exports.ActivityMembersResolver = ActivityMembersResolver;
//# sourceMappingURL=MembersResolver.js.map