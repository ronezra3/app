/*@ngInject*/
export abstract class Question {
  constructor(protected lodash: any, protected AssessValues: any, protected Localytics: any) {
  }

  initialize(question) {
    if (!question.answers) {
      question.answers = [];

      for (var i = 0; i < this.AssessValues.minAnswers; i++) {
        question.answers.push({ 'status': false });
      }
    }
  }

  removeAnswer(question, answer) {
    this.lodash.pull(question.answers, answer);
  }

  toggleAnswerStatus(question, answer) {
    answer.status = !answer.status;
  }


  toggleAnswerSelected(question, answer) {
    answer.selected = !answer.selected;
  }

  addAnswer(question, answer) {
    this.Localytics.tagEvent('Assess Answer Added');

    answer.status = false;
    question.answers.push(answer);
  }

  canDelete(question) {
    return question.answers.length > this.AssessValues.minAnswers;
  }

  canAddAnswer(question) {
    return question.answers.length < this.AssessValues.maxAnswers;
  }

  isCorrect(question) {
    var allCorrectAnswersAreSelected = this.lodash.chain(question.answers).where({ status: true }).every({ selected: true }).value();
    var incorrectAnswerSelected = this.lodash.chain(question.answers).where({ status: false }).any({ selected: true }).value();

    return allCorrectAnswersAreSelected && !incorrectAnswerSelected;
  }

  isFullyAnswered(question) {
    return this.lodash.any(question.answers, { selected: true });
  }

  validate(question) {
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
}
