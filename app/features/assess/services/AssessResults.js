"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssessResults = /** @class */ (function () {
    function AssessResults(lodash, $rootScope, Activities, CurrentSession, StudentAssess) {
        this.lodash = lodash;
        this.$rootScope = $rootScope;
        this.studentsAssesses = [];
        Activities.onSubmitted('assess', this.update.bind(this));
        this.studentsAssesses = CurrentSession.getAttendanceMgr().getAttending().map(function (id) { return new StudentAssess({ studentId: id }); });
    }
    AssessResults.prototype.onChange = function (callback) {
        this.$rootScope.$on('studentAssessSubmitted', callback);
    };
    AssessResults.prototype.get = function () {
        return this.studentsAssesses;
    };
    AssessResults.prototype.update = function (newStudentAssess) {
        var _this = this;
        var existingStudentAssess = this.lodash.find(this.studentsAssesses, { studentId: newStudentAssess.studentId });
        if (!existingStudentAssess) {
            return this.studentsAssesses.push(newStudentAssess);
        }
        existingStudentAssess.submitted = newStudentAssess.submitted;
        if (!existingStudentAssess.questions) {
            return existingStudentAssess.questions = newStudentAssess.questions;
        }
        this.lodash.each(newStudentAssess.questions, function (newQuestion) {
            var existingQuestion = _this.lodash.find(existingStudentAssess.questions, { '_id': newQuestion._id });
            existingQuestion.status = newQuestion.status;
        });
        this.$rootScope.$emit('studentAssessSubmitted');
    };
    return AssessResults;
}());
/*@ngInject*/
function AssessResultsFactory(lodash, $rootScope, Activities, CurrentSession, StudentAssess) {
    return function () { return new AssessResults(lodash, $rootScope, Activities, CurrentSession, StudentAssess); };
}
exports.AssessResultsFactory = AssessResultsFactory;
//# sourceMappingURL=AssessResults.js.map