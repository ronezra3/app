"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceWrapper_1 = require("../../activities/services/ResourceWrapper");
var AssessResourceWrapper = /** @class */ (function (_super) {
    __extends(AssessResourceWrapper, _super);
    function AssessResourceWrapper($resource, ENV, lodash) {
        var _this = _super.call(this, $resource, ENV, 'assess') || this;
        _this.lodash = lodash;
        return _this;
    }
    AssessResourceWrapper.validate = function (activity, Utilities, lodash) {
        if (lodash.isEmpty(activity.questions)) {
            return 'no_questions';
        }
        if (!activity.time) {
            return 'time_zero';
        }
        var errorCode = null;
        lodash.any(activity.questions, function (question) {
            var questionService = Utilities.getFactoryByName(question.type + 'Question');
            errorCode = questionService.validate(question);
            return errorCode;
        });
        return errorCode;
    };
    AssessResourceWrapper.prototype.get = function () {
        var resource = _super.prototype.get.call(this);
        var lodash = this.lodash;
        function getAllAnswers(studentAssessments) {
            return lodash(studentAssessments).chain().pluck('questions').flatten().value();
        }
        function getCorrectAnswers(answers) {
            return lodash.where(answers, { status: 'correct' });
        }
        resource.prototype.getAverageGrade = function (studentAssessments) {
            var allAnswers = getAllAnswers(studentAssessments);
            var totalQuestionsCount = this.questions.length * studentAssessments.length;
            var correctAnswersCount = getCorrectAnswers(allAnswers).length;
            return correctAnswersCount / totalQuestionsCount;
        };
        resource.prototype.calculateQuestionGrade = function (studentAssessments, question) {
            var allAnswers = getAllAnswers(studentAssessments);
            var questionAnswers = lodash.where(allAnswers, { index: question.index });
            var correctAnswersCount = getCorrectAnswers(questionAnswers).length;
            return correctAnswersCount / questionAnswers.length;
        };
        return resource;
    };
    return AssessResourceWrapper;
}(ResourceWrapper_1.ActivityResourceWrapper));
exports.AssessResourceWrapper = AssessResourceWrapper;
//# sourceMappingURL=ResourceWrapper.js.map