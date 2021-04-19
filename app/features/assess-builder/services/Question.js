"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*@ngInject*/
var Question = /** @class */ (function () {
    function Question(lodash, AssessValues, Localytics) {
        this.lodash = lodash;
        this.AssessValues = AssessValues;
        this.Localytics = Localytics;
    }
    Question.prototype.initialize = function (question) {
        if (!question.answers) {
            question.answers = [];
            for (var i = 0; i < this.AssessValues.minAnswers; i++) {
                question.answers.push({ 'status': false });
            }
        }
    };
    Question.prototype.removeAnswer = function (question, answer) {
        this.lodash.pull(question.answers, answer);
    };
    Question.prototype.toggleAnswerStatus = function (question, answer) {
        answer.status = !answer.status;
    };
    Question.prototype.toggleAnswerSelected = function (question, answer) {
        answer.selected = !answer.selected;
    };
    Question.prototype.addAnswer = function (question, answer) {
        this.Localytics.tagEvent('Assess Answer Added');
        answer.status = false;
        question.answers.push(answer);
    };
    Question.prototype.canDelete = function (question) {
        return question.answers.length > this.AssessValues.minAnswers;
    };
    Question.prototype.canAddAnswer = function (question) {
        return question.answers.length < this.AssessValues.maxAnswers;
    };
    Question.prototype.isCorrect = function (question) {
        var allCorrectAnswersAreSelected = this.lodash.chain(question.answers).where({ status: true }).every({ selected: true }).value();
        var incorrectAnswerSelected = this.lodash.chain(question.answers).where({ status: false }).any({ selected: true }).value();
        return allCorrectAnswersAreSelected && !incorrectAnswerSelected;
    };
    Question.prototype.isFullyAnswered = function (question) {
        return this.lodash.any(question.answers, { selected: true });
    };
    Question.prototype.validate = function (question) {
        if (!question.content) {
            return 'empty_assess_question';
        }
        var hasEmptyAnswer = this.lodash.any(question.answers, function (answer) {
            return !answer.content;
        });
        if (hasEmptyAnswer) {
            return 'empty_answer';
        }
        var noCorrectAnswer = !this.lodash.any(question.answers, function (answer) {
            return answer.status;
        });
        if (noCorrectAnswer) {
            return 'no_correct_answer';
        }
        var uniqueAnswers = this.lodash(question.answers).chain().pluck('content').uniq().value();
        if (uniqueAnswers.length !== question.answers.length) {
            return 'answers_not_unique';
        }
        return null;
    };
    ;
    return Question;
}());
exports.Question = Question;
//# sourceMappingURL=Question.js.map