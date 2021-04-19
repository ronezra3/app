"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityResolver = /** @class */ (function () {
    function ActivityResolver(type) {
        this.type = type;
        this.resolve = {};
        // We must return a literal notation object here because
        // ui router expects the resolve function to be on the object itself and not it's prototype
        /*@ngInject*/
        this.resolve.activity = function ($stateParams, Activities) {
            var activityId = $stateParams.activityId;
            if (activityId) {
                return Activities.get(type, activityId).$promise;
            }
            return Activities.constructResource(type);
        };
    }
    ActivityResolver.prototype.getResolve = function () {
        return this.resolve;
    };
    return ActivityResolver;
}());
exports.ActivityResolver = ActivityResolver;
//# sourceMappingURL=Resolver.js.map