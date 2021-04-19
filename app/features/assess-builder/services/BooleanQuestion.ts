import {SingleQuestion} from './SingleQuestion';
class BooleanQuestion extends SingleQuestion {

  constructor(private $translate, protected lodash : any, protected AssessValues, protected Localytics) {
    super(lodash, AssessValues, Localytics);
  }

  initialize(question) {
    super.initialize(question);

    this.$translate('true').then(function (trueTranslation) {
      question.answers[0].content = trueTranslation;
    });

    this.$translate('false').then(function (falseTranslation) {
      question.answers[1].content = falseTranslation;
    });
  };

}

/*@ngInject*/
export function BooleanQuestionFactory($translate, lodash, AssessValues, Localytics) {
  return new BooleanQuestion($translate, lodash, AssessValues, Localytics);
}
