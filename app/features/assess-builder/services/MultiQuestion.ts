import {Question} from './Question';
class MultiQuestion extends Question {
  correctCount(question) {
    return this.lodash.chain(question.answers).where({status: true}).size().value();
  };

  selectedCount(question) {
    return this.lodash.chain(question.answers).where({selected: true}).size().value();
  };

  isFullyAnswered(question) {
    return this.correctCount(question) <= this.selectedCount(question);
  };
}

/*@ngInject*/
export function MultiQuestionFactory(lodash, AssessValues, Localytics) {
  return new MultiQuestion(lodash, AssessValues, Localytics);
}
