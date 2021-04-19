"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActivityTeachResultsController_1 = require("../../activities/controllers/ActivityTeachResultsController");
var AssessTeachResultsController = /** @class */ (function (_super) {
    __extends(AssessTeachResultsController, _super);
    /*@ngInject*/
    function AssessTeachResultsController(CurrentSession, lodash, Utilities, $stateParams, members, activity, Localytics, AssessResultsFactory) {
        var _this = _super.call(this, $stateParams, activity) || this;
        _this.CurrentSession = CurrentSession;
        _this.lodash = lodash;
        _this.Utilities = Utilities;
        _this.members = members;
        _this.Localytics = Localytics;
        _this.AssessResultsFactory = AssessResultsFactory;
        _this.timedOut = false;
        _this.averageGrade = 0;
        _this.averageProgress = 0;
        _this.studentsData = {
            working: [],
            almost: [],
            finished: [],
            notFinished: []
        };
        _this.elapsedTime = 0;
        _this.studentsAssesses = _this.AssessResultsFactory();
        _this.studentsAssesses.onChange(_this.updateView.bind(_this));
        _this.updateView();
        _this.countdown();
        return _this;
    }
    AssessTeachResultsController.prototype.countdown = function () {
        this.elapsedTime += 1000;
        this.remainingTime = (this.activity.time * 1000) - this.elapsedTime;
        // this is done to recalculate need help every 3 seconds
        if (this.elapsedTime % 3 === 0) {
            //todo: refactor to only calculate need help
            this.updateView();
        }
        if (this.remainingTime >= 0) {
            if (this.remainingTime === 0) {
                this.timedOut = true;
                this.Localytics.tagEvent('Assessment Timed Out');
            }
            this.timeLeft = this.Utilities.stringifyTime(this.remainingTime);
        }
        else {
            this.timeLeft = '-' + this.Utilities.stringifyTime(Math.abs(this.remainingTime));
        }
    };
    AssessTeachResultsController.prototype.getMaxChallengingCount = function () {
        var baseChallengingCount = Math.ceil(this.activity.questions.length * 0.2);
        return Math.min(baseChallengingCount, 3);
    };
    AssessTeachResultsController.prototype.getAttendingStudents = function () {
        var _this = this;
        return this.lodash.map(this.CurrentSession.getAttendanceMgr().getAttending(), function (attendingMemberId) {
            return _this.lodash.find(_this.members, { 'id': attendingMemberId });
        });
    };
    AssessTeachResultsController.prototype.updateView = function () {
        var _this = this;
        this.resetView();
        var attendingStudents = this.getAttendingStudents();
        var total = attendingStudents.length * this.activity.questions.length, correct = 0, incorrect = 0;
        this.lodash.each(this.studentsAssesses.get(), function (studentAssess) {
            if (!studentAssess.questions) {
                return;
            }
            var studentQuestionStats = { 'total': studentAssess.questions.length, 'correct': 0, 'incorrect': 0 };
            var currentStudent = _this.lodash.find(attendingStudents, { 'id': studentAssess.studentId });
            _this.countStudentAssessQuestions(studentAssess, studentQuestionStats);
            _this.assignFinishedStudents(currentStudent, studentQuestionStats, studentAssess);
            _this.updateStudentPredictedScore(studentAssess, studentQuestionStats);
            correct += studentQuestionStats.correct;
            incorrect += studentQuestionStats.incorrect;
        });
        var answered = correct + incorrect;
        this.averageGrade = this.percentify(correct / answered);
        this.averageProgress = this.percentify(answered / total);
        this.challengingContent = this.calcChallengingContent(this.activity.questions);
        this.needHelpStudents = this.calcNeedHelpStudents(this.studentsAssesses.get(), attendingStudents);
        this.studentsData.notFinished = this.lodash.difference(attendingStudents, this.studentsData.finished);
        this.studentsData.working = this.lodash.difference(this.studentsData.notFinished, this.studentsData.almost);
    };
    AssessTeachResultsController.prototype.calcNeedHelpStudents = function (studentsAssesses, attendingStudents) {
        var _this = this;
        return this.lodash.chain(studentsAssesses)
            .filter(function (studentAssess) {
            return _this.lodash.find(studentAssess.questions, { status: 'incorrect' });
        })
            .sortBy('predictedScore')
            .take(3)
            .map(function (studentAssess) {
            return _this.lodash.find(attendingStudents, { 'id': studentAssess.studentId });
        })
            .value();
    };
    AssessTeachResultsController.prototype.calcChallengingContent = function (questions) {
        return this.lodash.chain(questions)
            .filter(function (question) {
            return (question.incorrect > 0);
        })
            .sortBy('incorrect')
            .reverse()
            .take(this.getMaxChallengingCount())
            .value();
    };
    AssessTeachResultsController.prototype.resetView = function () {
        this.studentsData.finished = [];
        this.studentsData.almost = [];
        this.lodash.each(this.activity.questions, function (question) {
            question.incorrect = 0;
            question.correct = 0;
        });
    };
    AssessTeachResultsController.prototype.countStudentAssessQuestions = function (studentAssess, studentQuestionStats) {
        var _this = this;
        this.lodash.each(studentAssess.questions, function (question) {
            var currentQuestion = _this.lodash.find(_this.activity.questions, { 'index': question.index });
            if (question.status === 'correct') {
                ++studentQuestionStats.correct;
                ++currentQuestion.correct;
            }
            else if (question.status === 'incorrect') {
                ++studentQuestionStats.incorrect;
                ++currentQuestion.incorrect;
            }
        });
    };
    AssessTeachResultsController.prototype.assignFinishedStudents = function (currentStudent, studentQuestionStats, studentAssess) {
        var answeredCount = studentQuestionStats.correct + studentQuestionStats.incorrect;
        if (studentQuestionStats.total === answeredCount || studentAssess.submitted) {
            this.studentsData.finished.push(currentStudent);
        }
        else if (studentQuestionStats.total - answeredCount === 1 && !studentAssess.submitted) {
            this.studentsData.almost.push(currentStudent);
        }
    };
    AssessTeachResultsController.prototype.updateStudentPredictedScore = function (studentAssess, studentQuestionStats) {
        var solvedQuestions = studentQuestionStats.correct + studentQuestionStats.incorrect;
        var successRate = (studentQuestionStats.correct / solvedQuestions) || 0;
        var remainingElapsedTimeRatio = this.remainingTime / this.elapsedTime;
        var potentialAnswers = solvedQuestions * remainingElapsedTimeRatio;
        var remainingQuestions = studentQuestionStats.total - solvedQuestions;
        var questionsStudentCanSolve = Math.min(remainingQuestions, potentialAnswers);
        var correctQuestionsStudentCanSolve = questionsStudentCanSolve * successRate;
        studentAssess.predictedScore = (correctQuestionsStudentCanSolve + studentQuestionStats.correct) / studentQuestionStats.total;
    };
    AssessTeachResultsController.prototype.percentify = function (number) {
        return Math.floor(number * 100) || 0;
    };
    return AssessTeachResultsController;
}(ActivityTeachResultsController_1.ActivityTeachResultsController));
exports.AssessTeachResultsController = AssessTeachResultsController;
//# sourceMappingURL=AssessTeachResultsController.js.map