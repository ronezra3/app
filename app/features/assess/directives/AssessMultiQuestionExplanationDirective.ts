class AssessMultiQuestionExplanationController {
  correctCount;
  question;

  /*@ngInject*/
  constructor(Utilities) {
    this.correctCount = Utilities.getFactoryByName('MultiQuestion').correctCount(this.question);
  }
}

const template = `
<div class="assess-solve-student-question-correct-count">
  {{'choose_answers' | translate: {answerCount: $ctrl.correctCount} }}
</div>
`;

export class AssessMultiQuestionExplanation {
  controller = AssessMultiQuestionExplanationController;
  template = template;
  bindings : any = {
    question: '<'
  };
}
