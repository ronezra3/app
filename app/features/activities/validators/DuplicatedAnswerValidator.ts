class DuplicatedAnswerValidatorController {
  public answers;

  /*@ngInject*/
  constructor(private lodash) {
  }

  validate(viewAnswer) : boolean {
    return !this.lodash.any(this.answers, (answer : any) => {
      return answer.title && answer.title === viewAnswer;
    });
  }
}

export function DuplicatedAnswerValidator() {
  return {
    restrict: 'A',
    require: ['ngModel', 'duplicatedAnswerValidator'],
    bindToController: {
      answers: '<duplicatedAnswerValidatorAnswers'
    },
    controllerAs: 'duplicatedAnswerValidatorCtrl',
    controller: DuplicatedAnswerValidatorController,
    link: (scope, elem, attrs, ctrls : Array<any>) => {
      let ngModelCtrl = ctrls[0];
      let ctrl = ctrls[1];

      ngModelCtrl.$validators.duplicatedAnswer = ctrl.validate.bind(ctrl);
    }
  };
}
