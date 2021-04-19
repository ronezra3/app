"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MembersResolver_1 = require("../../activities/services/MembersResolver");
var ParticipantPlayResolver = /** @class */ (function (_super) {
    __extends(ParticipantPlayResolver, _super);
    function ParticipantPlayResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ParticipantPlayResolver.prototype.getResolve = function () {
        var resolve = _super.prototype.getResolve.call(this);
        resolve.classInfo = this.classInfo;
        resolve.isSubmitted = this.isSubmitted;
        return resolve;
    };
    /*@ngInject*/
    ParticipantPlayResolver.prototype.classInfo = function (ClassesStore, $stateParams) {
        return ClassesStore.get($stateParams.classId);
    };
    /*@ngInject*/
    ParticipantPlayResolver.prototype.isSubmitted = function (activity, $state, CurrentUser, $q) {
        if (angular.isDefined(activity.hasSubmitted) && activity.hasSubmitted(CurrentUser.get().id)) {
            $state.go('responseSubmitted', {
                type: activity.type
            });
            return $q.reject();
        }
        return false;
    };
    return ParticipantPlayResolver;
}(MembersResolver_1.ActivityMembersResolver));
exports.ParticipantPlayResolver = ParticipantPlayResolver;
//# sourceMappingURL=PlayResolver.js.map