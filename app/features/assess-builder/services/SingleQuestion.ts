import {Question} from './Question';
export class SingleQuestion extends Question {

  toggleAnswerStatus(question, answer) {
    this.toggle(question.answers, answer, 'status');
    super.toggleAnswerStatus(question, answer);
  };

  toggleAnswerSelected(question, answer) {
    this.toggle(question.answers, answer, 'selected');
    super.toggleAnswerSelected(question, answer);
  };

  private toggle(answers, answer, property) {
    if (!answer[property]) {
      this.lodash.each(answers, function (currentAnswer) {
        currentAnswer[property] = false;
      });
    }
  }
}


/*@ngInject*/
export function SingleQuestionFactory(lodash, AssessValues, Localytics) {
  return new SingleQuestion(lodash, AssessValues, Localytics);
}
