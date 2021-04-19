"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MembersResolver_1 = require("../../activities/services/MembersResolver");
var AssessPlayResolver = /** @class */ (function (_super) {
    __extends(AssessPlayResolver, _super);
    function AssessPlayResolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AssessPlayResolver.prototype.getResolve = function () {
        var resolve = _super.prototype.getResolve.call(this);
        resolve.studentAssess = this.studentAssess;
        resolve.isSubmitted = this.isSubmitted;
        return resolve;
    };
    /*@ngInject*/
    AssessPlayResolver.prototype.studentAssess = function (activity, StudentAssess, CurrentUser) {
        return StudentAssess.getByStudentAssess({
            assessId: activity.id,
            studentId: CurrentUser.get().id
        }).$promise;
    };
    /*@ngInject*/
    AssessPlayResolver.prototype.isSubmitted = function (studentAssess, $q) {
        return studentAssess.submitted ? $q.reject() : false;
    };
    return AssessPlayResolver;
}(MembersResolver_1.ActivityMembersResolver));
exports.AssessPlayResolver = AssessPlayResolver;
//# sourceMappingURL=PlayResolver.js.map