"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
var Resolver_1 = require("./Resolver");
var ActivityPlayResolver = /** @class */ (function (_super) {
    __extends(ActivityPlayResolver, _super);
    function ActivityPlayResolver(type) {
        var _this = _super.call(this, type) || this;
        /*@ngInject*/
        _this.isSubmitted = function (activity, $state, CurrentUser, $q, $timeout) {
            if (angular.isDefined(activity.hasSubmitted) && activity.hasSubmitted(CurrentUser.get().id)) {
                $timeout(function () { return $state.go('responseSubmitted', {
                    type: type
                }); }, 0);
                return $q.reject();
            }
            return false;
        };
        return _this;
    }
    ActivityPlayResolver.prototype.getResolve = function () {
        var resolve = _super.prototype.getResolve.call(this);
        resolve.isSubmitted = this.isSubmitted;
        return resolve;
    };
    return ActivityPlayResolver;
}(Resolver_1.ActivityResolver));
exports.ActivityPlayResolver = ActivityPlayResolver;
//# sourceMappingURL=PlayResolver.js.map