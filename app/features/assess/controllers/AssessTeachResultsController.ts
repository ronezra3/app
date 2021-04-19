import {ActivityTeachResultsController} from '../../activities/controllers/ActivityTeachResultsController';
import {IAssessResults} from '../services/AssessResults';
import LoDashStatic = _.LoDashStatic;
import {Utilities} from '../../../3rdparty/common/services/Utilities';

export class AssessTeachResultsController extends ActivityTeachResultsController {
  timedOut = false;
  timeLeft;
  averageGrade = 0;
  averageProgress = 0;
  studentsData = {
    working: [],
    almost: [],
    finished: [],
    notFinished: []
  };
  challengingContent;
  needHelpStudents;

  private studentsAssesses : IAssessResults;
  private remainingTime;
  private elapsedTime = 0;

  private classId;

  /*@ngInject*/
  constructor(private CurrentSession, private lodash : LoDashStatic, private Utilities : Utilities, $stateParams,
              private members, activity, private Localytics, private AssessResultsFactory, private UsersStore) {
    super($stateParams, activity);

    this.classId = $stateParams.classId;

    this.studentsAssesses = this.AssessResultsFactory();
    this.studentsAssesses.onChange(this.updateView.bind(this));
    this.updateView();
    this.countdown();
  }

  countdown() {
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
    } else {
      this.timeLeft = '-' + this.Utilities.stringifyTime(Math.abs(this.remainingTime));
    }
  }

  private getMaxChallengingCount() {
    let baseChallengingCount = Math.ceil(this.activity.questions.length * 0.2);
    return Math.min(baseChallengingCount, 3);
  }

  private getAttendingStudents() {
 
    // Fetch newly joined members
    if (this.lodash.difference(
      this.CurrentSession.getAttendanceMgr().getAttending(),
      this.members.map(m=>m.id)
    ).length > 0) {
      this.UsersStore.query({classId: this.classId}).then(fetchedMembers=>
        this.members = fetchedMembers
      );
    }

    return this.lodash.map(this.CurrentSession.getAttendanceMgr().getAttending(), (attendingMemberId) => {
      return this.lodash.find(this.members, {'id': attendingMemberId});
    });
  }

  private updateView() {
    this.resetView();
    var attendingStudents = this.getAttendingStudents();

    var total = attendingStudents.length * this.activity.questions.length, correct = 0, incorrect = 0;
    this.lodash.each(this.studentsAssesses.get(), (studentAssess) => {
      if (!studentAssess.questions) {
        return;
      }

      let studentQuestionStats = {'total': studentAssess.questions.length, 'correct': 0, 'incorrect': 0};
      let currentStudent : any = this.lodash.find(attendingStudents, {'id': studentAssess.studentId});

      this.countStudentAssessQuestions(studentAssess, studentQuestionStats);
      this.assignFinishedStudents(currentStudent, studentQuestionStats, studentAssess);
      this.updateStudentPredictedScore(studentAssess, studentQuestionStats);

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
  }

  private calcNeedHelpStudents(studentsAssesses : Array<any>, attendingStudents : Array<any>) : Array<any> {
    return this.lodash.chain(studentsAssesses)
      .filter((studentAssess : any) => {
        return this.lodash.find(studentAssess.questions, {status: 'incorrect'});
      })
      .sortBy('predictedScore')
      .take(3)
      .map((studentAssess) => {
        return this.lodash.find(attendingStudents, {'id': studentAssess.studentId});
      })
      .value();
  }

  private calcChallengingContent(questions : Array<any>) {
    return this.lodash.chain(questions)
      .filter((question : any) => {
        return (question.incorrect > 0);
      })
      .sortBy('incorrect')
      .reverse()
      .take(this.getMaxChallengingCount())
      .value();
  }

  private resetView() {
    this.studentsData.finished = [];
    this.studentsData.almost = [];

    this.lodash.each(this.activity.questions, (question : any) => {
      question.incorrect = 0;
      question.correct = 0;
    });
  }

  private countStudentAssessQuestions(studentAssess, studentQuestionStats) {
    this.lodash.each(studentAssess.questions, (question) => {
      let currentQuestion : any = this.lodash.find(this.activity.questions, {'index': question.index});

      if (question.status === 'correct') {
        ++studentQuestionStats.correct;
        ++currentQuestion.correct;
      } else if (question.status === 'incorrect') {
        ++studentQuestionStats.incorrect;
        ++currentQuestion.incorrect;
      }
    });
  }

  private assignFinishedStudents(currentStudent, studentQuestionStats, studentAssess) {
    var answeredCount = studentQuestionStats.correct + studentQuestionStats.incorrect;
    if (studentQuestionStats.total === answeredCount || studentAssess.submitted) {
      this.studentsData.finished.push(currentStudent);
    } else if (studentQuestionStats.total - answeredCount === 1 && !studentAssess.submitted) {
      this.studentsData.almost.push(currentStudent);
    }
  }

  private updateStudentPredictedScore(studentAssess, studentQuestionStats) {
    var solvedQuestions = studentQuestionStats.correct + studentQuestionStats.incorrect;
    var successRate = (studentQuestionStats.correct / solvedQuestions) || 0;
    var remainingElapsedTimeRatio = this.remainingTime / this.elapsedTime;

    var potentialAnswers = solvedQuestions * remainingElapsedTimeRatio;
    var remainingQuestions = studentQuestionStats.total - solvedQuestions;
    var questionsStudentCanSolve = Math.min(remainingQuestions, potentialAnswers);

    var correctQuestionsStudentCanSolve = questionsStudentCanSolve * successRate;
    studentAssess.predictedScore = (correctQuestionsStudentCanSolve + studentQuestionStats.correct) / studentQuestionStats.total;
  }

  private percentify(number) {
    return Math.floor(number * 100) || 0;
  }
}
