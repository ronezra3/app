import {ActivityResourceWrapper} from '../../activities/services/ResourceWrapper';
export class AssessResourceWrapper extends ActivityResourceWrapper {
  static validate(activity, Utilities, lodash) {
    if (lodash.isEmpty(activity.questions)) {
      return 'no_questions';
    }

    if (!activity.time) {
      return 'time_zero';
    }

    var errorCode = null;
    lodash.any(activity.questions, (question) => {
      var questionService = Utilities.getFactoryByName(question.type + 'Question');
      errorCode = questionService.validate(question);
      return errorCode;
    });

    return errorCode;
  }

  constructor($resource, ENV, private lodash) {
    super($resource, ENV, 'assess');
  }

  get() {
    let resource = super.get();
    let lodash = this.lodash;

    function getAllAnswers(studentAssessments) {
      return lodash(studentAssessments).chain().pluck('questions').flatten().value();
    }

    function getCorrectAnswers(answers) {
      return lodash.where(answers, {status: 'correct'});
    }

    resource.prototype.getAverageGrade = function (studentAssessments) {
      var allAnswers = getAllAnswers(studentAssessments);
      var totalQuestionsCount = this.questions.length * studentAssessments.length;
      var correctAnswersCount = getCorrectAnswers(allAnswers).length;
      return correctAnswersCount / totalQuestionsCount;
    };

    resource.prototype.calculateQuestionGrade = function (studentAssessments, question) {
      var allAnswers = getAllAnswers(studentAssessments);
      var questionAnswers = lodash.where(allAnswers, {index: question.index});
      var correctAnswersCount = getCorrectAnswers(questionAnswers).length;
      return correctAnswersCount / questionAnswers.length;
    };

    return resource;
  }
}
