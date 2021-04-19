"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssessPlayController = /** @class */ (function () {
    /*@ngInject*/
    function AssessPlayController(StudentAssess, lodash, ngDialogRouter, CurrentUser, activity, studentAssess) {
        this.StudentAssess = StudentAssess;
        this.lodash = lodash;
        this.ngDialogRouter = ngDialogRouter;
        this.CurrentUser = CurrentUser;
        this.activity = activity;
        this.studentAssess = studentAssess;
        this.openInitPopup();
        this.shuffleQuestions();
        this.initStudentAssess();
    }
    AssessPlayController.prototype.openInitPopup = function () {
        //todo: this needs to be closed onDestroy
        this.ngDialogRouter.go('assess.play.intro', {
            name: this.CurrentUser.get().getFullName(),
            minutes: this.activity.time / 60,
            immediateFeedback: this.activity.immediateFeedback
        });
    };
    AssessPlayController.prototype.shuffleQuestions = function () {
        var _this = this;
        this.lodash.each(this.activity.questions, function (question) {
            question.answers = _this.lodash.shuffle(question.answers);
        });
    };
    AssessPlayController.prototype.initStudentAssess = function () {
        if (this.studentAssess.id) {
            this.updatePreviouslySelectedAnswers();
        }
        else {
            this.createNewStudentAssess();
        }
    };
    AssessPlayController.prototype.updatePreviouslySelectedAnswers = function () {
        var _this = this;
        this.lodash.each(this.studentAssess.questions, function (studentQuestion) {
            var assessQuestion = _this.lodash.find(_this.activity.questions, { 'index': studentQuestion.index });
            var previouslySelectedAnswers = _this.lodash.map(studentQuestion.answers, function (studentAnswer) {
                return _this.lodash.find(assessQuestion.answers, { '_id': studentAnswer });
            });
            _this.lodash.each(previouslySelectedAnswers, function (selectedAnswer) {
                if (selectedAnswer) {
                    selectedAnswer.selected = true;
                }
            });
        });
    };
    AssessPlayController.prototype.createNewStudentAssess = function () {
        this.studentAssess = new this.StudentAssess();
        this.studentAssess.assessId = this.activity.id;
        this.studentAssess.studentId = this.CurrentUser.get().id;
        this.studentAssess.questions = this.lodash.map(this.activity.questions, function (question) {
            return { index: question.index, status: '' };
        });
    };
    return AssessPlayController;
}());
exports.AssessPlayController = AssessPlayController;
//# sourceMappingURL=Play.js.map